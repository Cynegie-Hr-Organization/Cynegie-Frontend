"use server";
import { Employee, ServerResponse } from "@/types/api-index";
import { SortOrder } from "@/types/enum";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { request } from "@/utils/request";
import { baseUrl } from "@/constants/config";

export const getEmployee = async (
  page: number,
  limit: number,
  sortOrder: SortOrder,
  status?: string,
  search?: string,
): Promise<ServerResponse<Employee>> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/employees/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      page,
      limit,
      sortOrder,
      status: status || undefined,
      search: search || undefined,
    },
  });
  return response as ServerResponse<Employee>;
};
