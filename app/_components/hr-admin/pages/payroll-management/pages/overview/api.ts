"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";

import { SortOrder } from "@/types/enum";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PaginatedResponse2, Payroll } from "@/types";
export const getPayrolls = async (): Promise<PaginatedResponse2<Payroll>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/payroll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: {
      page: 1,
      limit: 10,
      sortOrder: "asc",
    },
  }) as Promise<PaginatedResponse2<Payroll>>;
};
