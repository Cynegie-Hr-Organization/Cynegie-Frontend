import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";




export const getVendors = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IVendor[]>('vendors/all-vendor', {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw handleError(error);
  }
}


export const getVendor = async ({ id }: { id: string }) => {
  if (!id) throw new Error('id is required');

  try {
    const session = await getSession();
    const { data } = await Http.get<IVendor>(`vendors/${id}`, {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw handleError(error);
  }
}


export interface IVendor {
  id: string;
  vendorName: string;
  phoneNumber: string;
  contactEmail: string;
  vendorAddress: string;
  status: 'active' | 'inactive' | 'pending';
  paymentTerms: string;
  contactPerson: string;
  deletedAt: null | string;
  company: string;
  createdAt: string;
  updatedAt: string;
}