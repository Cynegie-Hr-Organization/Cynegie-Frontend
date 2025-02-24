import { getFinanceSettings } from "@/app/_core/actions/finance/settings";
import { queryKeys } from "@/app/_core/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useFinanceSettings = () => {
  return useQuery({
    queryKey: [queryKeys.FINANCE_SETTINGS],
    queryFn: () => getFinanceSettings(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}