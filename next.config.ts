import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

import "@/lib/env";

const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default withSentryConfig(nextConfig, {
  org: "yousefdawood",
  project: "codexia",

  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",

  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
