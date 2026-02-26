export type FolderStructure = {
  type: "file" | "folder";
  name: string;
  children?: FolderStructure[];
};

export const CHAT_PANE = {
  MIN_SIZE: 120,
  MAX_SIZE: 1350,
  PREFERRED_SIZE: 120,
} as const;

export const EDITOR_PANE = {
  MIN_SIZE: 200,
} as const;

export const LAYOUT_RATIOS = {
  CHAT: 20,
  EDITOR: 80,
} as const;

export const CODE_RATIOS = {
  FILE_EXPLORER: 20,
  CODE_EDITOR: 80,
} as const;

export const FILE_EXPLORER_PANE = {
  MIN_SIZE: 150,
  MAX_SIZE: 1350,
} as const;

export const CODE_EDITOR_PANE = {
  MIN_SIZE: 200,
  PREFERRED_SIZE: 1250,
} as const;
