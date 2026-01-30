import { Id } from "@/../convex/_generated/dataModel";
import EditorBreadcrumb from "@/features/editor/components/EditorBreadcrumb";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/project/[projectId]">) {
  const { projectId } = (await params) as { projectId: Id<"projects"> };
  return (
    <div className="flex h-svh flex-col">
      <header className="bg-primary-foreground border-b p-2.5">
        <EditorBreadcrumb projectId={projectId} />
      </header>

      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
