import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4db98101933ecd03f3de240d6c98ffee@o4510737721720832.ingest.us.sentry.io/4510740514930688",

  integrations: [
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
  ],

  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
