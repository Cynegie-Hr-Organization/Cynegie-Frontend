/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { AuthOptions, Session , User as NextAuthUser, } from "next-auth";
import {  JWT } from "next-auth/jwt"; // Import JWT type
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUrl } from "@/constants/config";
import { request } from "@/utils/request";
import { getRedirectPath } from "@/utils";

const credentialsProviderOptions = {
  name: "Login",
  credentials: {
    email: {
      label: "Email Address",
      type: "email",
      placeholder: "john@gmail.com",
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Your secure password",
    },
  },
  authorize: async (credentials: any) => {
    const { email, password } = credentials || {};
    if (!email || !password) return null;

    console.log("Credentials received:", { email, password });

    try {
      const json = await request("POST", `${authUrl}`, {
        data: { email, password },
      });

      console.log("API response:", json);

      if (!json || json.error || !json.data || !json.data.user) {
        console.error(
          "Invalid credentials or server error:",
          json?.error || "No user data in response"
        );
        return null;
      }

      const { accessToken, refreshToken, user } = json.data;

      if (!user || !user.id) {
        console.error("User data is missing or incomplete:", user);
        return null;
      }

      const loggedInUser: NextAuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        company: user.company,
        token: { accessToken, refreshToken },
      };

      console.log(loggedInUser);

      return loggedInUser;
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof TypeError && error.message.includes("fetch failed")) {
        throw new Error("Network error. Please check your internet connection.");
      }

      return null;
    }
  },
};

export const authOptions: AuthOptions = {
  providers: [CredentialsProvider(credentialsProviderOptions)],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours default expiration
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }): Promise<JWT> {
      if (user) {
        token.id = user.id || "";
        token.name = user.email || "";
        token.access = user.token.accessToken || "";
        token.refresh = user.token.refreshToken || "";
        token.roles = user.role || [];
        token.firstName = user.firstName || "";
        token.lastName = user.lastName || "";
        token.company = user.company || "";
      }
      return token; // Always return the token, let middleware/client handle expiration
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      // If token is missing critical data, we'll handle redirection elsewhere
      if (!token.access) {
        // Instead of returning null, return an empty session and handle in middleware/client
        return session;
      }

      session.user = {
        id: token.id as string,
        email: token.name as string,
        role: token.roles as string[],
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        company: token.company as string,
      };
      session.token = token.access as string;
      return session;
    },
    async signIn({ user }: { user: NextAuthUser }) {
      if (!user.role || user.role.length === 0) {
        console.error("User roles are missing during sign-in");
        return false;
      }

      const redirectPath = getRedirectPath(user.role);
      if (!redirectPath) {
        console.error("No valid role found for user");
        return false;
      }

      console.log("Redirecting to:", redirectPath);
      return true;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}