import { getSession } from "next-auth/react";
import { getProfile } from "@/app/api/services/employee/profile";

export const getUserDetails = async () => {
  try
  {
        const sessionData = await getSession();
    const profileResponse = await getProfile();
    const roles = sessionData?.user.role

    if (
      profileResponse &&
      profileResponse.employee &&
      profileResponse.employee.personalInfo &&
      profileResponse.employee.personalInfo.firstName
    ) {
      const fullName = `${profileResponse.employee.personalInfo.firstName || ""} ${profileResponse.employee.personalInfo.lastName || ""}`.trim();
      const email = profileResponse.employee.personalInfo.email || "Email";
      return {
        name: fullName || "User",
        email,
        roles,
      };
    }

    // If profile data is not available, fall back to session data
    if (sessionData && sessionData.user) {
      const fullName = `${sessionData.user.firstName || ""} ${sessionData.user.lastName || ""}`.trim();
      return {
        name: fullName || "User",
        email: sessionData.user.email || "Email",
        roles,
      };
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
  return null;
};