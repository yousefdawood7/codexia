import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({
  children,
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-muted-foreground mb-4 inline-block text-sm font-medium tracking-[0.2em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
