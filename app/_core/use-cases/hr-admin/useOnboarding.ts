import { getAllTemplates, getNewHireList, getOnboadingOverviewData, getTemplate, ITemplate, ITemplatesRes } from "@/app/_core/actions/hr-admin/onboarding"
import { handleError, Http } from "@/app/_core/utils/axios"
import { queryKeys } from "@/app/_core/utils/queryKeys"
import { headers } from "@/app/_core/utils/session"
import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSession } from "next-auth/react"

export const useOnboardingData = () => {
  return useQuery({
    queryKey: [queryKeys.HR_DASHBOARD_CARD_DATA],
    queryFn: () => getOnboadingOverviewData(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}

export const useNewHireList = () => {
  return useQuery({
    queryKey: [queryKeys.NEW_HIRE_LIST],
    queryFn: () => getNewHireList(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}

export const useTemplates = () => {
  return useQuery({
    queryKey: [queryKeys.TEMPLATES],
    queryFn: () => getAllTemplates(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}

export const useGetTemplate = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.TEMPLATES],
    queryFn: () => getTemplate(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  })
}


export const useTemplateMutations = () => {
  const queryClient = useQueryClient();
  const isLoading = useIsMutating() > 0;

  const createTemplate = useMutation({
    mutationKey: ['create-template'],
    mutationFn: async (body: Partial<ITemplate>) => {
      const session = await getSession();

      const { data } = await Http.post<ITemplate>('templates', body, {
        headers: await headers(session?.token ?? '')
      })

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TEMPLATES] })
    }
  })

  const updateTemplate = useMutation({
    mutationKey: ['update-template'],
    mutationFn: async ({ id, body }: { id: string, body: Partial<ITemplate> }) => {
      const session = await getSession();

      const { data } = await Http.put<ITemplatesRes>(`templates/${id}`, body, {
        headers: await headers(session?.token ?? '')
      })

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TEMPLATE] })
      queryClient.invalidateQueries({ queryKey: [queryKeys.TEMPLATES] })
    },
    onError: (error) => handleError(error),
  })

  const deleteTemplate = useMutation({
    mutationKey: ['delete-template'],
    mutationFn: async ({ id }: { id: string }) => {
      const session = await getSession();

      const { data } = await Http.delete<ITemplate>(`templates/${id}`, {
        headers: await headers(session?.token ?? '')
      })

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TEMPLATES] })
    }
  })



  return {
    createTemplate,
    updateTemplate,
    deleteTemplate,
    isLoading
  }
}