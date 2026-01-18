"use client";

import { SignInButton } from "@clerk/nextjs";
import { Unauthenticated as UnauthenticatedClerk } from "convex/react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function Unauthenticated() {
  return (
    <UnauthenticatedClerk>
      <section className="min-h-svh flex justify-center items-center px-1.5">
        <Item variant="outline" className="w-full max-w-[750px] bg-muted">
          <ItemMedia className="my-auto ">
            <ShieldAlert className="size-10" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="font-semibold text-xl">
              Unauthorized Access
            </ItemTitle>
            <ItemDescription className="text-md">
              You do not have the necessary permissions to access this page.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="lg"
              className="text-lg font-semibold"
              asChild
            >
              <SignInButton>Sign In</SignInButton>
            </Button>
          </ItemActions>
        </Item>
      </section>
    </UnauthenticatedClerk>
  );
}
