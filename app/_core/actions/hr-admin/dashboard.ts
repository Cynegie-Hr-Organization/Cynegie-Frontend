import { IEmployeeStatusDistribution, IHrAdminDashboardOverview, IPriorityTaskRes } from "@/app/_core/interfaces/hr-admin";
import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getHRAdminOverviewCardData = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IHrAdminDashboardOverview>('hr-admin/dashboard/overview', {
      headers: await headers(session?.token ?? ''),
    })
    return data
  } catch (error) {
    throw handleError(error)
  }
}


export const getHRAdminChartData = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get('hr-admin/dashboard/payroll-processed', {
      headers: await headers(session?.token ?? ''),
    })
    return data
  } catch (error) {
    throw handleError(error)
  }
}


export const getEmployeeStatus = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IEmployeeStatusDistribution>('hr-admin/dashboard/employee-status', {
      headers: await headers(session?.token ?? ''),
    })
    console.log(data)
    return data
  } catch (error) {
    throw handleError(error)
  }
}


export const getPriorityData = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IPriorityTaskRes>('hr-admin/dashboard/tasks', {
      headers: await headers(session?.token ?? ''),
    })
    // console.log(data)
    return data
  } catch (error) {
    throw handleError(error)
  }
}