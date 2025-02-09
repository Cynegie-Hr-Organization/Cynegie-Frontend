import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";



export const getAllPermissions = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IPermissionRes>('role/all', {
      headers: await headers(session?.token ?? '')
    })

    return data
  } catch (error) {
    throw handleError(error);
  }
}


export type PermissionAction =
  | 'MANAGE_USERS'
  | 'MANAGE_ROLES'
  | 'ALL_PERMISSIONS'
  | 'MANAGE_HR';

export interface IPermission {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: PermissionAction[];
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPermissionRes {
  data: IPermission[];
  pagination: IPaginationMeta;
}