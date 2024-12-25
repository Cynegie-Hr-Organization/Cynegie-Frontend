/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

interface EmployeePersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

interface Employee {
  employmentInformation: string;
  personalInfo: EmployeePersonalInfo;
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

interface Course {
  courseTitle: string;
  courseDescription: string;
  courseSource: string[];
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  deletedAt: string | null;
  employee: Employee;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface GetAllCoursesResponse {
  data: Course[];
  itemCount: number;
}

export const assignCourse = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request(
    "POST",
    `${baseUrl}/v1/course-management/assign-course`,
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

export const getAllCourses = async (
  page: number,
  limit: number,
  sortOrder: string = "asc",
  status?: string,
  search?: string,
): Promise<GetAllCoursesResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/course-management`, {
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
    },
  }) as Promise<GetAllCoursesResponse>;
};
