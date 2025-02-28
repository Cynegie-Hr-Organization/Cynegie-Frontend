"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { baseUrl } from "@/constants/config";
import { FetchParams } from "@/types";
import axios from "axios";
import { getServerSession } from "next-auth";

export const get = async (endpoint: string, params?: FetchParams) => {
  const session = await getServerSession(authOptions);
  const res = await axios.get(`${baseUrl}/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
    params: params,
  });
  return res.data;
};
