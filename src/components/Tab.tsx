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
    <Button
      onClick={() => handleClick()}
      variant={"tab"}
      className={cn(
        "text-muted-foreground h-auto",
        className ?? "",
        isActive && buttonVariants({ variant: "active-tab", className }),
      )}
    >
      {children}
    </Button>
  );
}
