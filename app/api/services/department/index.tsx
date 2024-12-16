"use server";

import { SortOrder } from "@/types/enum";
import { request } from "@/utils/request";
import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";

// Define the Department type
type Department = {
  id: string;
  departmentName: string;
  departmentManager: string;
  employees: string[];
  userLimit: number;
  status: string;
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
};

// Define the Meta type
type Meta = {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

// Define the API response type
type DepartmentResponse = {
  data: Department[];
  meta: Meta;
};

// Implement the getDepartment function
export const getDepartment = async (
  page: number,
  limit: number,
  sortOrder: SortOrder,
  status?: string,
  search?: string,
): Promise<DepartmentResponse> => {
  const session = await getServerSession(authOptions);

  // Make the request to fetch department data
  const response = await request("GET", `${baseUrl}/v1/departments`, {
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

  // Cast and return the response
  return response as DepartmentResponse;
};
