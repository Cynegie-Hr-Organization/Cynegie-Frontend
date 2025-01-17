"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { baseUrl } from "@/constants/config";
import { Benefit, FetchParams, PaginatedResponse3 } from "@/types";
import { request } from "@/utils/request";
import { getServerSession } from "next-auth";

export type AddBenefitPayload = {
  name: string;
  benefitType: string;
  departments: string[];
  employmentType: string;
  jobLevel: string;
  startDate: string;
  endDate: string;
  employerContribution: number;
  employeeContribution: number;
  status: string;
};

export const getBenefits = async (
  params: FetchParams
): Promise<PaginatedResponse3<Benefit>> => {
  const session = await getServerSession(authOptions);
  return request("GET", `${baseUrl}/v1/benefits`, {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: params,
  }) as Promise<PaginatedResponse3<Benefit>>;
};

export const addBenefit = async (payload: AddBenefitPayload) => {
  const session = await getServerSession(authOptions);
  return request("POST", `${baseUrl}/v1/benefits`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};
