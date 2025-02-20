import { getEmployeeStatus, getHRAdminChartData, getHRAdminOverviewCardData, getPriorityData } from "@/app/_core/actions/hr-admin/dashboard"
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

export const useDashboardChartData = () => {
  return useQuery({
    queryKey: [queryKeys.HR_DASHBOARD_CHART_DATA],
    queryFn: () => getHRAdminChartData(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}

export const useEmployeeStatus = () => {
  return useQuery({
    queryKey: [queryKeys.EMPLOYEE_STATUS],
    queryFn: () => getEmployeeStatus(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}

export const usePriorityCards = () => {
  return useQuery({
    queryKey: [queryKeys.PRIORITY_TASKS],
    queryFn: () => getPriorityData(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}