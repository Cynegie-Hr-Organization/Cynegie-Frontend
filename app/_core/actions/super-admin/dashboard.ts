import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getSuperAdminDashboard = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<ISuperAdminDashboard>('approval-management/dashboard-summary', {
      headers: await headers(session?.token ?? ''),
    })

    return data
  } catch (error) {
    throw handleError(error);
  }
}

export interface ISuperAdminDashboard {
  totalHrRequests: number;
  totalItApprovalRequests: number;
  totalFinanceApprovalRequests: number;
  permissionAnalytics: {
    full_access: number;
    limited_access: number;
    view_only: number;
  };
}


