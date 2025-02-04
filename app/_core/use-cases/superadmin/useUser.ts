import { getAllUsers, getUser } from "@/app/_core/actions/super-admin/users"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useAllUsers = () => {
  return useQuery({
    queryKey: [queryKeys.USERS],
    queryFn: () => getAllUsers(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}


export const useUser = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [queryKeys.USER],
    queryFn: () => getUser(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}