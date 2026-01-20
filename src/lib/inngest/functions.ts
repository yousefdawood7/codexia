import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { firecrawl } from "@/lib/firecrawl";
import { inngest } from "@/lib/inngest/client";

const URL_REGEX =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w\-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gm;

export const googleAI = inngest.createFunction(
  { id: "google-ai" },
  { event: "google-ai/generate-text" },
  async ({
    event: {
      data: { prompt },
    },
    step,
  }) => {
    const extractedUrls = await step.run("extract-urls", async () => {
      const matchedUrls = prompt?.match(URL_REGEX) ?? [];
      return matchedUrls;
    });

    const scrapeExtractedUrls = await step.run(
      "scrape-extracted-urls",
      async () => {
        // prettier-ignore
        if (!extractedUrls || !extractedUrls.length)
          return "";

        const batchScrape = await firecrawl.batchScrape(extractedUrls, {
          options: { formats: ["markdown"] },
        });
        const scrapedContent =
          batchScrape.data?.map(({ markdown }) => markdown) ?? [];
        return scrapedContent.join("\n\n\n\n");
      },
    );

    await step.run("generate text with google gemini", async () => {
      const { text } = await generateText({
        model: google("gemini-flash-latest"),
        prompt: scrapeExtractedUrls
          ? `
        Context: ${scrapeExtractedUrls}

        Question: ${prompt}
        `
          : prompt,
      });

      return { response: text };
    });
  },
);
