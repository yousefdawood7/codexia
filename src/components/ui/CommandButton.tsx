import { Kbd } from "@/components/ui/kbd";

export default function CommandButton({
  operationString,
}: {
  operationString: string;
}) {
  return (
    <Kbd className="border bg-transparent px-1.5 py-4 text-xl">
      {operationString}
    </Kbd>
  );
}
