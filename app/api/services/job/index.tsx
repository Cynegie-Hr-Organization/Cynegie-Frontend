/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { CreateJobProps } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

import { PaginatedResponse, Job } from "@/types";
import { SortOrder } from "@/types/enum";

export const createJob = async (payload: CreateJobProps) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/jobs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getJobs = async (
  page: number,
  limit: number,
  sortOrder: SortOrder,
  status?: string,
  title?: string,
  department?: string,
  jobLocation?: string,
  search?: string,
  company?: string,
  requiredSkills?: string[],
  type?: string,
): Promise<PaginatedResponse<Job>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/jobs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: {
      page,
      limit,
      sortOrder,
      status,
      title,
      department,
      jobLocation,
      search,
      company,
      requiredSkills,
      type,
    },
  }) as Promise<PaginatedResponse<Job>>;
};


export const editJob = async (id: string, payload : any) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${baseUrl}/v1/jobs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};