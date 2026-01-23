import { Item, ItemContent } from "@/components/ui/item";

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
    <Item className="flex flex-row">
      <ItemContent className="text-muted-foreground flex flex-row items-center justify-between text-lg">
        <aside className="flex items-center gap-3.5">
          <Icon className="text-muted-foreground size-7" />
          <p className="text-lg">{title}</p>
        </aside>
        <p className="text-[1rem]">{content}</p>
      </ItemContent>
    </Item>
  );
}
