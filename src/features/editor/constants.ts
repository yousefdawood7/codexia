export const CHAT_PANE = {
  MIN_SIZE: 300,
  MAX_SIZE: 1350,
  PREFERRED_SIZE: 500,
} as const;

export const EDITOR_PANE = {
  MIN_SIZE: 200,
} as const;

export const LAYOUT_RATIOS = {
  CHAT: 30,
  EDITOR: 70,
} as const;
