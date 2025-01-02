"use server";

import { request } from "@/utils/request";
import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Candidate } from "@/types";
import { SortOrder } from "@/types/enum";

type CandidateResponse = {
  status: number;
  message: string;
  data: Candidate;
};

interface PaginatedCandidateResponse {
  status: number;
  message: string;
  data: {
    totalPages: number;
    data: Candidate[]; // Array of Candidate objects
    count: number;
    currentPage: number;
  };
}

export const fetchCandidateById = async (
  id: string,
): Promise<CandidateResponse> => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${baseUrl}/v1/job-candidate/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as Promise<CandidateResponse>;
};

export const getJobCandidate = async (
  sortOrder: SortOrder,
  page: number,
  limit: number,
  status?: string,
  jobTitle?: string,
): Promise<PaginatedCandidateResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/job-candidate`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      status,
      jobTitle,
    },
  }) as Promise<PaginatedCandidateResponse>;
};

export const candidateMoveStage = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/job-candidate/${id}/stage`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      data: payload,
    },
  );

  return response;
};

export const candidateUpdateStatus = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/job-candidate/${id}/status`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      data: payload,
    },
  );

  return response;
};

export const candidateReject = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/job-candidate/${id}/status`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      data: payload,
    },
  );

  return response;
};
