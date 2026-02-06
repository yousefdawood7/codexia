import { cn } from "@/lib/utils";

export default function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-plex-mono text-muted-foreground mb-4 inline-block text-[10px] font-medium tracking-[0.2em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
