import ProjectDashboard from "@/features/projects/components/ProjectDashboard";

export default function Page() {
  return (
    <main
      className={
        "bg-background font-poppins flex min-h-svh flex-col items-center justify-center p-5"
      }
    >
      <ProjectDashboard />
    </main>
  );
}
