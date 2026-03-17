<div align="center">
  <h1>Codexia</h1>
  <p><strong>Build projects at the speed of thought.</strong></p>
  <p>AI-powered project workspace for fast iteration, architecture control, and production-ready delivery.</p>

  <p>
	 <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js" />
	 <img alt="React" src="https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react" />
	 <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
	 <img alt="Convex" src="https://img.shields.io/badge/Convex-Realtime-f97316?style=for-the-badge" />
	 <img alt="Inngest" src="https://img.shields.io/badge/Inngest-Events-6366f1?style=for-the-badge" />
	 <img alt="Clerk" src="https://img.shields.io/badge/Clerk-Auth-6c47ff?style=for-the-badge" />
	 <img alt="Sentry" src="https://img.shields.io/badge/Sentry-Monitoring-362d59?style=for-the-badge&logo=sentry" />
	 <img alt="License" src="https://img.shields.io/badge/License-Unspecified-9ca3af?style=for-the-badge" />
  </p>

  <p>
	 <a href="#core-features">Features</a> •
	 <a href="#quick-start">Quick Start</a> •
	 <a href="#architecture-snapshot">Architecture</a> •
	 <a href="#project-structure">Project Structure</a> •
	 <a href="#environment-variables">Environment</a> •
	 <a href="#scripts">Scripts</a>
  </p>
</div>

---

## Why Codexia

Codexia combines chat-driven code generation, URL-to-project import, and real-time sync in one workspace.

- Move from idea to working code with an editor that understands project context.
- Import existing web ideas from a URL and turn them into editable project structures.
- Keep updates in sync instantly with authenticated, realtime infrastructure.
- Run enrichment and generation jobs asynchronously without interrupting editing flow.

> [!TIP]
> Codexia is built for speed without giving up architecture discipline: fast loops in the UI, traceable flows in the backend.

## Core Features

### AI Chat Editor

Describe the change, iterate in-place, and ship without context-switching between disconnected tools.

Technical signal:

- Uses the AI SDK with Google Gemini for generation workflows.
- Context-aware editing aligns responses to your actual file and project structure.

### One-Click Import from URL

Drop a URL and bootstrap project context in seconds.

Technical signal:

- Firecrawl scrapes and normalizes external web content.
- Extracted context can be injected into AI generation steps for higher quality results.

### Real-Time Sync

Project state remains current across sessions and devices.

Technical signal:

- Convex powers realtime data synchronization and backend logic.
- Clerk-aware Convex client wiring keeps auth and data access aligned.

### Secure by Default

Identity and runtime configuration are first-class concerns.

Technical signal:

- Clerk handles authentication and user identity.
- Runtime env variables are validated through Zod and env schemas.
- Sentry captures production errors and monitoring signals.

## Architecture Snapshot

Codexia combines a modern frontend with event-driven background processing.

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| App framework    | Next.js 16, React 19, TypeScript       |
| UI and motion    | Tailwind CSS 4, Radix UI, GSAP, Motion |
| Backend and sync | Convex                                 |
| Auth             | Clerk                                  |
| AI               | ai, @ai-sdk/google                     |
| Jobs and events  | Inngest                                |
| Web extraction   | Firecrawl                              |
| Monitoring       | Sentry                                 |

```text
User Request
	|
	v
Next.js App (UI + Editor)
	|          \
	|           \--> Clerk (Auth)
	v
Convex (Realtime Data + Functions)
	|
	v
Inngest (Async Jobs)
	|
	+--> Firecrawl (URL context)
	|
	+--> Google Gemini (AI generation)

Observability: Sentry across app runtime and deploy pipeline
```

High-level flow:

1. User creates a project or imports a URL.
2. URL content is scraped and normalized when provided.
3. AI generation runs through event-driven jobs.
4. Results persist in Convex and update the editor in realtime.
5. Errors and performance traces are reported through Sentry.

## Project Structure

```text
codexia/
├── convex/                                # Realtime backend layer
│   ├── _generated/                        # Convex generated API/types
│   ├── _shared/                           # Shared DAL and utilities
│   ├── projects/                          # Project queries and mutations
│   ├── auth.config.ts                     # Convex auth configuration
│   └── schema.ts                          # Data model definitions
├── public/                                # Static assets
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── (marketing)/                   # Landing and public marketing pages
│   │   └── (app)/                         # Authenticated product experience
│   ├── components/
│   │   ├── landing/                       # Marketing page sections
│   │   └── ui/                            # Reusable UI primitives
│   ├── features/                          # Domain modules (auth/editor/projects)
│   ├── hooks/                             # Shared React hooks
│   ├── lib/                               # Env, AI, Inngest, Firecrawl, utilities
│   └── providers/                         # Clerk, Convex, Theme providers
├── next.config.ts                         # Next.js + Sentry config
├── package.json                           # Scripts and dependencies
└── README.md
```

> [!NOTE]
> Fast orientation rule: product behavior lives in src/features, platform integrations live in src/lib and convex.

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment variables

Create .env.local in the project root and set the required variables from the next section.

### 3) Start development services

Run each command in a separate terminal:

```bash
pnpm convex:dev
pnpm inngest:dev
pnpm dev
```

Open http://localhost:3000.

## Environment Variables

Required server variables:

| Variable                     | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| CONVEX_DEPLOYMENT            | Targets the Convex deployment used by the app.         |
| CLERK_SECRET_KEY             | Server-side Clerk authentication secret.               |
| CLERK_JWT_ISSUER_DOMAIN      | Clerk issuer domain used to validate auth tokens.      |
| GOOGLE_GENERATIVE_AI_API_KEY | API key for Google Gemini generation.                  |
| FIRECRAWL_API_KEY            | API key for URL scraping and extraction.               |
| SENTRY_AUTH_TOKEN            | Auth token for Sentry integration and release tooling. |

Required client variables:

| Variable                          | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Public Clerk key used in the browser.   |
| NEXT_PUBLIC_CONVEX_URL            | Convex URL used by the frontend client. |

> [!IMPORTANT]
> Missing required env variables will fail runtime validation.

## Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| pnpm dev             | Starts the Next.js development server. |
| pnpm build           | Builds the production application.     |
| pnpm start           | Runs the production build.             |
| pnpm lint            | Runs ESLint checks.                    |
| pnpm lint:fix        | Runs ESLint with auto-fixes.           |
| pnpm prettier:format | Formats the repository with Prettier.  |
| pnpm convex:dev      | Starts Convex local/dev workflow.      |
| pnpm inngest:dev     | Starts the Inngest local dev server.   |

## Deployment

Codexia is production-ready for Vercel-style deployment with Sentry integration.

1. Configure all required env vars in your deployment platform.
2. Run pnpm build to validate production compilation.
3. Deploy the app.
4. Verify Sentry event flow after first production traffic.
