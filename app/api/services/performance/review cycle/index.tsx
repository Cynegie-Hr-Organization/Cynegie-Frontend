/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ReviewCycle } from "@/types";

interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const createReviewCycle = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/review-cycles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getReviewCycles = async (
  page: number,
  limit: number,
  sortOrder: string = "asc",
  status?: string,
  search?: string,
): Promise<{ data: ReviewCycle[]; meta: PaginationMeta }> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/review-cycles`, {
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
  }) as Promise<{ data: ReviewCycle[]; meta: PaginationMeta }>;
};

export const editReviewCycle = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);

  return request("PUT", `${baseUrl}/v1/review-cycles/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const fetchReviewCycleById = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${baseUrl}/v1/review-cycles/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const deleteReviewCycle = async (id: string) => {
  const session = await getServerSession(authOptions);

  return request("DELETE", `${baseUrl}/v1/review-cycles/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};
