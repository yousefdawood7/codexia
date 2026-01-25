# Codexia Development Log

> **Complete documentation of the dashboard redesign and backend restructuring**
> Sessions: January 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Theme System - Pure Monochromatic Design](#2-theme-system---pure-monochromatic-design)
3. [Two-Column Animated Layout](#3-two-column-animated-layout)
4. [Component Architecture](#4-component-architecture)
5. [Responsive Scroll Behavior](#5-responsive-scroll-behavior)
6. [Semantic HTML & Accessibility](#6-semantic-html--accessibility)
7. [Convex Backend Restructure](#7-convex-backend-restructure)
8. [Hooks & State Management](#8-hooks--state-management)
9. [File Organization Changes](#9-file-organization-changes)
10. [Technical Decisions & Rationale](#10-technical-decisions--rationale)

---

## 1. Project Overview

**Codexia** is a Next.js 16 application for managing projects with the following tech stack:

| Technology | Purpose |
|------------|---------|
| **Next.js 16.1.2** | React framework with App Router |
| **Convex** | Backend-as-a-Service (database, real-time sync) |
| **Clerk** | Authentication |
| **shadcn/ui** | Component library (Radix + Tailwind) |
| **Tailwind CSS v4** | Styling with OKLCH color space |
| **Inngest** | Background job processing |
| **Sentry** | Error monitoring |

### Final Project Structure

```
codexia/
├── convex/                          # Convex Backend
│   ├── _generated/                  # Auto-generated types
│   ├── _shared/                     # Shared utilities
│   │   └── dal.ts                   # Data Access Layer
│   ├── projects/                    # Project domain
│   │   ├── queries.ts               # Read operations
│   │   └── mutations.ts             # Write operations
│   ├── auth.config.ts               # Clerk integration
│   ├── schema.ts                    # Database schema
│   └── types.ts                     # Shared TypeScript types
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── api/inngest/route.ts     # Background jobs endpoint
│   │   ├── globals.css              # Theme & global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Dashboard (Client Component)
│   │
│   ├── components/                  # Shared components
│   │   ├── ui/                      # UI primitives
│   │   ├── CodexiaLogo.tsx
│   │   ├── FadeOverlay.tsx
│   │   └── Placeholder.tsx
│   │
│   ├── features/                    # Feature modules
│   │   ├── auth/components/         # Auth UI
│   │   └── projects/                # Projects feature
│   │       ├── components/          # 11 components
│   │       ├── hooks/               # 2 custom hooks
│   │       └── constants.ts
│   │
│   ├── lib/                         # Utilities
│   │   ├── inngest/                 # Background jobs
│   │   ├── env.ts                   # Type-safe env vars
│   │   ├── firecrawl.ts             # Web scraping
│   │   └── utils.ts                 # Helpers
│   │
│   └── providers/                   # React providers
│       ├── ClerkProvider.tsx
│       ├── ConvexProvider.tsx
│       └── ThemeProvider.tsx
│
└── package.json
```

---

## 2. Theme System - Pure Monochromatic Design

### The Problem

The original theme had subtle blue/purple tints that were inconsistent with the desired aesthetic. The `--ring` color was purple (`oklch(0.556 0.015 264)`), creating unwanted color shifts.

### The Solution

Converted the entire theme to **pure monochromatic** by setting all chroma values to `0` in the OKLCH color space.

### Understanding OKLCH

OKLCH is a perceptually uniform color space with three components:

```
oklch(L C H)
      │ │ └── Hue (0-360): The color wheel position
      │ └──── Chroma (0-0.4): Color intensity/saturation
      └────── Lightness (0-1): How light or dark
```

**Key insight**: When chroma = 0, the hue is irrelevant, producing pure grayscale.

### Before vs After

| Token | Before | After |
|-------|--------|-------|
| `--ring` | `oklch(0.556 0.015 264)` | `oklch(0.556 0 0)` |
| `--background` | `oklch(0.145 0.015 264)` | `oklch(0.2 0 0)` |
| `--muted-foreground` | `oklch(0.556 0.015 264)` | `oklch(0.556 0 0)` |

### Complete Dark Theme (globals.css)

```css
.dark {
  --background: oklch(0.2 0 0);           /* Dark gray */
  --foreground: oklch(0.985 0 0);         /* Near white */
  --card: oklch(0.25 0 0);                /* Slightly lighter */
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.25 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);            /* White */
  --primary-foreground: oklch(0.25 0 0);  /* Dark for contrast */
  --secondary: oklch(0.3 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.3 0 0);
  --muted-foreground: oklch(0.708 0 0);   /* Mid gray for secondary text */
  --accent: oklch(0.32 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216); /* Red - keeps chroma! */
  --border: oklch(1 0 0 / 10%);           /* Translucent white */
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);               /* Gray, not purple */
}
```

### Lightness Scale Reference

| Lightness | Appearance | Usage |
|-----------|------------|-------|
| 0.2 | Very dark | Background |
| 0.25 | Dark | Cards |
| 0.3 | Medium dark | Secondary/Muted |
| 0.32 | Slightly lighter | Accent |
| 0.556 | Mid gray | Muted text, ring |
| 0.708 | Light gray | Secondary text |
| 0.985 | Near white | Primary text |

### Custom Scrollbar

```css
::-webkit-scrollbar {
  @apply h-2.5 w-2.5;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-border rounded-full border-[1px] border-solid border-transparent bg-clip-padding;
}
```

### Custom Animation

```css
@theme inline {
  --animate-cell-ripple: cell-ripple var(--duration, 200ms) ease-out none 1 var(--delay, 0ms);

  @keyframes cell-ripple {
    0% { opacity: 0.4; }
    50% { opacity: 0.8; }
    100% { opacity: 0.4; }
  }
}
```

---

## 3. Two-Column Animated Layout

### Design Requirements

1. **Desktop (lg+)**: Two columns with 45%/55% split
2. **Mobile (<lg)**: Single column, max-width 750px, centered
3. **Animation**: Right column slides in when projects exist
4. **Transition**: Left column expands when alone, shrinks when right appears

### Implementation

```tsx
// src/app/page.tsx (and ProjectDashboard.tsx)

<div
  className={cn(
    // Base: single column, centered, max 750px
    "mx-auto grid w-full max-w-[750px] items-start gap-10",
    
    // Smooth transitions on all properties
    "transition-all duration-300 ease-out",
    
    // Desktop gap adjustment
    "lg:gap-12",
    
    // Conditional: expand to two columns when projects exist
    hasRecentProjects
      ? "lg:max-w-5xl lg:grid-cols-[2fr_2.5fr]"  // Two columns
      : "lg:grid-cols-1",                         // Single column
  )}
>
```

### Column Ratio Explained

```
lg:grid-cols-[2fr_2.5fr]

Total: 2 + 2.5 = 4.5fr

Left column:  2 / 4.5 = 44.4%
Right column: 2.5 / 4.5 = 55.6%
```

### Right Column Animation

```tsx
<section
  className={cn(
    "flex flex-col items-stretch overflow-hidden",
    "transition-all duration-300 ease-out",
    
    hasRecentProjects
      ? "translate-x-0 opacity-100"      // Visible: normal position, full opacity
      : "pointer-events-none hidden translate-x-8 opacity-0 lg:block",
      // Hidden: shifted right, transparent, no interactions
  )}
  aria-label="Recent projects"
  aria-hidden={!hasRecentProjects}
>
```

### Animation Breakdown

| State | transform | opacity | visibility |
|-------|-----------|---------|------------|
| Hidden | `translate-x-8` (32px right) | 0 | `hidden` (mobile), visible but transparent (desktop) |
| Visible | `translate-x-0` | 1 | visible |
| Transition | 300ms ease-out | 300ms ease-out | instant |

### Why `hidden lg:block`?

On mobile, the right column is completely hidden (`display: none`). On desktop (`lg:`), it's rendered but invisible (`opacity-0`), allowing the CSS transition to animate it in.

---

## 4. Component Architecture

### Component Hierarchy

```
page.tsx (Client Component)
├── ProjectHeader
├── ProjectCard (New) ─────────┐
├── ProjectCard (Import) ──────┼─ ActionCards extracts these
├── LastUpdatedProject         │
└── RecentProjectsList ────────┘
    ├── ViewAllProjects
    │   └── CommandDialog (Command Palette)
    ├── ProjectListMobile
    │   └── ProjectItem[]
    ├── ProjectListDesktop
    │   └── ProjectItem[]
    └── FadeOverlay
```

### Component Breakdown

#### **ActionCards** (`src/features/projects/components/ActionCards.tsx`)

Extracted for DRY - the same New/Import buttons appear in multiple states.

```tsx
export default function ActionCards() {
  return (
    <nav className="flex gap-3" role="group" aria-label="Quick actions">
      <ProjectCard
        type="project"
        icon={<LucideSparkle className="size-7" />}
        operationContent={<CommandButton operationString="⌘J" />}
        content="New"
      />
      <ProjectCard
        icon={<GithubIcon className="size-7" />}
        operationContent={<CommandButton operationString="⌘I" />}
        content="Import"
      />
    </nav>
  );
}
```

#### **DashboardLayout** (`src/features/projects/components/DashboardLayout.tsx`)

Server Component wrapper for consistent layout styling.

```tsx
type DashboardLayoutProps = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export default function DashboardLayout({
  children,
  className,
  centered = true,
}: DashboardLayoutProps) {
  return (
    <main
      className={cn(
        "bg-background font-poppins flex min-h-svh p-5",
        centered && "items-center justify-center",
        className
      )}
    >
      {children}
    </main>
  );
}
```

#### **ProjectDashboard** (`src/features/projects/components/ProjectDashboard.tsx`)

Client Component alternative to page.tsx - contains all `useQuery` logic. Created for the hybrid Server/Client Component approach (page.tsx could become a Server Component that just renders `<ProjectDashboard />`).

#### **RecentProjectsList** (`src/features/projects/components/RecentProjectsList.tsx`)

Container component that orchestrates the project list display.

```tsx
type RecentProjectsListProps = {
  allProjects: Doc<"projects">[];  // Takes ALL projects, slices internally
};

export default function RecentProjectsList({ allProjects }: RecentProjectsListProps) {
  const slicedProjects = allProjects.slice(1);  // Skip first (shown in LastUpdatedProject)
  const showFade = slicedProjects.length > SCROLL_THRESHOLD;

  return (
    <div className="flex h-full flex-col gap-5">
      <header>...</header>
      <div className="relative flex-1">
        <ProjectListMobile projects={slicedProjects} />
        <ProjectListDesktop projects={slicedProjects} />
        {showFade && <FadeOverlay />}
      </div>
    </div>
  );
}
```

**Key design decision**: `allProjects` is passed in, and slicing happens internally. This keeps the parent component simple and makes `RecentProjectsList` self-contained.

---

## 5. Responsive Scroll Behavior

### Desktop Behavior

- **Scrollable** project list
- **Max height**: 400px
- **Fade overlay**: Gradient from transparent to background at bottom
- **Scrollbar**: Custom styled, 10px wide, rounded thumb

```tsx
// ProjectListDesktop.tsx
<ul
  className="hidden max-h-[400px] space-y-2 overflow-y-auto pr-2 lg:block"
  role="list"
>
  {projects.map((project) => (
    <li key={project._id}>
      <ProjectItem ... />
    </li>
  ))}
</ul>
```

### Mobile Behavior

- **Static list**: No scrolling
- **Limited**: Maximum 5 projects shown
- **No fade**: Overlay hidden on mobile

```tsx
// ProjectListMobile.tsx
<ul className="space-y-2 lg:hidden" role="list">
  {projects.slice(0, MOBILE_PROJECT_LIMIT).map((project) => (
    <li key={project._id}>
      <ProjectItem ... />
    </li>
  ))}
</ul>
```

### FadeOverlay Component

```tsx
// src/components/FadeOverlay.tsx
export default function FadeOverlay() {
  return (
    <div
      className="from-background pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 bg-gradient-to-t to-transparent lg:block"
      aria-hidden="true"
    />
  );
}
```

**CSS breakdown**:
- `pointer-events-none`: Click through to list items
- `absolute inset-x-0 bottom-0`: Anchored to bottom, full width
- `h-16`: 64px height
- `bg-gradient-to-t`: Gradient going upward
- `from-background to-transparent`: Fades from background color to invisible
- `hidden lg:block`: Only visible on desktop

### Constants

```tsx
// src/features/projects/constants.ts
export const MOBILE_PROJECT_LIMIT = 5;
export const SCROLL_THRESHOLD = 5;  // Show fade when > 5 projects

export const IMPORT_STATUS = {
  IMPORTING: Spinner,
  COMPLETED: LucideGlobe,
  FAILED: LucideCircleX,
} as const;
```

---

## 6. Semantic HTML & Accessibility

### Before (Issues)

```tsx
// Incorrect: <aside> used for non-sidebar content
<aside className="...">
  <ProjectCard />
</aside>

// Missing: No headings, no ARIA labels
<div className="...">
  <ProjectCard />
</div>
```

### After (Fixes)

```tsx
// Correct: <nav> for navigation, <section> for content areas
<nav className="flex gap-3" role="group" aria-label="Quick actions">
  <ProjectCard ... />
</nav>

<section aria-label="Projects overview">
  <ProjectHeader />
  ...
</section>

<section 
  aria-label="Recent projects"
  aria-hidden={!hasRecentProjects}  // Hide from screen readers when empty
>
  ...
</section>
```

### Semantic Elements Used

| Element | Purpose | Location |
|---------|---------|----------|
| `<main>` | Page primary content | DashboardLayout, page.tsx |
| `<header>` | Section headers | RecentProjectsList, loading state |
| `<nav>` | Navigation groups | ActionCards, ViewAllProjects |
| `<section>` | Content sections | Left/right columns |
| `<ul>/<li>` | Project lists | ProjectListMobile/Desktop |
| `<h2>` | Section headings | "Recent projects" |

### ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role="group"` | On `<nav>` | Groups related buttons |
| `role="list"` | On `<ul>` | Explicit list semantics |
| `aria-label` | Descriptive text | Screen reader context |
| `aria-hidden` | `true`/`false` | Hide decorative/empty content |
| `aria-labelledby` | ID reference | Associate heading with section |

### Button Accessibility

```tsx
// ProjectCard.tsx
<Item
  ...
  role={type === "project" ? "button" : undefined}
  aria-label={
    type === "project" ? "Create new project" : "Import from GitHub"
  }
>
```

---

## 7. Convex Backend Restructure

### Before (Single File)

```
convex/
├── functions.ts    # ALL queries AND mutations
├── dal.ts          # Data access helpers
└── schema.ts
```

```tsx
// convex/functions.ts (BEFORE)
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { userIdentity } from "./dal";

export const createProject = mutation({ ... });
export const getProjects = query({ ... });
```

**Usage**:
```tsx
import { api } from "@/../convex/_generated/api";
api.functions.getProjects
api.functions.createProject
```

### After (Domain-Based)

```
convex/
├── projects/
│   ├── queries.ts      # getProjects
│   └── mutations.ts    # createProject
├── _shared/
│   └── dal.ts          # Shared helpers
├── schema.ts
└── types.ts
```

#### queries.ts

```tsx
// convex/projects/queries.ts
import { v } from "convex/values";
import { query } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

export const getProjects = query({
  args: { numberOfProjects: v.optional(v.number()) },
  handler: async (ctx, { numberOfProjects }) => {
    const currentUser = await userIdentity(ctx);
    if (!currentUser) return null;

    return ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerID", currentUser.subject))
      .order("desc")
      [numberOfProjects ? "take" : "collect"](numberOfProjects ?? 0);
  },
});
```

#### mutations.ts

```tsx
// convex/projects/mutations.ts
import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { userIdentity } from "../_shared/dal";

export const createProject = mutation({
  args: { projectName: v.string() },
  handler: async (ctx, { projectName }) => {
    const currentUser = await userIdentity(ctx);
    if (!currentUser) return null;

    return ctx.db.insert("projects", {
      name: projectName,
      updatedAt: Date.now(),
      ownerID: currentUser.subject,
      importStatus: "IMPORTING",
    });
  },
});
```

#### dal.ts

```tsx
// convex/_shared/dal.ts
import { type MutationCtx, type QueryCtx } from "../_generated/server";

export const userIdentity = async (ctx: QueryCtx | MutationCtx) =>
  ctx.auth.getUserIdentity();
```

### New Import Pattern

```tsx
// BEFORE
import { api } from "@/../convex/_generated/api";
api.functions.getProjects
api.functions.createProject

// AFTER
import { api } from "@/../convex/_generated/api";
api.projects.queries.getProjects
api.projects.mutations.createProject
```

### Files Updated

| File | Change |
|------|--------|
| `src/app/page.tsx` | `api.functions.getProjects` → `api.projects.queries.getProjects` |
| `src/features/projects/components/ProjectDashboard.tsx` | Same |
| `src/features/projects/components/ProjectCard.tsx` | `api.functions.createProject` → `api.projects.mutations.createProject` |
| `src/features/projects/hooks/useOptimisticProject.ts` | Both imports updated |
| `convex/types.ts` | Updated type reference |

### Why Domain-Based Structure?

1. **Scalability**: Easy to add new domains (users, teams, etc.)
2. **Discoverability**: Clear where to find/add functionality
3. **Separation of Concerns**: Queries and mutations in separate files
4. **Consistency**: Mirrors feature-based frontend structure

---

## 8. Hooks & State Management

### useCommandPalette

**Location**: `src/features/projects/hooks/useCommandPalette.ts`

Manages the command palette open/close state with keyboard shortcut.

```tsx
import { useEffect, useState } from "react";

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return [open, setOpen] as const;
}
```

**Key points**:
- Returns tuple `[open, setOpen]` with `as const` for proper typing
- `e.preventDefault()` stops browser's default Cmd+K behavior
- Toggle pattern: `setOpen((open) => !open)`
- Cleanup on unmount: `removeEventListener`

### useOptimisticProject

**Location**: `src/features/projects/hooks/useOptimisticProject.ts`

Provides instant UI feedback when creating projects (before server confirms).

```tsx
import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { getCurrentDate } from "@/lib/utils";

export function useOptimisticProject(
  createProject: FunctionReference<"mutation">,
) {
  const optimisticCreateProject = useMutation(
    createProject,
  ).withOptimisticUpdate((localStore, args) => {
    const { projectName } = args;
    
    // Get current projects from local cache
    const currentProjects =
      localStore.getQuery(api.projects.queries.getProjects, {}) ?? [];

    const now = getCurrentDate();

    // Create optimistic project object
    const optimisticProjectObject = {
      _id: crypto.randomUUID() as Id<"projects">,  // Temporary ID
      _creationTime: now,
      updatedAt: now,
      name: projectName,
      ownerID: "optimistic",  // Placeholder owner
      importStatus: "IMPORTING" as const,
    };

    // Prepend to list for instant visibility
    localStore.setQuery(api.projects.queries.getProjects, {}, [
      optimisticProjectObject,
      ...currentProjects,
    ]);
  });

  return optimisticCreateProject;
}
```

**How optimistic updates work**:

1. User clicks "New Project"
2. `useOptimisticProject` immediately updates local cache
3. UI shows new project instantly
4. Mutation request sent to server
5. Server responds with real data
6. Convex reconciles optimistic data with server data
7. If server fails, optimistic update is rolled back

**Why `crypto.randomUUID()`?**

Creates a unique temporary ID that Convex will replace with the real `_id` once the server confirms.

---

## 9. File Organization Changes

### Files Moved

| From | To | Reason |
|------|----|--------|
| `src/hooks/useCommandPalette.ts` | `src/features/projects/hooks/useCommandPalette.ts` | Feature-based organization |
| `convex/dal.ts` | `convex/_shared/dal.ts` | Shared utilities pattern |
| `convex/functions.ts` | Split into `convex/projects/queries.ts` + `mutations.ts` | Domain separation |

### Files Deleted

| File | Reason |
|------|--------|
| `convex/functions.ts` | Replaced by domain-based files |
| `convex/dal.ts` | Moved to `_shared/` |
| `src/hooks/useCommandPalette.ts` | Moved to feature folder |
| `src/proxy.ts` | Orphaned/unused file |
| `src/hooks/` (empty directory) | Cleaned up after move |

### Files Created

| File | Purpose |
|------|---------|
| `convex/projects/queries.ts` | Project read operations |
| `convex/projects/mutations.ts` | Project write operations |
| `convex/_shared/dal.ts` | Shared data access helpers |
| `src/features/projects/components/ActionCards.tsx` | Extracted action buttons |
| `src/features/projects/components/DashboardLayout.tsx` | Layout wrapper |
| `src/features/projects/components/ProjectDashboard.tsx` | Client dashboard component |
| `src/features/projects/hooks/useCommandPalette.ts` | Moved hook |

---

## 10. Technical Decisions & Rationale

### Decision 1: Keep page.tsx as Client Component

**Choice**: `page.tsx` remains a Client Component with `"use client"` directive.

**Rationale**:
- Uses `useQuery` from Convex (requires client)
- Real-time data sync benefits from client-side hooks
- `ProjectDashboard.tsx` was created as an alternative for future Server Component migration

**Alternative approach** (not implemented):
```tsx
// page.tsx (Server Component)
export default function Page() {
  return <ProjectDashboard />;
}

// ProjectDashboard.tsx (Client Component)
"use client";
export default function ProjectDashboard() {
  const projectItems = useQuery(...);
  // ... all current page.tsx logic
}
```

### Decision 2: No Barrel Exports

**Choice**: Import from individual files, not index.ts barrel files.

**Rationale**:
- Avoids circular dependency issues
- Better tree-shaking
- Clearer import paths
- Explicit about what's being imported

```tsx
// YES
import { useCommandPalette } from "@/features/projects/hooks/useCommandPalette";

// NO (barrel export)
import { useCommandPalette } from "@/features/projects/hooks";
```

### Decision 3: Inline Types

**Choice**: Keep types in their respective files, not a separate `types/` directory.

**Rationale**:
- Colocation: types near their usage
- Easier maintenance: change component = change type in same file
- Less file jumping

```tsx
// Types defined in component file
type ProjectCardProps = {
  icon: React.ReactElement;
  type?: string;
  title?: string;
  footer?: string;
  content?: string;
  operationContent: React.ReactElement;
};

export default function ProjectCard({ ... }: ProjectCardProps) { ... }
```

### Decision 4: Domain-Based Convex Structure

**Choice**: `convex/projects/` instead of `convex/functions.ts`

**Rationale**:
- Mirrors frontend feature structure
- Scales better: add `convex/users/`, `convex/teams/`, etc.
- Clear separation: queries vs mutations
- Industry standard pattern

### Decision 5: Pure Monochromatic Theme

**Choice**: Remove all color (chroma = 0) except destructive/chart colors.

**Rationale**:
- User preference: no blue/purple tints
- Cleaner, more professional appearance
- Reduces visual noise
- Easier to maintain: fewer color variables to manage

### Decision 6: `allProjects` Prop Pattern

**Choice**: Pass `allProjects` to `RecentProjectsList`, slice internally.

```tsx
// Parent (page.tsx)
<RecentProjectsList allProjects={projectItems} />

// Child slices internally
const slicedProjects = allProjects.slice(1);
```

**Rationale**:
- Parent doesn't need to know slicing logic
- `RecentProjectsList` is self-contained
- Easier to change slicing behavior
- Single source of truth for "recent" definition

---

## Verification Commands

```bash
# TypeScript check
pnpm tsc --noEmit

# Build
pnpm run build

# Development server
pnpm dev
```

### Build Output (After Refactoring)

```
▲ Next.js 16.1.2 (Turbopack)
✓ Compiled successfully in 12.0s
✓ Generating static pages (5/5) in 893.8ms

Route (app)
┌ ○ /
├ ○ /_not-found
└ ƒ /api/inngest

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## Summary of All Changes

| Category | Change |
|----------|--------|
| **Theme** | Pure monochromatic OKLCH colors (chroma = 0) |
| **Layout** | Two-column animated grid (45%/55% split) |
| **Animation** | Right column slides in from right (300ms ease-out) |
| **Mobile** | Single column, 5 projects max, no scroll |
| **Desktop** | Scrollable list, fade overlay, custom scrollbar |
| **Accessibility** | Semantic HTML, ARIA labels, proper headings |
| **Backend** | Domain-based Convex structure (`projects/queries.ts`, `mutations.ts`) |
| **Hooks** | Moved to feature folders |
| **Components** | Extracted `ActionCards`, `DashboardLayout`, `ProjectDashboard` |
| **Cleanup** | Deleted orphaned files, empty directories |

---

*Last updated: January 24, 2026*
