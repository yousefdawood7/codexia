import CodexiaLogo from "@/components/CodexiaLogo";

export default function ProjectHeader() {
  return (
    <header className="flex items-center justify-center gap-3.5 self-start">
      <CodexiaLogo />
      <h1 className="text-5xl font-semibold">Codexia</h1>
    </header>
  );
}
