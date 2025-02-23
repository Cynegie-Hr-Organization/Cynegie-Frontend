/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { FetchParams } from "@/types";

interface AppId {
  appName: string;
  id: string;
}

interface AppRequestItem {
  employee: string;
  appId: AppId;
  status: string;
  reasonForRequest: string;
  company: string;
  requestDate: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface AppRequestsResponse {
  data: AppRequestItem[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export const getApps = async () => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/app`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  const apps =
    response?.data?.items.map((item: any) => ({
      label: item.appName,
      value: item.id,
    })) || [];

  return apps;
};

export const requestApp = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/request`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getAllMyAppRequest = async (
  fetchParams: FetchParams,
): Promise<AppRequestsResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/request/my-requests`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: fetchParams,
  });

  return response as AppRequestsResponse;
};

export const fetchAppRequestById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/request/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};
