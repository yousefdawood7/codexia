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
        "bg-accent hover:bg-accent/60 flex w-full transition-colors",
        footer ? "" : "gap-10",
      )}
    >
      <ItemHeader className="flex justify-between">
        <aside className="flex items-center gap-2.5">
          {icon}
          {title && <p className="text-xl">{title}</p>}
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
