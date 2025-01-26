import { getPayrolls, IPayroll } from "@/app/_core/actions/finance/payroll"
import { getVendor, IVendor } from "@/app/_core/actions/finance/vendor"
import { handleError, Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSession } from "next-auth/react"
import { toast } from "react-toastify"

export const usePayroll = () => {
  return useQuery({
    queryKey: [queryKeys.PAYROLLS],
    queryFn: () => getPayrolls(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}




export const useGetPayroll = ({ id, key }: { id?: string, key?: string }) => {
  return useQuery({
    queryKey: [(key ?? queryKeys.PAYROLLS), id],
    queryFn: () => {
      if (!id) {
        throw new Error('Vendor ID is required');
      }
      return getVendor({ id });
    },
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: 1,
  })
}


export const usePayrollMutations = ({ id }: { id?: string }) => {

  const queryClient = useQueryClient();

  const addPayroll = useMutation({
    mutationKey: ['add-payroll'],
    mutationFn: async (vendor: Partial<IPayroll>) => {
      const session = await getSession();
      return Http.post<IVendor>('payroll', vendor, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Vendor created successfully', { className: 'bg-red-500' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
    },
    onError: (error) => handleError(error)
  })


  const updatePayroll = useMutation({
    mutationKey: ['update-payroll'],
    mutationFn: async ({ id, body }: { id: string, body: Partial<IPayroll> }) => {
      const session = await getSession();

      return Http.put<IVendor>(`payroll/${id}`, body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Vendor details updated successfully', { className: 'bg-red-500' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLL, id] });
    },
    onError: (error) => handleError(error)
  })


  const deletePayroll = useMutation({
    mutationKey: ['delete-payroll'],
    mutationFn: async ({ id }: { id: string }) => {
      const session = await getSession();

      return Http.delete<IVendor>(`payroll/${id}`, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Vendor deleted successfully');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
    },
    onError: (error) => handleError(error)
  })


  return {
    addPayroll,
    updatePayroll,
    deletePayroll,
  }
}