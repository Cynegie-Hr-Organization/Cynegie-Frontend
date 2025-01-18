
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";


// Define the types for a course
export interface Course {
  courseTitle: string;
  courseDescription: string;
  courseSource: string[];
  startDate: string;
  endDate: string;
  deletedAt: string | null;
  employee: {
    id: string;
  };
  company: {
    name: string;
    id: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Define the response data structure
export interface GetAllAssignCourseResponse {
  status: number;
  message: string;
  data: {
    items: Course[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export const getAllAssignCourse = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  search?: string,
  status: string = "ACTIVE"
): Promise<GetAllAssignCourseResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/course-management/my-courses`, {
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
  }) as Promise<GetAllAssignCourseResponse>;
};



export const completeCourse = async (id : any , status : any) => {
  const session = await getServerSession(authOptions);

  const response = await request("POST", `${baseUrl}/v1/course-management/${id}/status`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
      },
    data: {
        status : status
      },
  });

  return response;
}

export const fetchCourseById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "GET",
    `${baseUrl}/v1/course-management/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};
