type CodeLine = { indent: number; text: string; color: string };

export const DASHBOARD_CODE: CodeLine[] = [
  {
    indent: 0,
    text: 'import { api } from "@/convex/_generated/api";',
    color: "text-white/60",
  },
  {
    indent: 0,
    text: 'import { useQuery } from "convex/react";',
    color: "text-white/60",
  },
  { indent: 0, text: "", color: "" },
  {
    indent: 0,
    text: "export default function Dashboard() {",
    color: "text-white/90",
  },
  {
    indent: 1,
    text: "const projects = useQuery(api.projects.list);",
    color: "text-white/70",
  },
  { indent: 0, text: "", color: "" },
  { indent: 1, text: "return (", color: "text-white/90" },
  {
    indent: 2,
    text: '<div className="grid grid-cols-3 gap-4">',
    color: "text-white/70",
  },
  { indent: 3, text: "{projects?.map((p) => (", color: "text-white/60" },
  {
    indent: 4,
    text: "<ProjectCard key={p._id} project={p} />",
    color: "text-white/80",
  },
  { indent: 3, text: "))}", color: "text-white/60" },
  { indent: 2, text: "</div>", color: "text-white/70" },
  { indent: 1, text: ");", color: "text-white/90" },
  { indent: 0, text: "}", color: "text-white/90" },
];

export const LAYOUT_CODE: CodeLine[] = [
  {
    indent: 0,
    text: 'import { ClerkProvider } from "@clerk/nextjs";',
    color: "text-white/60",
  },
  {
    indent: 0,
    text: 'import { ConvexProvider } from "@/providers";',
    color: "text-white/60",
  },
  { indent: 0, text: 'import "@/app/globals.css";', color: "text-white/50" },
  { indent: 0, text: "", color: "" },
  { indent: 0, text: "export const metadata = {", color: "text-white/90" },
  {
    indent: 1,
    text: 'title: "Codexia — AI Workspace",',
    color: "text-white/70",
  },
  {
    indent: 1,
    text: 'description: "Ship projects faster",',
    color: "text-white/70",
  },
  { indent: 0, text: "};", color: "text-white/90" },
  { indent: 0, text: "", color: "" },
  {
    indent: 0,
    text: "export default function RootLayout({ children }) {",
    color: "text-white/90",
  },
  { indent: 1, text: "return (", color: "text-white/90" },
  { indent: 2, text: "<ClerkProvider>", color: "text-white/70" },
  {
    indent: 3,
    text: "<ConvexProvider>{children}</ConvexProvider>",
    color: "text-white/80",
  },
  { indent: 2, text: "</ClerkProvider>", color: "text-white/70" },
  { indent: 1, text: ");", color: "text-white/90" },
  { indent: 0, text: "}", color: "text-white/90" },
];

export const TABS = [
  { id: "dashboard", label: "Dashboard.tsx", lines: DASHBOARD_CODE },
  { id: "layout", label: "layout.tsx", lines: LAYOUT_CODE },
] as const;

export const CHAT_MESSAGES = [
  {
    role: "user",
    text: "Add a search bar to filter projects by name",
  },
  {
    role: "ai",
    text: "I'll add a search input with real-time filtering. Adding a useState for the query and filtering the projects array...",
  },
  {
    role: "ai",
    text: "Done! Added a search bar with debounced filtering. The projects now filter as you type. Want me to add sorting options too?",
  },
] as const;
