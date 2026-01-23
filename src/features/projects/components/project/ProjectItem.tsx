import { LucideFolder } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

type ProjectItemProps = {
  icon: React.FC<React.ComponentProps<"svg">>;
  title: string;
  description: string;
  featured?: boolean;
};

export default function ProjectItem({
  icon: Icon,
  title,
  description,
  featured = false,
}: ProjectItemProps) {
  return (
    <Item
      asChild
      className={cn(
        "cursor-pointer border-white/5 transition-colors hover:border-white/10",
        featured
          ? "bg-accent/30 hover:bg-accent/50 rounded-xl border p-6"
          : "bg-accent/30 hover:bg-accent/50 rounded-lg border p-4",
      )}
    >
      <article>
        <ItemMedia
          className={cn(
            "text-muted-foreground group-hover/item:text-foreground my-auto rounded-md transition-colors",
          )}
        >
          <Icon className={cn(featured ? "size-7" : "size-6")} />
        </ItemMedia>

        <ItemContent className="min-w-0">
          <ItemTitle
            className={cn(
              "truncate",
              featured ? "text-lg font-semibold" : "text-sm font-medium",
            )}
          >
            {title}
          </ItemTitle>
          <ItemDescription className={cn(featured ? "text-sm" : "text-xs")}>
            {description}
          </ItemDescription>
        </ItemContent>

        {featured && (
          <ItemActions>
            <Button
              variant="command"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Open project folder"
            >
              <LucideFolder className="size-5" />
            </Button>
          </ItemActions>
        )}
      </article>
    </Item>
  );
}
