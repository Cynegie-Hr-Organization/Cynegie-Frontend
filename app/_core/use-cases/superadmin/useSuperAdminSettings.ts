import { getSuperAdminSettings, ISuperAdminSettings } from "@/app/_core/actions/super-admin/super-admin-settings"
import { handleError, Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getSession } from "next-auth/react"

const queryClient = new QueryClient();

export const useSuperAdminSettings = () => {
  return useQuery({
    queryKey: [queryKeys.SUPER_ADMIN_SETTINGS],
    queryFn: () => getSuperAdminSettings(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}


export const useSuperAdminSettingsMutations = () => {
  const updateSettings = useMutation({
    mutationKey: ['update-super-admin-settings'],
    mutationFn: async (body: Partial<ISuperAdminSettings>) => {
      const session = await getSession();
      return Http.put<ISuperAdminSettings>('company', body, {
        headers: await headers(session?.token ?? ''),
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.SUPER_ADMIN_SETTINGS] });
    },
    onError: (error) => handleError(error)
  })
  return {
    updateSettings
  }
}