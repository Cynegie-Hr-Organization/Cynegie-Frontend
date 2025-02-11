import { ISuperAdminSettings } from "@/app/_core/interfaces/super-admin";
import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";


export const getSuperAdminSettings = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<ISuperAdminSettings>('company', {
      headers: await headers(session?.token ?? '')
    })

    return data;

  } catch (error) {
    throw handleError(error)
  }
}