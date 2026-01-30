import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type PlaceholderProps = {
  title: string;
  description: string;
  icon: React.FC<React.ComponentProps<"svg">>;
  button?: React.ReactElement;
  className?: string;
};

export default function Placeholder({
  title,
  description,
  button,
  className,
  icon: Icon,
}: PlaceholderProps) {
  return (
    <Empty
      className={cn(
        "bg-card border-border max-h-87.5 w-full max-w-187.5 border",
        className,
      )}
    >
      <EmptyHeader>
        <EmptyMedia>
          <Icon className="text-muted-foreground size-12" />
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
