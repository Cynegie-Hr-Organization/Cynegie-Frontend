"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { baseUrl } from "@/constants/config";
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
