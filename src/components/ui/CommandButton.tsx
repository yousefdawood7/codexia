import { Kbd } from "@/components/ui/kbd";

export default function CommandButton({
  operationString,
}: {
  operationString: string;
}) {
  return (
    <Kbd className="border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-muted-foreground">
      {operationString}
    </Kbd>
  );
}
