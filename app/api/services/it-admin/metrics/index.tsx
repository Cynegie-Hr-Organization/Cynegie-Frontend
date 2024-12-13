"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { DeviceMetrics, SecurityAlertsAnalytics } from "@/types";

export const fetchSecurityAlertsMetric =
  async (): Promise<SecurityAlertsAnalytics> => {
    const session = await getServerSession(authOptions);

    const response = request("GET", `${baseUrl}/v1/security-alerts/analytics`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    });

    return response as unknown as SecurityAlertsAnalytics;
  };

export const fetchDeviceAndRequestMetric = async (): Promise<DeviceMetrics> => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${baseUrl}/v1/devices/analytics`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as unknown as DeviceMetrics;
};
