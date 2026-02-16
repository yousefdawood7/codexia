type BrowserBarProps = {
  url: string;
};

export default function BrowserBar({ url }: BrowserBarProps) {
  return (
    <div className="border-border/40 flex items-center gap-3 border-b bg-black/5 px-4 py-3 dark:bg-white/5">
      <div className="flex gap-1.5">
        <div className="size-2.5 rounded-full bg-white/10 dark:bg-white/15" />
        <div className="size-2.5 rounded-full bg-white/10 dark:bg-white/15" />
        <div className="size-2.5 rounded-full bg-white/10 dark:bg-white/15" />
      </div>
      <div className="bg-background/60 text-foreground/40 flex-1 rounded-md px-3 py-1 text-center text-[11px]">
        {url}
      </div>
      <div className="w-11.5" />
    </div>
  );
}
