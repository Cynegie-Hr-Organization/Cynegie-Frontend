/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export const getAllDeviceRequest = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
    search?: string,
  status?: string,
) => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/devices/my-requests`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      search,
      status,
    },
  });

  return response;
};

export const fetchDeviceRequestById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "GET",
    `${baseUrl}/v1/devices/requests/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};

export const returnDeviceById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/devices/${id}/return`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};

export const requestMaintenaceById = async (id: any, reason: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "POST",
    `${baseUrl}/v1/devices/request-maintenance`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      data: {
        deviceId: id,
        reason: reason,
      },
    },
  );

  return response;
};
