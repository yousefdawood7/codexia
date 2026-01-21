import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4db98101933ecd03f3de240d6c98ffee@o4510737721720832.ingest.us.sentry.io/4510740514930688",

  integrations: [Sentry.replayIntegration({ maskAllText: false })],

  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
