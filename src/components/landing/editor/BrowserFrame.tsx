import BrowserBar from "@/components/landing/editor/BrowserBar";
import CodeSnippet from "@/components/landing/editor/CodeSnippet";
import { CHAT_MESSAGES, TABS } from "@/components/landing/editor/constants";
import { type Tab } from "@/components/landing/editor/types";

type BrowserFrameProps = {
  activeTab: Tab;
  handleTabSwitch: (tab: Tab) => void;
  frameRef: React.RefObject<HTMLDivElement | null>;
};

export default function BrowserFrame({
  activeTab,
  frameRef,
  handleTabSwitch,
}: BrowserFrameProps) {
  return (
    <div
      ref={frameRef}
      className="border-border/60 bg-card/50 mx-auto overflow-hidden rounded-xl border shadow-2xl shadow-black/10 backdrop-blur-sm dark:shadow-black/40"
    >
      <BrowserBar url="codexia.yousefdawood.me/dashboard" />

      {/* Split panes */}
      <div className="grid min-h-90 grid-cols-1 md:grid-cols-[1fr_320px]">
        {/* Code Editor Pane */}
        <div className="border-border/30 bg-[oklch(0.13_0_0)] p-5 md:border-r">
          {/* Tab bar */}
          <div className="mb-4 flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`rounded-md px-3 py-1 text-[11px] transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white/70"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code content */}
          <div className="min-h-85 space-y-0.5 text-[12px] leading-[1.7]">
            <CodeSnippet currentTab={activeTab} />
          </div>
        </div>

        {/* AI Chat Pane */}
        <div className="bg-[oklch(0.16_0_0)] p-4">
          {/* Chat header */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-white/10">
              <span className="text-[10px] text-white/60">AI</span>
            </div>
            <span className="text-[11px] font-medium text-white/50">
              Codexia Assistant
            </span>
          </div>

          {/* Chat messages */}
          <div className="space-y-3">
            {CHAT_MESSAGES.map((msg, i) => (
              <div
                key={i}
                data-chat-msg
                className={`max-w-[95%] rounded-lg px-3 py-2.5 text-[12px] leading-relaxed ${
                  msg.role === "user"
                    ? "ml-auto bg-white/10 text-white/80"
                    : "bg-white/4 text-white/60"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/4 px-3 py-2.5">
            <span className="text-[11px] text-white/25">
              Ask Codexia anything...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
