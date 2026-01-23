"use client";

import { createContext, use } from "react";
import { useCommandPalette as useCommandPaletteHook } from "@/hooks/useCommandPalette";

type CommandPaletteContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type CommandPaletteProviderProps = {
  children: React.ReactNode;
};

const CommandPaletteContext = createContext<
  CommandPaletteContextType | undefined
>(undefined);

export function CommandPaletteProvider({
  children,
}: CommandPaletteProviderProps) {
  const [open, setOpen] = useCommandPaletteHook();

  return (
    <CommandPaletteContext value={{ open, setOpen }}>
      {children}
    </CommandPaletteContext>
  );
}

export function useCommandPalette() {
  const data = use(CommandPaletteContext);
  if (data === undefined)
    throw new Error("useCommandPalette used outside of CommandPaletteProvider");

  return data;
}
