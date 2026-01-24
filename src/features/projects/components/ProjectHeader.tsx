import CodexiaLogo from "@/components/CodexiaLogo";
import { cn } from "@/lib/utils";

type ProjectHeaderProps = {
  isCenter?: boolean;
};

export default function ProjectHeader({ isCenter }: ProjectHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-center gap-3.5 self-start",
        isCenter && "self-center",
      )}
    >
      <CodexiaLogo />
      <h1 className="text-5xl font-semibold">Codexia</h1>
    </header>
  );
}
