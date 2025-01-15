
import { headers } from "@/app/_core/actions/session";
import { Http } from "@/app/_core/axios";
import { IRes } from "@/app/_core/interfaces/res";
import { IUser } from "@/app/_core/interfaces/user";
import { getSession } from "next-auth/react";

export const getCashflowTrends = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IRes<IUser>>('overview/cash-flow-trends', {
      headers: await headers(session?.token ?? ''),
    });

    return data;

  } catch (error) {
    throw error;
  }
}