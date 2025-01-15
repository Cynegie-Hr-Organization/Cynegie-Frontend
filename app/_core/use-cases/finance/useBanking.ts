import { headers } from "@/app/_core/actions/session"
import { handleError, Http } from "@/app/_core/axios"
import { IRes } from "@/app/_core/interfaces/res"
import { queryKeys } from "@/app/_core/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getSession } from "next-auth/react"
import { toast } from "react-toastify"




export const useBankingMutations = () => {
  const queryClient = useQueryClient();

  const createBankAccount = useMutation({
    mutationKey: ['create-account'],
    mutationFn: async (body: Partial<IBankAccount>) => {
      const session = await getSession();

      return await Http.post<IRes<IBankAccount>>('bank/create-account', body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async (data) => {
      toast.success(data.data.message);
      if (!data?.status) throw new Error(data.data.message ?? `Unable to create this account, please try again`);

      await queryClient.invalidateQueries({ queryKey: [queryKeys.BANKING] });
    },
    onError: (error) => handleError(error)
  })



  return {
    createBankAccount
  }
}






interface IBankAccount {
  accountName: string,
  businessType: string,
  currency: string,
  companyEmail: string,
  companyRegistrationNumber: string,
  companyAddress: string,
  secondaryContact: string,
  transactionPin: string
}