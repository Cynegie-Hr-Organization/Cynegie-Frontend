import { getAllPermissions } from "@/app/_core/actions/super-admin/permissions"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getCashflowTrends } from "../../actions/super-admin/charts-and-cards"

export const useCashflowTrends = () => {
  return useQuery({
    queryKey: [queryKeys.SUPER_ADMIN],
    queryFn: () => getCashflowTrends(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}

export const usePermissionMutations = () => {
  return useMutation({

  })
}

export const useAllPermissions = () => {
  return useQuery({
    queryKey: [queryKeys.ALL_PERMISSIONS],
    queryFn: () => getAllPermissions(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}
