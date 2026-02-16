import Authenticated from "@/features/auth/components/Authenticated";
import AuthLoading from "@/features/auth/components/AuthLoading";
import Unauthenticated from "@/features/auth/components/Unauthenticated";
import ProjectDashboard from "@/features/projects/components/ProjectDashboard";

export default function Page() {
  return (
    <main
      className={
        "bg-background font-poppins flex min-h-svh flex-col items-center justify-center p-5"
      }
    >
      <Unauthenticated />
      <AuthLoading />

      <Authenticated>
        <ProjectDashboard />
      </Authenticated>
    </main>
  );
}
