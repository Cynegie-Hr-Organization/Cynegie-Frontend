/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { SortOrder } from "@/types/enum";
import { JobOffer, JobOfferResponse } from "@/types";

interface ApiResponse {
  status: number;
  message: string;
  data: JobOffer;
}

export const createJobOffer = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/job-offers`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getJobOffers = async (
  sortOrder: SortOrder,
  page: number,
  limit: number,
  status?: string,
  jobTitle?: string,
): Promise<JobOfferResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/job-offers/company`, {
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
  }) as Promise<JobOfferResponse>;
};

export const fetchJobOfferById = async (id: string): Promise<ApiResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "GET",
    `${baseUrl}/v1/job-offers/company/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response as ApiResponse;
};

export const acceptJobOffer = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/job-offers/${id}/accept`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};

export const withdrawJobOffer = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/job-offers/${id}/withdraw`,
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

export const resendJobOffer = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/job-offers/${id}/resend`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};

export const editJobOffer = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${baseUrl}/v1/job-offers/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};
