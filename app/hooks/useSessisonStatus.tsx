// hooks/useSessionStatus.ts
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useSessionStatus() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // If session is null or undefined, it's expired or invalid
    if (!session) {
      signOut({ 
        redirect: false 
      }).then(() => {
        router.push("/signin?error=SessionExpired");
      });
    }
  }, [session, status, router]);

  return {
    isAuthenticated: status === "authenticated" && !!session,
    session,
    status,
  };
}