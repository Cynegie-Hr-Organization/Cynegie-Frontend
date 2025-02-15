/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  id: string;
}

export interface EmploymentInformation {
  jobTitle: string;
  department: string;
  staffId: string;
  id: string;
}

export interface Employee {
  employmentInformation: EmploymentInformation;
  personalInfo: PersonalInfo;
  id: string;
}

export interface AttendanceRecord {
  id: string;
  employee: Employee;
  date: string;
  clockIn?: string;
  clockOut?: string;
  status: string;
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  hoursWorked: number;
}

export interface AttendanceResponse {
  data: AttendanceRecord[];
  total: number;
  page: number;
  limit: number;
  statusCounts: Record<string, number>;
}

export const clockIn = async () => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/attendance/clock-in`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const clockOut = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = request(
    "PATCH",
    `${baseUrl}/v1/attendance/${id}/clock-out`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};

export const fetchAttendanceMine = async (
  sortOrder: string = "desc",
  page: number = 1,
  limit: number = 10,
  status?: string,
  search?: string,
  date?: string,
  department?: string,
  jobTitle?: string,
): Promise<AttendanceResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/attendance/mine`, {
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
      date,
      department,
      jobTitle,
    },
  });

  return response as AttendanceResponse;
};

export const fetchAttendanceById = async (
  id: any,
): Promise<AttendanceRecord> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/attendance/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as AttendanceRecord;
};

export const getCurrentAttendanceRecords = async () => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "GET",
    `${baseUrl}/v1/attendance/weekly-summary`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};
