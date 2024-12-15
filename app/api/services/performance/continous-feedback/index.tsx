/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export const giveFeedback = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/feedback/give-feedback`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const requestFeedback = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/feedback/request-feedback`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};
