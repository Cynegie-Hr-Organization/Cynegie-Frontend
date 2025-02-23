import { getSuperAdminSettings } from "@/app/_core/actions/super-admin/super-admin-settings";
import { ISuperAdminSettings } from "@/app/_core/interfaces/super-admin";
import { handleError, Http } from "@/app/_core/utils/axios";
import { queryKeys } from "@/app/_core/utils/queryKeys";
import { headers } from "@/app/_core/utils/session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export const useSuperAdminSettings = () => {
  return useQuery({
    queryKey: [queryKeys.SUPER_ADMIN_SETTINGS],
    queryFn: () => getSuperAdminSettings(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};

export const useSuperAdminSettingsMutations = () => {
  const queryClient = useQueryClient();

  const updateSettings = useMutation({
    mutationKey: ["update-super-admin-settings"],
    mutationFn: async (body: Partial<ISuperAdminSettings | undefined>) => {
      const session = await getSession();
      const cancelToken = Http.createCancelToken();

      try {
        const { data } = await Http.put<Partial<ISuperAdminSettings>>(
          "company",
          body,
          {
            headers: await headers(session?.token ?? ""),
            signal: cancelToken.signal,
          },
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SUPER_ADMIN_SETTINGS],
      });
    },
    // onError: (error) => handleError(error)
  });

  return {
    updateSettings: {
      ...updateSettings,
      cancel: () => {
        updateSettings.reset();
      },
    },
  };
};
