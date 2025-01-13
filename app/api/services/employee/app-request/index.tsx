
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";


// Define the structure for the appId object
interface AppId {
  appName: string;
  id: string;
}

// Define the structure for a single app request item
interface AppRequestItem {
  employee: string;
  appId: AppId;
  status: string;
  reasonForRequest: string;
  company: string;
  requestDate: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Define the response structure for fetching all app requests
interface AppRequestsResponse {
  status: number;
  message: string;
  data: {
    items: AppRequestItem[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
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
    
    
  const apps = response?.data?.items.map((item: any) => ({
    label: item.appName, 
    value: item.id, // Using app ID as value
  })) || [];

  return apps ;
};


export const requestApp = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/request`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data : payload,
  });

  return response;
}





export const getAllMyAppRequest = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  status?: string,
  search?: string
): Promise<AppRequestsResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/request/my-requests`, {
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

  return response as AppRequestsResponse;
};
