import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getApprovals = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IUpdateRequestRes>(`employee-update/update-requests`, {
      headers: await headers(session?.token ?? '')
    })

    return data;

  } catch (error) {
    throw handleError(error);
  }
}


export interface IUpdateRequestRes {
  message: string;
  updateRequests: IUpdateRequest[];
}

export interface IUpdateRequest {
  employeeId: {
    personalInfo: null | any;
    id: string;
  };
  reasonForUpdate: string;
  supportingDocuments: string[];
  status: string;
  approvedBy: string;
  approvalDate: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}