import { getPayroll, getPayrolls, getPayrollStatusCount, IPayroll } from "@/app/_core/actions/finance/payroll"
import { handleError, Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify"





export const usePayroll = ({ statusOverride, searchOverride }: { statusOverride?: string, searchOverride?: string }) => {
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get('sortOrder') ?? 'asc';
  const status = statusOverride ?? searchParams.get('status') ?? undefined;
  const search = searchOverride ?? searchParams.get('search') ?? undefined;
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '5';


  return useQuery({
    queryKey: [queryKeys.PAYROLLS],
    queryFn: () => getPayrolls({
      page: Number(page),
      limit: Number(limit),
      search,
      sortOrder,
      status,
    }, { endpoint: 'payroll' }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}


export const usePayrollCount = () => {
  return useQuery({
    queryKey: [queryKeys.PAYROLLS_COUNT],
    queryFn: () => getPayrollStatusCount(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}


export const useGetPayroll = ({ id, key }: { id?: string, key?: string }) => {
  return useQuery({
    queryKey: [(key ?? queryKeys.PAYROLL), id],
    queryFn: () => {
      if (!id) {
        throw new Error('Payroll ID is required');
      }
      return getPayroll({ id });
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
    mutationFn: async (body: Partial<IPayroll>) => {
      const session = await getSession();
      return Http.post<IPayroll>('/payroll', body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Payroll created successfully', { className: 'bg-red-500' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
    },
    onError: (error) => handleError(error)
  })


  const updatePayroll = useMutation({
    mutationKey: ['update-payroll'],
    mutationFn: async ({ id, body }: { id: string, body: Partial<IPayroll> }) => {
      const session = await getSession();

      return Http.put<IPayroll>(`payroll/${id}`, body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Payroll details updated successfully', { className: 'bg-red-500' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLL, id] });
    },
    onError: (error) => handleError(error)
  })


  const approvePayroll = useMutation({
    mutationKey: ['approve-payroll'],
    mutationFn: async ({ id }: { id: string }) => {
      if (!id) throw new Error('id is required');

      const session = await getSession();
      return Http.patch<IPayroll>(`payroll/${id}/approve`, {}, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Payroll approved successfully');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
    },
    onError: (error) => handleError(error)
  })


  const rejectPayroll = useMutation({
    mutationKey: ['reject-payroll'],
    mutationFn: async ({ id, rejectionReason }: { id: string, rejectionReason: string }) => {
      if (!id || !rejectionReason) throw new Error('id and rejection reason is required');

      const session = await getSession();
      return Http.patch<IPayroll>(`payroll/${id}/reject`, { rejectionReason }, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Payroll rejected successfully');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
    },
    onError: (error) => handleError(error)
  })


  const deletePayroll = useMutation({
    mutationKey: ['delete-payroll'],
    mutationFn: async ({ id }: { id: string }) => {
      const session = await getSession();

      return Http.delete<IPayroll>(`payroll/${id}`, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Payroll deleted successfully');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PAYROLLS] });
    },
    onError: (error) => handleError(error)
  })


  return {
    addPayroll,
    updatePayroll,
    approvePayroll,
    rejectPayroll,
    deletePayroll
  }
}