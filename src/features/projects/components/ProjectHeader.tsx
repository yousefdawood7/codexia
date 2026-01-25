import CodexiaLogo from "@/components/CodexiaLogo";
import { cn } from "@/lib/utils";

export default function ProjectHeader() {
  return (
    <header
      className={cn(
        "flex items-center justify-center gap-3.5 self-center lg:self-start",
      )}
    >
      <CodexiaLogo />
      <h1 className="text-5xl font-semibold">Codexia</h1>
    </header>
  );
}
