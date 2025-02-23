import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getVendors = async (
  query?: {
    page: number;
    limit: number;
    search: string | undefined;
    sortOrder: string;
    status: IVendorStatus;
  },
  endpoint: string = "vendors/all-vendor",
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
    const { data } = await Http.get<IVendorRes>(endpoint + queryStr, {
      headers: await headers(session?.token ?? ""),
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getVendor = async ({ id }: { id: string }) => {
  if (!id) throw new Error("id is required");

  try {
    const session = await getSession();
    const { data } = await Http.get<IVendor>(`vendors/${id}`, {
      headers: await headers(session?.token ?? ""),
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export type IVendorStatus = "active" | "inactive" | "pending";

export interface IVendor {
  vendorName: string;
  phoneNumber: string;
  contactEmail: string;
  vendorAddress: string;
  status: IVendorStatus;
  paymentTerms: string;
  contactPerson: string;
  deletedAt: null | string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IVendorRes {
  vendors: IVendor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
