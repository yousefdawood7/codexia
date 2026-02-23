"use client";

import { Activity, useState } from "react";
import { FaGithub as GithubIcon } from "react-icons/fa";
import Tab from "@/components/Tab";
import { Button } from "@/components/ui/button";
import CodePane from "@/features/editor/components/panes/CodePane";
import { handleIsActive } from "@/lib/utils";

export default function EditorPanes() {
  const [currentPane, setCurrentPane] = useState<"code" | "preview">("code");

  return (
    <section className="h-full">
      <header className="bg-primary-foreground flex items-center justify-between">
        <nav>
          <Tab
            className="h-auto border-r px-7 py-3.5 text-lg"
            onClick={() => setCurrentPane("code")}
            isActive={handleIsActive("code", currentPane)}
          >
            Code
          </Tab>
          <Tab
            className="h-auto border-r px-7 py-3.5 text-lg"
            onClick={() => setCurrentPane("preview")}
            isActive={handleIsActive("preview", currentPane)}
          >
            Preview
          </Tab>
        </nav>

        <Button
          variant={"tab"}
          className="h-auto border-l px-7! py-3.5 text-lg"
        >
          <GithubIcon className="size-5" />
          Export
        </Button>
      </header>

      <Activity mode={currentPane === "code" ? "visible" : "hidden"}>
        <CodePane />
      </Activity>
      {currentPane === "preview" && <div>Preview Pane</div>}
    </section>
  );
}
