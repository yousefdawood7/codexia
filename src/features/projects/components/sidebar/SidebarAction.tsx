import { Button } from "@/components/ui/button";
import CommandButton from "@/components/ui/CommandButton";

type SidebarActionProps = {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  type?: "project";
  handleClick?: () => void;
};

export default function SidebarAction({
  icon,
  label,
  shortcut,
  handleClick,
}: SidebarActionProps) {
  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className={`text-muted-foreground hover:text-foreground h-9 w-full justify-start gap-2.5 px-3 text-sm`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {shortcut && <CommandButton operationString={shortcut} />}
    </Button>
  );
}
