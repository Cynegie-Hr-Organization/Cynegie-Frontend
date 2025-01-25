import { request } from "@/utils/request";
import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export const updateProfile = async (data: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PUT",
    `${baseUrl}/v1/employees/personal-info`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      data: data,
    },
  );

  return response;
};