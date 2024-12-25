/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

interface FeedbackDetails {
  feedbackNature: string;
  template: string;
}

interface EmployeePersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

interface Employee {
  employmentInformation: string;
  personalInfo: EmployeePersonalInfo;
  compensation: string;
  documents: string[];
  NextOfKin: string[];
  accessRights: string[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Feedback {
  feedbackName: string;
  employees: Employee[];
  department: string[];
  feedbackProviders: string[];
  startDate: string;
  endDate: string;
  feedbackDetails: FeedbackDetails[];
  anonymousCycle: boolean;
  status: string;
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: {
    items: T;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
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
  sortOrder: string = "desc",
  status?: string,
  search?: string,
): Promise<ApiResponse<Feedback[]>> => {
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
  }) as Promise<ApiResponse<Feedback[]>>;
};
