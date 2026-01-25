import CodexiaLogo from "@/components/CodexiaLogo";
import { cn } from "@/lib/utils";

type ProjectHeaderProps = {
  isLeft?: boolean;
};

export default function ProjectHeader({ isLeft }: ProjectHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-center gap-3.5 self-center",
        isLeft && "lg:self-start",
      )}
    >
      <CodexiaLogo />
      <h1 className="text-5xl font-semibold">Codexia</h1>
    </header>
  );
}
