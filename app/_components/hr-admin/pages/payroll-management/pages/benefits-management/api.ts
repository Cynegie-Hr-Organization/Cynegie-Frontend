"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { baseUrl } from "@/constants/config";
import {
  AddEmployeePayload,
  Benefit,
  BenefitResponse,
  Department,
  FetchParams,
  PaginatedResponse3,
  PaginatedResponse4,
  PaginatedResponse5,
  Role,
} from "@/types";
import { Employee } from "@/types/api-index";
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
  params: FetchParams,
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

export const getBenefit = async (id: string): Promise<BenefitResponse> => {
  const session = await getServerSession(authOptions);
  return request("GET", `${baseUrl}/v1/benefits/${id}`, {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<BenefitResponse>;
};

export const enrollToBenefit = async (
  id: string,
  payload: { employeeIds: string[] },
) => {
  const session = await getServerSession(authOptions);
  return request("POST", `${baseUrl}/v1/benefits/${id}/enroll`, {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const getDepartments = async (
  params: FetchParams,
): Promise<PaginatedResponse4<Department>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/departments`, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: params,
  }) as Promise<PaginatedResponse4<Department>>;
};

export const getRoles = async (): Promise<PaginatedResponse5<Role>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/role/all`, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<PaginatedResponse5<Role>>;
};

export const deleteDepartment = async (id: string) => {
  const session = await getServerSession(authOptions);

  return request("DELETE", `${baseUrl}/v1/departments/${id}`, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};

export const addEmployee = async (payload: AddEmployeePayload) => {
  const session = await getServerSession(authOptions);

  return request("POST", `${baseUrl}/v1/employees`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const getEmployee = async (id: string): Promise<Employee> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/employees/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<Employee>;
};
