
import { IBudget } from "@/app/_core/interfaces/budget";
import { IPaginatedRes } from "@/app/_core/interfaces/res";
import { Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";

export const getAllBudget = async (querykey?: {
  sortOrder?: string
  page?: number,
  limit?: number,
  status?: string,
  search?: string,
}, endpoint = 'budgets' as string
) => {



  let queryParams = '?'

  if (querykey?.sortOrder) queryParams += `sortOrder=${querykey.sortOrder}`;
  if (querykey?.page) queryParams += `&page=${querykey.page}`;
  if (querykey?.limit) queryParams += `&limit=${querykey.limit}`;
  if (querykey?.status) queryParams += `&status=${querykey.status}`;
  if (querykey?.search) queryParams += `&search=${querykey.search}`;

  try {
    const session = await getSession();
    const { data } = await Http.get<IPaginatedRes<IBudget>>(endpoint + queryParams, {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw error;
  }
}



