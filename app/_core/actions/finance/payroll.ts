import { IRes } from "@/app/_core/interfaces/res";
import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getPayrolls = async (querykey: {
  search?: string,
  page?: number,
  limit?: number,
  sortOrder?: string,
  status?: string
}, { endpoint = 'payroll' }: { endpoint?: string }) => {

  let queryKey = '?';

  if (querykey.sortOrder) queryKey += `sortOrder=${querykey.sortOrder}`;
  if (querykey.page) queryKey += `&page=${querykey.page}`;
  if (querykey.limit) queryKey += `&limit=${querykey.limit}`;
  if (querykey.status) queryKey += `&status=${querykey.status}`;
  if (querykey.search) queryKey += `&search=${querykey.search}`;

  try {
    const session = await getSession();

    const { data } = await Http.get<IRes<IPayroll[]>>(endpoint + queryKey, {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw handleError(error)
  }
}


export const getPayrollStatusCount = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<PayrollStatusCounts>(`payroll/status-count`, {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw error;
  }
}


export const getPayroll = async ({ id }: { id: string }) => {
  if (!id) throw new Error('id is required');


  try {
    const session = await getSession();

    const { data } = await Http.get<IRes<IPayroll>>(`payroll/${id}`, {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw error;
  }
}



export type PayrollStatus = 'pending' | 'rejected' | 'approved' | 'draft' | 'processed';

export interface IPayroll {
  payrollName: string;
  startDate: string;
  endDate: string;
  status: PayrollStatus;
  paymentDate: string;
  employees: string[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  totalGrossPay: number;
  totalNetPay: number;
  totalDeductions: number;
}

export interface PayrollStatusCounts {
  pending: number;
  rejected: number;
  approved: number;
  draft: number;
  processed: number;
  totalPayroll: number;
  totalCostByStatus: {
    pending: number;
    rejected: number;
    approved: number;
    draft: number;
    processed: number;
  };
}





