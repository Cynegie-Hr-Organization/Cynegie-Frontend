import { headers } from "@/app/_core/actions/session";
import { handleError, Http } from "@/app/_core/axios";
import { getSession } from "next-auth/react";

export const getMyBeneficiaries = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IPaginatedBeneficiaries>('bank/my-beneficiary', {
      headers: await headers(session?.token ?? ''),
    });

    console.log(data)

    return data

  } catch (error) {
    throw handleError(error)
  }
}


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
