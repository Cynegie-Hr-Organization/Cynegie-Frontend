import { getAllEmployees, getEmployee, IEmployeeStatus } from "@/app/_core/actions/user/employee"
import { Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getSession } from "next-auth/react"
import { useParams, useSearchParams } from "next/navigation"




export const useEmployees = ({
  queryKey = [queryKeys.EMPLOYEES],
  searchQuery,
  overrideStatus,
  overridePagination
}: {
  queryKey?: string | string[]
  searchQuery?: string
  overrideStatus?: IEmployeeStatus,
  overridePagination?: { page?: number, limit?: number }
}) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const filteredQueryKey = (key: string | string[]) => Array.isArray(key) ? key : [key]

  const employeeId = params.id as string | undefined;
  const sortOrder = searchParams.get('sortOrder') ?? 'desc';
  const page = overridePagination?.page ?? searchParams.get('page') ?? '1';
  const limit = overridePagination?.limit ?? searchParams.get('limit') ?? '5';
  const search = searchQuery ?? searchParams.get('search') ?? undefined;
  const status = (overrideStatus ?? searchParams.get('status')) as IEmployeeStatus;


  return useQuery({
    queryKey: employeeId ? [...filteredQueryKey(queryKey), employeeId, status, search, sortOrder, page, limit]
      : [...filteredQueryKey(queryKey), status, search, sortOrder, page, limit],
    queryFn: () => getAllEmployees({
      page: Number(page),
      limit: Number(limit),
      search,
      sortOrder,
      status,
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}



export const useGetEmployee = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [queryKeys.EMPLOYEE, id],
    queryFn: () => getEmployee(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}


export const useEmployeeMutations = () => {
  const queryClient = new QueryClient();

  const deleteUser = useMutation({
    mutationKey: ['delete-employee'],
    mutationFn: async ({ id, deletionReason }: { id: string, deletionReason: string }) => {
      const session = await getSession();
      console.log(deletionReason)

      const { data } = await Http.delete(`employees/${id}`, {
        headers: await headers(session?.token ?? ''),
      })

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.EMPLOYEES] })
    }
  })


  return {
    deleteUser
  }
}
