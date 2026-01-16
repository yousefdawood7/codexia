import { ClerkProvider as ClerkProviderNext } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

/**
 * Wraps React children with Clerk's authentication provider configured to use the shadcn theme.
 *
 * @returns A JSX element that renders the provided `children` inside Clerk's provider with the shadcn appearance theme.
 */
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