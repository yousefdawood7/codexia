import Firecrawl from "@mendable/firecrawl-js";
import { env } from "@/lib/env";

export const firecrawl = new Firecrawl({ apiKey: env.FIRECRAWL_API_KEY });
