/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";


export interface Task {
  taskName: string;
  status: string;
  description: string;
  label: string;
  dueDate: string;
  employees: string[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Meta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetMyTasksResponse {
  data: Task[];
  meta: Meta;
}


export const getMyTasks = async (
  search : string
) : Promise<GetMyTasksResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/task/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: { search },
  });

  return response as GetMyTasksResponse;
};

export const getTaskByID = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/task/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const changeTaskStatusById = async (id: any, status: string) => {
  const session = await getServerSession(authOptions);

  const response = await request("PATCH", `${baseUrl}/v1/task/${id}/status`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: {
      status: status,
    },
  });

  return response;
};
