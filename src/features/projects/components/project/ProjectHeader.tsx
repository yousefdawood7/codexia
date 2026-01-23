import CodexiaLogo from "@/components/CodexiaLogo";

export default function ProjectHeader() {
  return (
    <header className="flex items-center gap-2.5 px-5 py-5">
      <CodexiaLogo />
      <h1 className="text-2xl font-semibold tracking-tight">Codexia</h1>
    </header>
  );
}
