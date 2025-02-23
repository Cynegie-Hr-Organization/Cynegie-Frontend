import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getApprovals = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IUpdateRequestRes>(
      `employee-update/update-requests`,
      {
        headers: await headers(session?.token ?? ""),
      },
    );

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getProfileUpdateApprovals = async (
  queryParams: {
    page?: number;
    limit?: number;
    status?: IRequestStatus;
    sortOrder?: string;
    isHrRequest?: boolean;
    isEmployeeRequest?: boolean;
    requestType?: IUpdateRequestType;
  },
  endpoint = "profile-updates/approval-request" as string,
) => {
  let queryStr = "?";

  if (queryParams?.sortOrder) queryStr += `sortOrder=${queryParams.sortOrder}`;
  if (queryParams?.page) queryStr += `&page=${queryParams.page}`;
  if (queryParams?.limit) queryStr += `&limit=${queryParams.limit}`;
  if (queryParams?.isHrRequest)
    queryStr += `&isHrRequest=${queryParams.isHrRequest}`;
  if (queryParams?.isEmployeeRequest)
    queryStr += `&isEmployeeRequest=${queryParams.isEmployeeRequest}`;
  if (queryParams?.status) queryStr += `&status=${queryParams.status}`;
  if (queryParams?.requestType)
    queryStr += `&requestType=${queryParams.requestType}`;

  try {
    const session = await getSession();
    const { data } = await Http.get<IUpdateRequestRes>(endpoint + queryStr, {
      headers: await headers(session?.token ?? ""),
    });

    console.log("***********************");
    console.log(endpoint + queryStr);
    console.log("***********************");
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export type IUpdateRequestType = "profile_update" | "leave_request";
export type IRequestStatus = "pending" | "approved" | "rejected";

export interface IUpdateRequestRes {
  data: IUpdateRequest[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface IRequestedBy {
  _id: string;
  employmentInformation: string;
  personalInfo: {
    firstName?: string;
    lastName?: string;
    email?: string;
    id?: string;
  } | null;
  compensation: string;
  documents: string[];
  NextOfKin: string[];
  accessRights: string[];
  deletedAt: string | null;
  department: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateRequest {
  employeeId: {
    employmentInformation: string;
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      id: string;
    };
    compensation: string;
    documents: string[];
    NextOfKin: string[];
    accessRights: string[];
    deletedAt: null | string;
    department: string;
    company: string;
    profileUpdateRequestStatus: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  updates: Record<string, string>; // Flexible object for various update types
  status: IRequestStatus;
  company: string;
  isEmployeeRequest: boolean;
  isHrRequest: boolean;
  requestedBy: IRequestedBy;
  requestType: string;
  reasonForUpdate: string;
  supportingDocuments: string[];
  approvalDate: string | null;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  id: string;
}
