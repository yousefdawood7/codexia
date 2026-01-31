import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabProps = {
  isActive: boolean;
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function Tab({
  isActive,
  className,
  children,
  onClick: handleClick,
}: TabProps) {
  return (
    <button
      onClick={() => handleClick()}
      className={cn(
        buttonVariants({ variant: "tab" }),
        "text-muted-foreground h-auto",
        className ?? "",
        isActive && buttonVariants({ variant: "active-tab", className }),
      )}
    >
      {children}
    </button>
  );
}
