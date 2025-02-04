import { getSession } from "next-auth/react";

export const getUserDetails = async () => {
  try {
    const session = await getSession();

    if (session && session.user)
    {
      const fullName =
      `${session.user.firstName || ""} ${session.user.lastName || ""}`.trim();
      const roles = session.user.role
      return {
        name: fullName || "User",
        email: session.user.email || "Email",
        roles  
      };
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
  return null;
};
