import { getSuperAdminDashboard } from "@/app/_core/actions/super-admin/dashboard"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useSuperAdminDashboard = () => {
  return useQuery({
    queryKey: [queryKeys.SUPER_ADMIN_DASHBOARD],
    queryFn: () => getSuperAdminDashboard(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}