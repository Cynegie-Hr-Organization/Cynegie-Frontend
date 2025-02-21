import { getNewHireList, getOnboadingOverviewData } from "@/app/_core/actions/hr-admin/onboarding"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useOnboardingData = () => {
  return useQuery({
    queryKey: [queryKeys.HR_DASHBOARD_CARD_DATA],
    queryFn: () => getOnboadingOverviewData(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}

export const useNewHireList = () => {
  return useQuery({
    queryKey: [queryKeys.NEW_HIRE_LIST],
    queryFn: () => getNewHireList(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}