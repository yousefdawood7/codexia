import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!, // Ain't work with t3-env
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
