
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";



export const getTasks = async () => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/task/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};


export const changeTaskStatusById = async (id: any , status : string) => {
  const session = await getServerSession(authOptions);

  const response = await request("PATCH", `${baseUrl}/v1/task/${id}/status`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
      },
      data: {
          status: status,
      },
  });

  return response;
};

