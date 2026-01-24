import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

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
    <Empty className="bg-card border-border max-h-[350px] w-full max-w-187.5 border">
      <EmptyHeader>
        <EmptyMedia>
          <Icon className="text-muted-foreground size-10" />
        </EmptyMedia>
        <EmptyTitle className="text-xl font-semibold">{title}</EmptyTitle>
        <EmptyDescription className="text-base">{description}</EmptyDescription>
      </EmptyHeader>
      {button && (
        <EmptyContent>
          <Button
            variant="outline"
            size="lg"
            className="text-lg font-semibold"
            asChild
          >
            {button}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
