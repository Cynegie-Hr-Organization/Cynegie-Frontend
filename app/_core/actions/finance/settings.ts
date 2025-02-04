import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";


export const getFinanceSettings = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<IFinanceSettings>('finance-admin/settings', {
      headers: await headers(session?.token ?? ''),
    });

    return data
  } catch (error) {
    throw handleError(error);
  }
}


export const useFinanceSettingsMutations = () => {
  const updateSettings = useMutation({
    mutationKey: ['update-settings'],
    mutationFn: async (body: Partial<IFinanceSettings>) => {
      const session = await getSession();
      return Http.post<IFinanceSettings>('finance-admin/settings', body, {
        headers: await headers(session?.token ?? '')
      })
    },
    onSuccess: async () => {
      toast.success('Settings updated successfully', { className: 'bg-red-500' });
    },
    onError: (error) => handleError(error)
  })


  return {
    updateSettings
  }
}











export interface IFinanceSettings {
  company: string;
  bankAccountNumber: string;
  defaultCurrency: string;
  taxSettings: string;
  expenseCategories: string;
  fiscalYearStart: string;
  notificationSettings: string[];
  budgetAlerts: string[];
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
  id: string;
}