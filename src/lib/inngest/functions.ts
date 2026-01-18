import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { inngest } from "@/lib/inngest/client";

export const googleAI = inngest.createFunction(
  { id: "google-ai" },
  { event: "google-ai/generate-text" },
  async ({ event, step }) => {
    await step.run("generate text with google gemini", async () => {
      const { text } = await generateText({
        model: google("gemini-flash-latest"),
        prompt: event.data.prompt,
      });

      return { response: text };
    });
  },
);
