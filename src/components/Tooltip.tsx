import {
  Tooltip as TooltipShadcn,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipProps = {
  content: string;
  icon: React.ReactElement;
};

export default function Tooltip({ content, icon }: TooltipProps) {
  return (
    <TooltipShadcn>
      <TooltipTrigger>{icon}</TooltipTrigger>
      <TooltipContent>
        <p className="text-lg">{content}</p>
      </TooltipContent>
    </TooltipShadcn>
  );
}
