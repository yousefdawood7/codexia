import CodexiaLogo from "@/components/CodexiaLogo";
import { cn } from "@/lib/utils";

type ProjectHeaderProps = {
  className?: string;
  isLeft?: boolean;
};

export default function ProjectHeader({
  className,
  isLeft,
}: ProjectHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-center gap-3.5 self-center",
        isLeft && "lg:self-start",
      )}
    >
      <CodexiaLogo
        title={{
          text: "Codexia",
          className: cn("text-5xl font-semibold", className),
        }}
      />
    </header>
  );
}
