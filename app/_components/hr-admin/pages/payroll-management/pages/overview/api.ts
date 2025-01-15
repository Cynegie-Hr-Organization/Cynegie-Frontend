"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
  FetchParams,
  FetchResponse,
  PaginatedResponse2,
  Payroll,
} from "@/types";
import { Employee } from "@/types/api-index";

export const getPayrolls = async (
  params: FetchParams
): Promise<PaginatedResponse2<Payroll>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/payroll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedResponse2<Payroll>>;
};

export const getPayroll = async (
  id: string
): Promise<FetchResponse<Payroll>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
  }) as Promise<FetchResponse<Payroll>>;
};

export const getMyEmployees = async (
  params: FetchParams
): Promise<PaginatedResponse2<Employee>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/employees/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedResponse2<Employee>>;
};

export type CreatePayrollPayload = {
  payrollName: string;
  startDate: string;
  endDate: string;
  status: "approved" | "pending" | "rejected";
  paymentDate: string;
  employees: (string | null)[];
};

export const createPayroll = async (payload: CreatePayrollPayload) => {
  const session = await getServerSession(authOptions);
  return request("POST", `${baseUrl}/v1/payroll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const editPayroll = async (
  id: string,
  payload: CreatePayrollPayload
) => {
  const session = await getServerSession(authOptions);
  return request("PUT", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const deletePayroll = async (id: string) => {
  const session = await getServerSession(authOptions);
  return request("DELETE", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};

export const viewPayroll = async (
  id: string
): Promise<FetchResponse<Payroll & { totalEmployees: number }>> => {
  const session = await getServerSession(authOptions);
  return request("GET", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<FetchResponse<Payroll & { totalEmployees: number }>>;
};
