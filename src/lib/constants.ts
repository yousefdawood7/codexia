export const KEYBOARD_SHORTCUTS = {
  NEW_PROJECT: { mac: "⌘J", windows: "Ctrl+J" },
  IMPORT: { mac: "⌘I", windows: "Ctrl+I" },
  COMMAND_PALETTE: { mac: "⌘K", windows: "Ctrl+K" },
} as const;

export type KeyboardShortcut = keyof typeof KEYBOARD_SHORTCUTS;
