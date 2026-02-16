export default function RadialGlow() {
  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <div className="bg-foreground/2 h-150 w-200 rounded-full blur-3xl" />
    </div>
  );
}
