import {
  IPermissionRes,
  IPermissionStatus,
} from "@/app/_core/interfaces/super-admin";
import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getAllPermissions = async (
  query?: {
    page: number;
    limit: number;
    search: string | undefined;
    sortOrder: string;
    status: IPermissionStatus;
  },
  endpoint: string = "user/all-users",
) => {
  const sortOrder = query?.sortOrder ?? "desc";
  const page = query?.page ?? "1";
  const limit = query?.limit ?? "5";
  const search = query?.search;
  const status = query?.status;

  let queryStr = `?`;

  if (sortOrder) queryStr += `sortOrder=${sortOrder}`;
  if (page) queryStr += `&page=${page}`;
  if (limit) queryStr += `&limit=${limit}`;
  if (status) queryStr += `&status=${status}`;
  if (search) queryStr += `&search=${search}`;

  try {
    const session = await getSession();
    const { data } = await Http.get<IPermissionRes>(endpoint + queryStr, {
      headers: await headers(session?.token ?? ""),
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
};
