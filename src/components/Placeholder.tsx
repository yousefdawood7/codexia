import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type PlaceholderProps = {
  title: string;
  description: string;
  icon: React.FC<React.ComponentProps<"svg">>;
  button?: React.ReactElement;
};

export default function Placeholder({
  title,
  description,
  icon: Icon,
  button,
}: PlaceholderProps) {
  return (
    <Item variant="outline" className="bg-muted w-full max-w-187.5">
      <ItemMedia className="my-auto">
        <Icon className="size-10" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-xl font-semibold">{title}</ItemTitle>
        <ItemDescription className="text-md">{description}</ItemDescription>
      </ItemContent>
      {button && (
        <ItemActions>
          <Button
            variant="outline"
            size="lg"
            className="text-lg font-semibold"
            asChild
          >
            {button}
          </Button>
        </ItemActions>
      )}
    </Item>
  );
}
