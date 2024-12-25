/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { GoalResponse } from "@/types";

export const createGoals = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/goals`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getGoals = async (
  page: number,
  limit: number,
  sortOrder: string = "asc",
  status?: string,
  search?: string,
): Promise<GoalResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/goals`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      page,
      limit,
      sortOrder,
      status,
      search,
    },
  }) as Promise<GoalResponse>;
};

export const deleteGoal = async (id: string) => {
  const session = await getServerSession(authOptions);

  return request("DELETE", `${baseUrl}/v1/goals/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};

export const fetchGoalById = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${baseUrl}/v1/goals/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};
