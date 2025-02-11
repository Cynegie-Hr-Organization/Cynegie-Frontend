import { queryKeys } from "@/app/_core/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getCashflowTrends } from "../actions/super-admin/superAdmin";

export const useCashflowTrends = () => {
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
