/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Candidate } from "@/types";

export interface ScheduleInterviewPayload {
  description: string;
  startTime: string;
  reminderTime: string | null;
  startDate: string;
  candidate: string;
  interviewer: string;
  status: string;
}

interface InterviewResponse {
  status: number;
  data: Interview;
}

export interface Job {
  title: string;
  department: string;
  id: string;
}

export interface Allowance {
  allowanceName: string;
  allowanceAmount: number;
  id: string;
}

export interface Deduction {
  deductionName: string;
  deductionAmount: number;
  id: string;
}

export interface Compensation {
  baseSalary: number;
  salaryFrequency: string;
  overtime: string;
  taxFilingStatus: string;
  paymentMethod: string;
  bonusStructure: string;
  commission: number;
  stockOptions: number;
  payGrade: string;
  taxIdentificationNumber: string;
  allowance: Allowance[];
  deduction: Deduction[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface PersonalInfo {
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

export interface EmploymentInformation {
  jobTitle: string;
  department: string;
  manager: string;
  employmentType: string;
  employmentStatus: string;
  workLocation: string;
  workSchedule: string;
  probationPeriod: string;
  contractEndDate: string;
  staffId: string;
  workEmail: string;
  hireDate: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Interviewer {
  employmentInformation: EmploymentInformation;
  personalInfo: PersonalInfo;
  compensation: Compensation;
  id: string;
}

export interface Interview {
  description: string;
  startTime: string;
  reminderTime: string;
  startDate: string;
  candidate: Candidate;
  interviewer: Interviewer;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GetInterviewsResponse {
  data: Interview[];
  itemCount: number;
}

interface ResponseData {
  description: string;
  startTime: string;
  reminderTime: string;
  startDate: string;
  candidate: Candidate;
  interviewer: Interviewer;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface IdApiResponse {
  status: number;
  data: ResponseData;
}

export const scheduleInterview = async (payload: ScheduleInterviewPayload) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/job-interviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const fetchInterviewById = async (
  id: string,
): Promise<IdApiResponse> => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${baseUrl}/v1/job-interviews/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as Promise<InterviewResponse>;
};

export const getInterviews = async (
  sortOrder: string = "asc",

  page: number,
  limit: number,
  status?: string,
  search?: string,
): Promise<GetInterviewsResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/job-interviews/all-interviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      status,
      search,
    },
  }) as Promise<GetInterviewsResponse>;
};
