/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  gender: string;
  state: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  nationality: string;
  maritalStatus: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Employee {
  employmentInformation: string;
  personalInfo: PersonalInfo;
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

export interface Assessment {
  assessmentName: string;
  type: string;
  employees: Employee[];
  manager: Employee;
  template: string;
  dueDate: string;
  status: string;
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface AssessmentData {
  items: Assessment[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
export interface AssessmentResponse {
  status: number;
  message: string;
  data: AssessmentData;
}

export const createAssessment = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/assessments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getAssessments = async (
  page: number,
  limit: number,
  sortOrder: string = "desc",
  type: string,
  search?: string,
  status?: string,
): Promise<AssessmentResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/assessments`, {
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
      type,
    },
  }) as Promise<AssessmentResponse>;
};
