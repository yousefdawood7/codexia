export const TABS = [
  { id: "dashboard", label: "Dashboard.tsx" },
  { id: "layout", label: "layout.tsx" },
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
