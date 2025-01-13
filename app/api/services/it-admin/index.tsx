/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Device, DeviceRequest, SecurityAlert, Software } from "@/types";

interface DevicePaginatedResponse<T> {
  totalPages: number;
  count: number;
  currentPage: number;
  devices: T[];
}

interface SoftwarePaginatedResponse<T> {
  totalPages: number;
  count: number;
  currentPage: number;
  software: T[];
}

interface DeviceRequestPaginatedResponse<T> {
  totalPages: number;
  count: number;
  currentPage: number;
  requests: T[];
}

interface SecurityAlertsPaginatedResponse<T> {
  totalPages: number;
  count: number;
  currentPage: number;
  securityAlerts: T[];
}

export const createDevice = async (payload: any) => {
  const session = await getServerSession(authOptions);
  return request("POST", `${baseUrl}/v1/devices`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const getDeviceManagement = async (
  page: number,
  limit: number,
  sortOrder: string = "desc",
  status?: string,
  search?: string,
): Promise<DevicePaginatedResponse<Device>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/devices`, {
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
  }) as Promise<DevicePaginatedResponse<Device>>;
};

export const updateDevice = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);
  return request("PUT", `${baseUrl}/v1/devices/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const deleteDevice = async (id: string) => {
  const session = await getServerSession(authOptions);
  return request("DELETE", `${baseUrl}/v1/devices/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};

export const getSoftwareManagement = async (
  page: number,
  limit: number,
  sortOrder: string = "desc", // Default to ascending order
  status?: string,
  search?: string,
): Promise<SoftwarePaginatedResponse<Software>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/software`, {
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
  }) as Promise<SoftwarePaginatedResponse<Software>>;
};

export const getSecurityAlerts = async (
  page: number,
  limit: number,
  sortOrder: string = "desc",
  status?: string,
  search?: string,
): Promise<SecurityAlertsPaginatedResponse<SecurityAlert>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/security-alerts`, {
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
  }) as Promise<SecurityAlertsPaginatedResponse<SecurityAlert>>;
};

export const updateSecurityAlerts = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);
  return request("PUT", `${baseUrl}/v1/security-alerts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const deleteSecurityAlerts = async (id: string) => {
  const session = await getServerSession(authOptions);
  return request("DELETE", `${baseUrl}/v1/security-alerts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};

export const getDeviceRequests = async (
  page: number,
  limit: number,
  sortOrder: string = "desc",
  status?: string,
  search?: string,
): Promise<DeviceRequestPaginatedResponse<DeviceRequest>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/devices/requests`, {
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
  }) as Promise<DeviceRequestPaginatedResponse<DeviceRequest>>;
};

export const updateDeviceRequestStatus = async (
  id: string,
  status: string,
  rejectionReason?: string,
) => {
  const session = await getServerSession(authOptions);
  return request("PATCH", `${baseUrl}/v1/devices/requests/${id}/status`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: { status, rejectionReason },
  });
};

export const updateSoftware = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);
  return request("PUT", `${baseUrl}/v1/software/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const deleteSoftware = async (id: string) => {
  const session = await getServerSession(authOptions);
  return request("DELETE", `${baseUrl}/v1/software/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};
