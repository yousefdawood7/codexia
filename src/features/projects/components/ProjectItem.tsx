import Link from "next/link";
import { Id } from "@/../convex/_generated/dataModel";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type ProjectItemProps = {
  id: Id<"projects">;
  icon: React.FC<React.ComponentProps<"svg">>;
  title: string;
  content: string;
};

export default function ProjectItem({
  id,
  title,
  content,
  icon: Icon,
}: ProjectItemProps) {
  return (
    <Item
      className="hover:bg-card/80 flex flex-row transition-colors duration-200 hover:border-white/15"
      asChild
    >
      <Link href={`/project/${id}`}>
        <ItemMedia>
          <Icon className="text-muted-foreground size-7" aria-hidden="true" />
        </ItemMedia>
        <ItemContent className="flex flex-1 flex-row items-center justify-between">
          <ItemTitle className="text-muted-foreground text-lg font-normal">
            {title}
          </ItemTitle>
          <ItemDescription className="text-muted-foreground text-base">
            {content}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
