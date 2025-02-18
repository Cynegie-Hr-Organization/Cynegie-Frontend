import { getHRAdminOverviewCardData } from "@/app/_core/actions/hr-admin/dashboard"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useDashboardOverviewData = () => {
  return useQuery({
    queryKey: [queryKeys.HR_DASHBOARD_CARD_DATA],
    queryFn: () => getHRAdminOverviewCardData(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}