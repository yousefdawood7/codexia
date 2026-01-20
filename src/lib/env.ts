import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONVEX_DEPLOYMENT: z.string().min(1, "CONVEX_DEPLOYMENT is required"),
    CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
    FIRECRAWL_API_KEY: z.string().min(1, "FIRECRAWL_API_KEY is required"),
    SENTRY_AUTH_TOKEN: z.string().min(1, "SENTRY_AUTH_TOKEN is required"),
    CLERK_JWT_ISSUER_DOMAIN: z
      .url()
      .min(1, "CLERK_JWT_ISSUER_DOMAIN is required"),
    GOOGLE_GENERATIVE_AI_API_KEY: z
      .string()
      .min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),
  },

  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
      .string()
      .min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),

    NEXT_PUBLIC_CONVEX_URL: z
      .url()
      .min(1, "NEXT_PUBLIC_CONVEX_URL is required"),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  },
});
