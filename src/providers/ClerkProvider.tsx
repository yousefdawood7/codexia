import { ClerkProvider as ClerkProviderNext } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

export default function ClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProviderNext appearance={{ theme: shadcn }}>
      {children}
    </ClerkProviderNext>
  );
}
