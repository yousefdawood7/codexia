import AuthLoading from "@/features/auth/components/AuthLoading";
import Unauthenticated from "@/features/auth/components/Unauthenticated";

export default function Home() {
  return (
    <>
      <Unauthenticated />
      <AuthLoading />
    </>
  );
}
