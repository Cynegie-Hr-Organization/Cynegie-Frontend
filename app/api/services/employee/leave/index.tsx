/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export const getLeaveType = async () => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/leave-type`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response || !response.data) {
    throw new Error("Failed to fetch benefits data");
  }

  const res =
    response.data.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  return res;
};

export const requestLeave = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("POST", `${baseUrl}/v1/leave`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getAllLeaveRequest = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  status?: string,
  search?: string,
) => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/leave/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      status,
      search,
    },
  });

  return response;
};

export const fetchLeaveRequestById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/leave/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const deleteLeaveRequestById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("DELETE", `${baseUrl}/v1/leave/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};


export const getAllLeaveMetrics = async () => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/leave/current-year-summary`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};