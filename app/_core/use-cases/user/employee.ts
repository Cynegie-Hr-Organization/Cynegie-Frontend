import { getAllEmployees } from "@/app/_core/actions/user/employee"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useEmployees = () => {
  return useQuery({
    queryKey: [queryKeys.EMPLOYEES],
    queryFn: () => getAllEmployees(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}