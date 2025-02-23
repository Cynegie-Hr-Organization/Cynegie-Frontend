import {
  getAllUsers,
  getUser,
  getUserStatistics,
} from "@/app/_core/actions/super-admin/users";
import { queryKeys } from "@/app/_core/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export const useAllUsers = ({
  queryKey = [queryKeys.EMPLOYEES],
  searchQuery,
  // overrideStatus,
  overridePagination,
}: {
  queryKey?: string | string[];
  searchQuery?: string;
  // overrideStatus?: IVendorStatus,
  overridePagination?: { page?: number; limit?: number };
}) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const filteredQueryKey = (key: string | string[]) =>
    Array.isArray(key) ? key : [key];

  const userId = params.id as string | undefined;
  const sortOrder = searchParams.get("sortOrder") ?? "desc";
  const page = overridePagination?.page ?? searchParams.get("page") ?? "1";
  const limit = overridePagination?.limit ?? searchParams.get("limit") ?? "5";
  const search = searchQuery ?? searchParams.get("search") ?? undefined;
  // const status = (overrideStatus ?? searchParams.get('status')) as IVendorStatus;

  return useQuery({
    queryKey: userId
      ? [...filteredQueryKey(queryKey), userId, search, sortOrder, page, limit]
      : [...filteredQueryKey(queryKey), search, sortOrder, page, limit],
    queryFn: () => getAllUsers(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};

export const useUser = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [queryKeys.USER],
    queryFn: () => getUser(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};

export const useUserStatistics = () => {
  return useQuery({
    queryKey: [queryKeys.USER_STATISTICS],
    queryFn: () => getUserStatistics(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};
