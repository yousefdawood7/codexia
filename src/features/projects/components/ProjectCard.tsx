import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  icon: React.ReactElement;
  title?: string;
  footer?: string;
  content?: string;
  operation: React.ReactElement;
};

export default function ProjectCard({
  icon,
  title,
  operation,
  content,
  footer,
}: ProjectCardProps) {
  return (
    <Item
      variant={"outline"}
      className={cn(
        "w-full flex bg-accent hover:bg-accent/60 transition-colors",
        footer ? "" : "gap-10",
      )}
    >
      <ItemHeader className="flex justify-between">
        <aside className="flex gap-2.5 items-center">
          {icon}
          {title && <p className="text-xl">Test</p>}
        </aside>
        {operation}
      </ItemHeader>

      {footer ? (
        <ItemFooter className="text-muted-foreground text-lg">
          {footer}
        </ItemFooter>
      ) : (
        <ItemContent className="text-xl font-semibold">{content}</ItemContent>
      )}
    </Item>
  );
}
