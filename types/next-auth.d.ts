/* eslint-disable @typescript-eslint/no-unused-vars */
// Update the declaration of next-auth module to reflect changes
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string; // Added first name
    lastName: string; // Added last name
    role: string;
    company: string; // Added company
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }

  interface Session {
    user: Partial<User>;
    token: string; // accessToken will be a string in the session
  }
}
