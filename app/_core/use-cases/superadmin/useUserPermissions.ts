import { getAllPermissions } from "@/app/_core/actions/super-admin/permissions"
import { IUserPermission } from "@/app/_core/interfaces/super-admin"
import { Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getSession } from "next-auth/react"
import { useParams, useSearchParams } from "next/navigation"
import { getCashflowTrends } from "../../actions/super-admin/charts-and-cards"

export const useCashflowTrends = () => {
  return useQuery({
    queryKey: [queryKeys.SUPER_ADMIN],
    queryFn: () => getCashflowTrends(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}



export const useAllPermissions = ({
  queryKey = [queryKeys.PERMISSIONS],
  searchQuery,
  overrideStatus,
  overridePagination
}: {
  queryKey?: string | string[]
  searchQuery?: string
  overrideStatus?: any,
  overridePagination?: { page?: number, limit?: number }
}) => {

  const searchParams = useSearchParams();
  const params = useParams();

  const filteredQueryKey = (key: string | string[]) => Array.isArray(key) ? key : [key]

  const userId = params.id as string | undefined;
  const sortOrder = searchParams.get('sortOrder') ?? 'desc';
  const page = overridePagination?.page ?? searchParams.get('page') ?? '1';
  const limit = overridePagination?.limit ?? searchParams.get('limit') ?? '5';
  const search = searchQuery ?? searchParams.get('search') ?? undefined;
  const status = (overrideStatus ?? searchParams.get('status')) as any;


  return useQuery({
    queryKey: userId ? [...filteredQueryKey(queryKey), userId, search, sortOrder, page, limit]
      : [...filteredQueryKey(queryKey), search, sortOrder, page, limit],
    queryFn: () => getAllPermissions({
      page: Number(page),
      limit: Number(limit),
      search,
      sortOrder,
      status
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}



export const usePermissionMutations = () => {

  const grantPermission = useMutation({
    mutationKey: ['grant-permission'],
    mutationFn: async ({ userId, body }: { userId: string, body: Partial<IUserPermission> }) => {
      const session = await getSession();

      return Http.post(`assign-permission/${userId}`, { body }, {
        headers: await headers(session?.token ?? '')
      })
    }
  })

  const adminStatusActions = useMutation({
    mutationKey: ['deactivate-admin'],
    mutationFn: async ({ userId, body }: { userId: string, body: Partial<AdminStatus> }) => {
      const session = await getSession();

      return Http.post(`user/${userId}status/`, { body }, {
        headers: await headers(session?.token ?? '')
      })
    }
  })

  return {
    grantPermission,
    adminStatusActions
  }
}

interface AdminStatus {
  status: "active"
}
