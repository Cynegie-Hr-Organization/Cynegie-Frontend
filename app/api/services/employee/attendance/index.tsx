
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";


export type AttendanceRecord = {
  employee: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  deletedAt?: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};



export const clockIn = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${baseUrl}/v1/attendance/clock-in`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const clockOut = async (id: any) => {
  const session = await getServerSession(authOptions);

  const response = request("PATCH", `${baseUrl}/v1/attendance/${id}/clock-out`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
}



export const fetchAttendanceMine = async (): Promise<AttendanceRecord[]> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/attendance/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as AttendanceRecord[];
};



export const fetchAttendanceById = async (id : any): Promise<AttendanceRecord> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/attendance/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as AttendanceRecord;
};