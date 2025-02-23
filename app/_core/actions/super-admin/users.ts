import { IRes } from "@/app/_core/interfaces/res";
import { ICompanyUser, IUserStatistics } from "@/app/_core/interfaces/user";
import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getAllUsers = async (
  query?: {
    page: number;
    limit: number;
    search: string | undefined;
    sortOrder: string;
    // status: IVendorStatus;
  },
  endpoint: string = "user/all-users",
) => {
  const sortOrder = query?.sortOrder ?? "desc";
  const page = query?.page ?? "1";
  const limit = query?.limit ?? "5";
  const search = query?.search;
  // const status = query?.status;

  let queryStr = `?`;

  if (sortOrder) queryStr += `sortOrder=${sortOrder}`;
  if (page) queryStr += `&page=${page}`;
  if (limit) queryStr += `&limit=${limit}`;
  // if (status) queryStr += `&status=${status}`;
  if (search) queryStr += `&search=${search}`;

  // console.log(endpoint + queryStr)
  try {
    const session = await getSession();
    const { data } = await Http.get<IRes<ICompanyUser[]>>(endpoint + queryStr, {
      headers: await headers(session?.token ?? ""),
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUser = async (id: string) => {
  if (!id) throw new Error("id is required");

  try {
    const session = await getSession();
    const { data } = await Http.get<IRes<ICompanyUser>>(`user/${id}`, {
      headers: await headers(session?.token ?? ""),
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUserStatistics = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IUserStatistics>("user/statistics", {
      headers: await headers(session?.token ?? ""),
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
};
