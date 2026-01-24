import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type ProjectItemProps = {
  icon: React.FC<React.ComponentProps<"svg">>;
  title: string;
  content: string;
};

export default function ProjectItem({
  icon: Icon,
  title,
  content,
}: ProjectItemProps) {
  return (
    <Item
      className="hover:border-white/15 hover:bg-card/80 flex flex-row transition-colors duration-200"
      asChild
    >
      <article>
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
      </article>
    </Item>
  );
}
