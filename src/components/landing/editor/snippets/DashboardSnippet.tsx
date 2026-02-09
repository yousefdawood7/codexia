import { codeToHtml } from "shiki";

const dashboardCode = `
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
}`;

export default async function DashboardSnippet() {
  const out = await codeToHtml(dashboardCode, {
    lang: "tsx",
    theme: "github-dark-high-contrast",
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
