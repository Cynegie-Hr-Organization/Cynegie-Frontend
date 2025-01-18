import { getMyBeneficiaries, getMyTransfers } from "@/app/_core/actions/finance/banking"
import { headers } from "@/app/_core/actions/session"
import { handleError, Http } from "@/app/_core/axios"
import { IRes } from "@/app/_core/interfaces/res"
import { queryKeys } from "@/app/_core/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
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
      toast.success('created successfully');

      if (!data?.status) throw new Error(data.data.message ?? `Unable to create this account, please try again`);

      await queryClient.invalidateQueries({ queryKey: [queryKeys.BANKING] });
    },
    onError: (error) => handleError(error)
  })



  const initiateTransfer = useMutation({
    mutationKey: ['initiate-transfer'],
    mutationFn: async (body: Partial<IBankTransfer>) => {
      const session = await getSession();

      return await Http.post<IRes<IBankTransfer>>('bank/initiate-transfer', body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async (data) => {
      toast.success(data.data.message);
      toast.success('funds sent successfully');

      if (!data?.status) throw new Error(data.data.message ?? `Unable to create this account, please try again`);

      await queryClient.invalidateQueries({ queryKey: [queryKeys.BANKING] });
    },
    onError: (error) => handleError(error)
  })




  const addBeneficiary = useMutation({
    mutationKey: ['add-beneficiary'],
    mutationFn: async (body: Partial<IAddBeneficiary>) => {
      const session = await getSession();

      return await Http.post<IRes<IAddBeneficiary>>('bank/add-beneficiary', body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async (data) => {
      toast.success(data.data.message);
      toast.success('beneficiary added successfully');

      if (!data?.status) throw new Error(data.data.message ?? `Unable to add beneficiary, please try again`);

      await queryClient.invalidateQueries({ queryKey: [queryKeys.BANKING] });
    },
    onError: (error) => handleError(error)
  })


  return {
    createBankAccount,
    addBeneficiary,
    initiateTransfer
  }
}



export const useBeneficiaries = () => {
  return useQuery({
    queryKey: [queryKeys.BENEFICIARIES],
    queryFn: getMyBeneficiaries,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}


export const useMyTransfers = ({
  queryKey = queryKeys.MY_TRANSFERS as string | string[],
  endpoint = 'bank/my-transfers',
  search
}: {
  queryKey?: string | string[]
  endpoint?: string
  search?: string
}) => {
  const searchParams = useSearchParams();

  const sortOrder = searchParams.get('sortOrder') ?? 'asc';
  const status = searchParams.get('status')?? 'PENDING';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';

  const processedQuery = (key: string | string[]) => Array.isArray(key) ? key : [key]



  return useQuery({
    queryKey: [...processedQuery(queryKey), sortOrder, status, page, limit, search],
    queryFn: () => getMyTransfers({
      sortOrder: sortOrder,
      status: status ?? 'Pending',
      page: Number(page),
      limit: Number(limit),
      search: search,
    }, { endpoint }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
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


export interface IBankTransfer {
  beneficiary: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  sourceBank: string;
  amount: number;
}

export interface IAddBeneficiary {
  accountName: string,
  accountNumber: string,
  bankName: string
}