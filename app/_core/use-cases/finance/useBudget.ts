import { getAllBudget, getBudgetSummary } from "@/app/_core/actions/finance/budget";
import { IBudget, IBudgetCreate } from "@/app/_core/interfaces/budget";
import { IRes } from "@/app/_core/interfaces/res";
import { handleError, Http } from "@/app/_core/utils/axios";
import { queryKeys } from "@/app/_core/utils/queryKeys";
import { headers } from "@/app/_core/utils/session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";




export const useAllBudget = ({ }) => {

  const searchParams = useSearchParams();
  const sortOrder = searchParams.get('sortOrder') ?? 'desc';
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const status = searchParams.get('status');
  const search = searchParams.get('search') ?? undefined;

  return useQuery({
    queryKey: [queryKeys.BUDGETS],
    queryFn: () => getAllBudget({
      sortOrder,
      page: Number(page ?? 1),
      limit: Number(limit ?? 5),
      search: search ?? undefined,
      status: status ?? undefined,
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};

export const useBudgetMutations = () => {
  const queryClient = useQueryClient();
  const { BUDGETS } = queryKeys;

  const createBudget = useMutation({
    mutationKey: ["create-budget"],
    mutationFn: async (body: IBudgetCreate) => {
      const session = await getSession();

      return await Http.post<IRes<IBudget>>("budgets", body, {
        headers: await headers(session?.token ?? ""),
      });
    },
    onSuccess: async (data) => {
      console.log(data);
      toast.success(data.data.message);
      if (!data.data.data?.status)
        throw new Error(
          data.data.message ?? `Unable to Create this budget, please try again`,
        );

      await queryClient.invalidateQueries({ queryKey: [BUDGETS] });
    },
    onError: (error) => handleError(error),
  });

  const updateBudget = useMutation({
    mutationKey: ["update-budget"],
    mutationFn: ({ id, body }: { id: string; body: Partial<IBudget> }) =>
      Http.put<IRes<IBudget>>(`budgets/id/${id}`, body),
    onSuccess: async (data) => {
      if (!data.data.data?.status)
        throw new Error(
          data.data.message ?? `Unable to Update this budget, please try again`,
        );

      await queryClient.invalidateQueries({ queryKey: [BUDGETS] });
    },
    onError: (error) => handleError(error),
  });

  const deleteBudget = useMutation({
    mutationKey: ["delete-budget"],
    mutationFn: ({ id }: { id: string }) =>
      Http.delete<IRes<IBudget>>(`budgets/${id}`),
    onSuccess: async (data) => {
      if (!data.data?.status)
        throw new Error(
          data.data.message ?? `Unable to delete this budget, please try again`,
        );

      await queryClient.invalidateQueries({ queryKey: [BUDGETS] });
    },
    onError: (error) => handleError(error),
  });
  return {
    createBudget,
    updateBudget,
    deleteBudget,
  };
};

export const useBudgetSummary = () => {
  return useQuery({
    queryKey: ["budget-summary"],
    queryFn: () => getBudgetSummary(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};
