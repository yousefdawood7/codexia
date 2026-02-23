import { cn } from "@/lib/utils";

export function GradientDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "via-border relative h-px w-full bg-linear-to-r from-transparent to-transparent",
        className,
      )}
    >
      {/* Center glow */}
      <div className="bg-foreground/5 absolute top-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 blur-sm" />
    </div>
  );
}
