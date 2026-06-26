"use client";

import {
  SignInButton,
  SignOutButton,
  useAuth,
  UserAvatar,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { useEffect, useState } from "react";

export default function AuthControlsClient({
  fallback,
}: {
  fallback: React.ReactNode;
}) {
  const { isLoaded } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(isLoaded);
  }, [isLoaded]);

  if (!isReady) return fallback;
  return (
    <>
      <Authenticated>
        <UserAvatar />
        <SignOutButton />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}
