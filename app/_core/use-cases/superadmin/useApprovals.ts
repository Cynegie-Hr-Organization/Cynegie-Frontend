import { getProfileUpdateApprovals, IRequestStatus, IUpdateRequestType } from "@/app/_core/actions/super-admin/approvals"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "next/navigation"





export const useProfileUpdateApprovals = ({
  querykey = [queryKeys.PROFILE_UPDATE_APPROVALS],
  endpoint = 'profile-updates/approval-request',
  filterParams
}: {
  querykey?: string | string[],
  endpoint?: string,
  filterParams?: {
    status?: string,
    sortOrder?: string,
    page?: number,
    limit?: number,
    isHrRequest?: boolean,
    isEmployeeRequest?: boolean,
    requestType?: IUpdateRequestType
  }
}) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const filteredQueryKey = (key: string | string[]) => Array.isArray(key) ? key : [key]
  const updateRequestId = params.id as string | undefined;
  const sortOrder = searchParams.get('sortOrder') ?? 'desc';
  const page = filterParams?.page ?? searchParams.get('page') ?? '1';
  const limit = filterParams?.limit ?? searchParams.get('limit') ?? '5';
  const status = (filterParams?.status ?? searchParams.get('status')) as IRequestStatus
  const isHrRequest = (filterParams?.isHrRequest ?? searchParams.get('isHrRequest')) as boolean
  const isEmployeeRequest = (filterParams?.isEmployeeRequest ?? searchParams.get('isEmployeeRequest')) as boolean
  const requestType = (filterParams?.requestType ?? searchParams.get('requestType')) as IUpdateRequestType

  return useQuery({
    queryKey: updateRequestId ? [...filteredQueryKey(querykey), updateRequestId, sortOrder, page, limit, status, isHrRequest, isEmployeeRequest, requestType]
      : [...filteredQueryKey(querykey), sortOrder, page, limit, status, isHrRequest, isEmployeeRequest, requestType],
    queryFn: () => getProfileUpdateApprovals({
      page: Number(page),
      limit: Number(limit),
      status: status as IRequestStatus,
      sortOrder,
      isHrRequest,
      isEmployeeRequest,
      requestType
    }, endpoint),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  })
}