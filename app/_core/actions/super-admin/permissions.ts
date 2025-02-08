import { handleError, Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getSession } from "next-auth/react"

export const usePermissionMutations = () => {
  return useMutation({

  })
}

export const useAllPermissions = () => {
  return useQuery({
    queryKey: [queryKeys.ALL_PERMISSIONS],
    queryFn: () => getAllPermissions(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}


const getAllPermissions = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IPermissionRes>(`permissions`, {
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