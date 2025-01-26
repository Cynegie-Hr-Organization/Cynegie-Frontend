import { IRes } from "@/app/_core/interfaces/res";
import { Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getPayrolls = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IRes<IPayroll[]>>('payroll', {
      headers: await headers(session?.token ?? ''),
    });

    return data;
  } catch (error) {
    throw error;
  }
}


export type PayrollStatus = "pending" | "pending" | "rejected" | "approved" | "draft" | "processed"

export interface IPayroll {
  payrollName: string,
  startDate: string,
  endDate: string,
  status: PayrollStatus,
  paymentDate: string,
  employees: string[],
  deletedAt: string | null,
  company: string,
  createdAt: string,
  updatedAt: string,
  id: string,
  totalGrossPay: number,
  totalNetPay: number,
  totalDeductions: number
}