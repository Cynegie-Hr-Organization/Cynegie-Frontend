import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }: { req: NextRequest; token: JWT | null }) => {
      // If there's no token, the user is not authenticated
      if (!token) return false;

      // Add role-based authorization logic
      const pathname = req.nextUrl.pathname;
      const userRole = token.role;

      if (pathname.startsWith("/hr-admin") && userRole !== "HR_ADMIN") {
        return false;
      }

      if (pathname.startsWith("/super-admin") && userRole !== "SUPER_ADMIN") {
        return false; // Restrict access to Super Admin pages
      }

      // Allow access for authorized users
      return true;
    },
  },
});

export const config = {
  // matcher: ["/hr-admin/:path*", "/super-admin/:path*"], // Match paths for HR Admin and Super Admin
  matcher: [],
};
