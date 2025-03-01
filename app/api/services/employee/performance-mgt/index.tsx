/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { Goal } from "@/types";
import { AssessmentById, GetAllMySelfAssessmentResponse } from "./types";

export interface GoalResponse {
  data: Goal[];
  itemCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

export const getAllMyGoals = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  search?: string,
  status?: string,
): Promise<GoalResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/goals/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      search,
      status,
    },
  });

  return response as GoalResponse;
};

export const fetchGoalsById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/goals/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const completeGoalsById = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/goals/${id}/complete`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return response;
};

//performace-mgt

//performace-mgt

export const getAllMySelfAssessment = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  search?: string,
  type: string = "SELF",
): Promise<GetAllMySelfAssessmentResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/assessments/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      search,
      type,
    },
  });

  return response as GetAllMySelfAssessmentResponse;
};

export const getAssessmentById = async (id: string): Promise<AssessmentById> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/assessments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as AssessmentById;
};

export const answerAssessmentById = async (data: any) => {
  const session = await getServerSession(authOptions);

  const response = await request("POST", `${baseUrl}/v1/answers`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: data,
  });

  return response;
};
