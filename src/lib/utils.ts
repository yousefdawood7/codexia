import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";
import {
  adjectives,
  animals,
  type Config,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { KEYBOARD_SHORTCUTS, KeyboardShortcut } from "@/lib/constants";

const customConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: "-",
  length: 2,
};

// to get out of calling impure function's rule in eslint
export const getCurrentDate = () => Date.now();

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const generateRandomNames = () => uniqueNamesGenerator(customConfig);

export const getFormattedTime = (date: number) =>
  formatDistanceToNow(date, { addSuffix: true });

export const getShortcut = (action: KeyboardShortcut): string => {
  const isMac = navigator.platform.toUpperCase().includes("MAC");

  const shortcut = KEYBOARD_SHORTCUTS[action];
  return isMac ? shortcut.mac : shortcut.windows;
};

export const handleIsActive = (actual: string, currentState: string) =>
  actual === currentState;
