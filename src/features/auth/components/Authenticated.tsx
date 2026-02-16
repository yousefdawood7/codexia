"use client";

type AuthenticatedProps = {
  children: React.ReactNode;
};

export default function Authenticated({ children }: AuthenticatedProps) {
  return children;
}
