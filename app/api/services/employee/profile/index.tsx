"use server";
import { request } from "@/utils/request";
import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export const requestUpdateProfile = async (data: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("POST", `${baseUrl}/v1/profile-updates`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: data,
  });

  return response;
};

export const getProfile = async () => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/employees/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};
