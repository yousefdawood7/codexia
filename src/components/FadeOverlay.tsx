export default function FadeOverlay() {
  return (
    <div
      className="from-background pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 bg-gradient-to-t to-transparent lg:block"
      aria-hidden="true"
    />
  );
}
