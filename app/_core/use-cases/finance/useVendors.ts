import { getVendor, getVendors, IVendor } from "@/app/_core/actions/finance/vendor"
import { handleError, Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSession } from "next-auth/react"
import { toast } from "react-toastify"

export const useVendors = () => {
  return useQuery({
    queryKey: [queryKeys.VENDORS],
    queryFn: () => getVendors(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}




export const useGetVendor = ({ id, key }: { id?: string, key?: string }) => {
  return useQuery({
    queryKey: [(key ?? queryKeys.VENDOR), id],
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


export const useVendorMutations = ({ id }: { id?: string }) => {

  const queryClient = useQueryClient();

  const addVendor = useMutation({
    mutationKey: ['add-vendor'],
    mutationFn: async (vendor: Partial<IVendor>) => {
      const session = await getSession();
      return Http.post<IVendor>('vendors/add-vendor', vendor, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async (data) => {
      toast.success('Vendor created successfully', { className: 'bg-red-500' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.VENDORS] });
    },
    onError: (error) => handleError(error)
  })


  const updateVendor = useMutation({
    mutationKey: ['update-vendor'],
    mutationFn: async ({ id, body }: { id: string, body: Partial<IVendor> }) => {
      const session = await getSession();

      return Http.put<IVendor>(`vendors/${id}`, body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async (data) => {
      if (Object.prototype.hasOwnProperty.call(data, 'message')) {
        toast.success('successful' as string);
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.VENDORS] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.VENDOR, id] });
    },
    onError: (error) => handleError(error)
  })


  const activateVendor = useMutation({
    mutationKey: ['activate-vendor'],
    mutationFn: async ({ id }: { id: string }) => {
      const session = await getSession();


      return Http.patch<IVendor>(`vendors/${id}/activate`, {}, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Vendor activated successfully');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.VENDORS] });
    },
    onError: (error) => { throw handleError(error) }
  })

  const deactivateVendor = useMutation({
    mutationKey: ['deactivate-vendor'],
    mutationFn: async ({ id }: { id: string }) => {
      const session = await getSession();

      return Http.patch<IVendor>(`vendors/${id}/deactivate`, {}, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async (data) => {
      toast.success('Vendor deactivated successfully');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.VENDORS] });
    },
    onError: (error) => { throw handleError(error) }
  })


  return {
    addVendor,
    updateVendor,
    activateVendor,
    deactivateVendor,
  }
}