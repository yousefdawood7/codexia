import { cn } from "@/lib/utils";

function GradientDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "via-border h-px w-full bg-linear-to-r from-transparent to-transparent",
        className,
      )}
    />
  );
}

export { GradientDivider };
