import { type LucideIcon, LucideSparkle } from "lucide-react";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import { Kbd } from "@/components/ui/kbd";

type ProjectCreateProps = {
  icon: React.ReactElement;
  command: string;
  content: string;
};

export default function ProjectCreate({
  icon,
  command,
  content,
}: ProjectCreateProps) {
  return (
    <Item
      variant={"outline"}
      className="w-full gap-10 bg-accent hover:bg-accent/60 transition-colors"
    >
      <ItemHeader className="flex justify-between">
        {icon}
        <Kbd className="border text-xl px-1.5 py-4 bg-transparent">
          {command}
        </Kbd>
      </ItemHeader>
      <ItemContent className="text-xl font-semibold">{content}</ItemContent>
    </Item>
  );
}
