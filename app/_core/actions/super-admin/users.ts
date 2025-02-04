import { IRes } from "@/app/_core/interfaces/res";
import { ICompanyUser } from "@/app/_core/interfaces/user";
import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";





export const getAllUsers = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IRes<ICompanyUser[]>>('user/company-employees', {
      headers: await headers(session?.token ?? '')
    });

    return data;

  } catch (error) {
    throw handleError(error)
  }
}


export const getUser = async (id: string) => {
  if (!id) throw new Error('id is required');

  try {
    const session = await getSession();
    const { data } = await Http.get<IRes<ICompanyUser>>(`user/${id}`, {
      headers: await headers(session?.token ?? '')
    });

    return data;

  } catch (error) {
    throw handleError(error)
  }
}
