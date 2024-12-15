/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { Get360FeedbackResponse } from "@/types";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const create360Feedback = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("POST", `${baseUrl}/v1/feedback360`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const get360Feedback = async (
  page: number,
  limit: number,
  sortOrder: string = "asc",
  status?: string,
  search?: string,
): Promise<ApiResponse<Get360FeedbackResponse>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/feedback360`, {
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
  }) as Promise<ApiResponse<Get360FeedbackResponse>>;
};
