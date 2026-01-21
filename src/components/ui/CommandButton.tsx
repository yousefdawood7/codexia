import { Kbd } from "@/components/ui/kbd";

export default function CommandButton({
  operationString,
}: {
  operationString: string;
}) {
  return (
    <Kbd className="border text-xl px-1.5 py-4 bg-transparent">
      {operationString}
    </Kbd>
  );
}
