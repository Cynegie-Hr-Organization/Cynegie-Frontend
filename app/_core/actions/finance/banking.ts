import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getMyBeneficiaries = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IPaginatedBeneficiaries>(
      "bank/my-beneficiary",
      {
        headers: await headers(session?.token ?? ""),
      },
    );

    return data;
  } catch (error) {
    console.log(error);
    throw handleError(error);
  }
};

export const getMyTransfers = async (
  querykey: {
    search?: string;
    page?: number;
    limit?: number;
    sortOrder?: string;
    status?: string;
  },
  { endpoint = "bank/my-transfers" }: { endpoint?: string },
) => {
  let queryKey = "?";

  if (querykey.sortOrder) queryKey += `sortOrder=${querykey.sortOrder}`;
  if (querykey.page) queryKey += `&page=${querykey.page}`;
  if (querykey.limit) queryKey += `&limit=${querykey.limit}`;
  if (querykey.status) queryKey += `&status=${querykey.status}`;
  if (querykey.search) queryKey += `&search=${querykey.search}`;

  try {
    const session = await getSession();

    const { data } = await Http.get<IPaginatedTransfers>(endpoint + queryKey, {
      headers: await headers(session?.token ?? ''),
    });

    console.log("wierd-data", data);

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export interface IBeneficiary {
  accountName: string;
  accountNumber: string;
  ownedBy: string;
  deletedAt: string | null;
  dateAdded: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IPaginatedBeneficiaries {
  totalBeneficiaries: number;
  totalPages: number;
  currentPage: number;
  beneficiaries: IBeneficiary[];
}

export interface ITransfer {
  id: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "FAILED";
  beneficiary: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatedTransfers {
  totalBeneficiaries: number;
  totalPages: number;
  currentPage: number;
  transfers: ITransfer[];
}




export interface IBankAccount {
  accountName: string;
  businessType: string;
  currency: string;
  companyEmail: string;
  companyRegistrationNumber: string;
  companyAddress: string;
  secondaryContact: string;
  transactionPin: string;
}


export interface IBankTransfer {
  beneficiary: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  sourceBank: string;
  amount: number;
}

export interface IAddBeneficiary {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export interface TransfersByHour {
  startDate: string;
  totalAmount: number;
  totalTransfers: number;
}

export interface TransferSummary {
  duration: string;
  startDate: string;
  transfersByHour: TransfersByHour[];
}