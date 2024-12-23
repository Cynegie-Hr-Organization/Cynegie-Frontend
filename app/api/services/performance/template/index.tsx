/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export const createTemplate = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/templates`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getTemplatesById = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${baseUrl}/v1/templates/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const getTemplates = async () => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${baseUrl}/v1/templates`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const archiveTemplate = async (id: string) => {
  const session = await getServerSession(authOptions);

  return request("PUT", `${baseUrl}/v1/templates/${id}/archive`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};
