"use client";

import { useEffect, useState } from "react";
import { type HighlighterCore } from "shiki";
import { createHighlighter } from "shiki";
import { ShikiMagicMove } from "shiki-magic-move/react";
import { type Tab } from "@/components/landing/editor/types";
import "shiki-magic-move/dist/style.css";

const dashboard = `
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
export default function Dashboard() {
    const projects = useQuery(api.projects.list);
    
    return (
        <div className="grid grid-cols-3 gap-4">
            {projects?.map((p) => (
                <ProjectCard key={p._id} project={p} />
            ))}
        </div>
    );
}
`;

const layout = `
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider } from "@/providers";
import "@/app/globals.css";

export const metadata = {
    title: "Codexia — AI Workspace",
    description: "Ship projects faster",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <ConvexProvider>{children}</ConvexProvider>
        </ClerkProvider>
    );
}
`;

const snippets = { dashboard, layout };

type CodeSnippetProps = {
  currentTab: Tab;
};

export default function CodeSnippet({ currentTab }: CodeSnippetProps) {
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  useEffect(() => {
    async function initializeHighlighter() {
      const highlighter = await createHighlighter({
        themes: ["github-dark-high-contrast"],
        langs: ["tsx"],
      });
      setHighlighter(highlighter);
    }
    initializeHighlighter();
  }, []);

  return (
    <div>
      {highlighter && (
        <ShikiMagicMove
          lang="tsx"
          theme="github-dark-high-contrast"
          highlighter={highlighter}
          code={snippets[currentTab].trim()}
          options={{ duration: 350, stagger: 0.3, lineNumbers: true }}
          className="bg-transparent!"
        />
      )}
    </div>
  );
}
