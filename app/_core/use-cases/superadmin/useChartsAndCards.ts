import { getCashflowTrends } from "@/app/_core/actions/super-admin/charts-and-cards";
import { queryKeys } from "@/app/_core/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useCashFlowTrends = () => {
  return useQuery({
    queryKey: [queryKeys.SUPER_ADMIN],
    queryFn: () => getCashflowTrends(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};
