export default async function Page({
  params,
}: PageProps<"/project/[projectId]">) {
  const { projectId } = await params;

  return <div>{projectId}</div>;
}
