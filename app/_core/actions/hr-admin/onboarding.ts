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

export const getTemplates = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<ITemplatesRes>('templates', {
      headers: await headers(session?.token ?? ''),
    })

    return data;
  } catch (error) {
    throw handleError(error)
  }
}

export interface ITemplatesRes {
  status: number;
  message: string;
  data: ITemplate[];
}

export interface ITemplate {
  id: string;
  templateName: string;
  instructions: string;
  deleted: boolean;
  createdBy: {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
  };
  questions: ITemplateQuestion[];
  company: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITemplateQuestion {
  id: string;
  question: string;
  description: string;
  responseCriteria: 'rating' | 'text' | 'multiple_choice' | 'single_choice';
  options?: string[];
  allowComments: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ResponseCriteria =
  | 'rating'
  | 'text'
  | 'multiple_choice'
  | 'single_choice';