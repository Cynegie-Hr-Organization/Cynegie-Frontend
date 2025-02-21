import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";




export const getOnboadingOverviewData = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IOnboardingDataRes>('hr-admin/onboarding/overview', {
      headers: await headers(session?.token ?? ''),
    })

    return data;
  } catch (error) {
    throw handleError(error)
  }
}

export interface IOnboardingDataRes {
  totalNewHires: number;
}

export const getOnboadingTaskList = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IOnboardingDataRes>('hr-admin/onboarding/overview', {
      headers: await headers(session?.token ?? ''),
    })

    return data;
  } catch (error) {
    throw handleError(error)
  }
}

export const getNewHireList = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get('hr-admin/onboarding/new-hire-list', {
      headers: await headers(session?.token ?? ''),
    })

    return data;
  } catch (error) {
    throw handleError(error)
  }
}