// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }: { req: NextRequest; token: JWT | null }) => {
      if (!token || !token.access) {
        return false;
      }

      const pathname = req.nextUrl.pathname;
      const userRole = Array.isArray(token.roles) ? token.roles : [];

      if (pathname.startsWith("/hr-admin") && !userRole?.includes("HR_ADMIN")) {
        return false;
      }

      if (pathname.startsWith("/super-admin") && !userRole?.includes("SUPER_ADMIN")) {
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/signin?error=SessionExpired",
  },
});

export const config = {
  matcher: ["/hr-admin/:path*", "/super-admin/:path*"],
};