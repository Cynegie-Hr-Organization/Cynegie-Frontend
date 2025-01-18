
import { headers } from "@/app/_core/actions/session";
import { Http } from "@/app/_core/axios";
import { IBudget } from "@/app/_core/interfaces/budget";
import { IPaginatedRes } from "@/app/_core/interfaces/res";
import { getSession } from "next-auth/react";

export const getAllBudget = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IPaginatedRes<IBudget>>('/budgets', {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw error;
  }
}



