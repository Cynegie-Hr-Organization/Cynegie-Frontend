import { getApprovals } from "@/app/_core/actions/super-admin/approvals"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useApprovals = () => {
  return useQuery({
    queryKey: [queryKeys.APPROVALS],
    queryFn: () => getApprovals(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}