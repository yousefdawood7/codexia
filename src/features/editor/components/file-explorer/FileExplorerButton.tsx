import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FileExplorerButtonProps = {
  icon: React.ReactNode;
  isOpened: boolean;
};

export default function FileExplorerButton({
  icon,
  isOpened,
}: FileExplorerButtonProps) {
  return (
    <Button
      variant={"ghost"}
      size={"icon-sm"}
      className={cn(
        "transition-none",
        isOpened ? "invisible group-hover/explorer:visible" : "invisible",
      )}
    >
      {icon}
    </Button>
  );
}
