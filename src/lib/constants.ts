export const KEYBOARD_SHORTCUTS = {
  NEW_PROJECT: { mac: "⌘J", windows: "Ctrl+J", key: "j" },
  IMPORT: { mac: "⌘I", windows: "Ctrl+I", key: "i" },
  COMMAND_PALETTE: { mac: "⌘K", windows: "Ctrl+K", key: "k" },
} as const;

export type KeyboardShortcut = keyof typeof KEYBOARD_SHORTCUTS;
