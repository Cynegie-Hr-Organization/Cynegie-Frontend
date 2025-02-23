/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";
import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { FetchParams } from "@/types";

// Define the structure of the company object
interface Company {
  name: string;
  id: string;
}

// Define the structure of each salary advance request item
interface SalaryAdvanceRequest {
  _id: string;
  employeeId: string;
  advanceTaken: number;
  status: "pending" | "approved" | "rejected";
  paymentFrequency: "MONTHLY" | "YEARLY";
  installment: number;
  amountRepaid: number;
  payments: any[];
  nextPaymentDate: string;
  company: Company;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the structure of the meta object
interface Meta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Define the overall response type
interface GetAllMyRequestResponse {
  data: SalaryAdvanceRequest[];
  meta: Meta;
}

// Define the structure of each benefit item
interface Benefit {
  name: string;
  id: string;
}

// Define the structure of the response data
interface BenefitData {
  benefitType?: string;
  benefit?: Benefit;
  employee: string;
  provider: string;
  coveragePlan: string;
  monthlyCost: number;
  status: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface StatusCount {
  pending: string;
  approved: string;
  rejected: string;
}

// Define the overall response type
interface GetAllMyAppResponse {
  data: BenefitData[];
  total: number;
  page: number;
  limit: number;
  statusCount: StatusCount;
}

// Function to request salary advance
export const requestSalaryAdvance = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "POST",
    `${baseUrl}/v1/salary-advance-requests`,
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

// Function to get all salary advance requests
export const getAllMySalaryAdvanceRequests = async (
  fetchParams: FetchParams,
): Promise<GetAllMyRequestResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/salary-advance-requests/my-requests`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: fetchParams,
  }) as Promise<GetAllMyRequestResponse>;
};

// Function to get all benefits
export const getAllBenefits = async (): Promise<
  { label: string; value: string }[]
> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/benefits`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response || !response.data) {
    throw new Error("Failed to fetch benefits data");
  }

  return (
    response.data.map((item: any) => ({
      label: item.benefitType,
      value: item.id,
    })) || []
  );
};

// Function to request a benefit
export const requestBenefit = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "POST",
    `${baseUrl}/v1/benefits/request-benefit`,
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

// Function to get benefit request by ID
export const getBenefitRequestById = async (id: string | number) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "GET",
    `${baseUrl}/v1/benefits/request/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};

// Function to get all my benefits requests
export const getAllMyBenefitsRequests = async (
  fetchParams: FetchParams,
): Promise<GetAllMyAppResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/benefits/my-benefits`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: fetchParams,
  });

  return response as GetAllMyAppResponse;
};

// Function to get salary advance metrics
export const getSalaryAdvanceMetrics = async () => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "GET",
    `${baseUrl}/v1/salary-advance-requests/summary?type=employee`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};
