'use client'

import AppButton from "@/app/_components/shared/button";
import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import AppInputText from "@/app/_components/shared/input-text";

import { AppSelect } from "@/app/_components/shared/select";
import { IFinanceSettings, useFinanceSettingsMutations } from "@/app/_core/actions/finance/settings";
import { useFinanceSettings } from "@/app/_core/use-cases/finance/useSettings";
import { useIsMutating } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const FinanceAdminSettings = () => {
  const { data: financeSettings, isLoading: isLoadingCurrentSettings } = useFinanceSettings()
  const { updateSettings } = useFinanceSettingsMutations()
  const mutating = useIsMutating();
  const isUpdating = mutating > 0;


  const [formData, setFormData] = useState<Partial<IFinanceSettings>>({});

  useEffect(() => {
    if (financeSettings) {
      setFormData({
        bankAccountNumber: financeSettings.bankAccountNumber ?? '',
        defaultCurrency: financeSettings.defaultCurrency ?? '',
        taxSettings: financeSettings.taxSettings ?? '',
        expenseCategories: financeSettings.expenseCategories ?? '',
        paymentMethod: financeSettings.paymentMethod ?? '',
        fiscalYearStart: financeSettings.fiscalYearStart ?? '',
        notificationSettings: financeSettings.notificationSettings ?? [],
        budgetAlerts: financeSettings.budgetAlerts ?? ''
      });
    }
  }, [financeSettings]);


  const handleSave = () => {
    updateSettings.mutate(formData, {
      onSuccess: () => {

      }
    })
  }

  return (
    <div>
      <div className="space-y-8 py-6">
        <h3 className="text-2xl font-bold">General Settings</h3>

        <div className="common-card space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
            <AppInputText
              id={"company-account-details"}
              label="Company Bank Account Details"
              placeholder="Input company bank account number"
              isLoadingContent={isLoadingCurrentSettings}
              value={`${formData.bankAccountNumber}`}
              onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
            />

            <AppSelect
              value={formData.defaultCurrency}
              label="Default Currency"
              listItems={
                [
                  { label: 'NGN', value: 'NGN' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' },
                  { label: 'GBP', value: 'GBP' },
                ]
              }
              placeholder="Select default currency"
              onChange={(value) => setFormData({ ...formData, defaultCurrency: value })}
            />
            <AppDatePicker
              label="Fiscal Year Start"
              placeholder="Date"
              selectedDate={formData.fiscalYearStart ? new Date(formData.fiscalYearStart) : undefined}
              setSelectedDate={(value) => setFormData({ ...formData, fiscalYearStart: value?.toISOString() })}
            />

          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
            <AppInputText
              value={`${formData.taxSettings}`}
              id="tax-settings"
              label="Tax Settings"
              placeholder="Input details"
              isLoadingContent={isLoadingCurrentSettings}
              onChange={(e) => setFormData({ ...formData, taxSettings: e.target.value })}
            />
            <AppSelect
              label="Expense Categories"
              value={formData.expenseCategories}
              listItems={
                [
                  { label: 'Expense Category1', value: 'Expense Category1' },
                  { label: 'Expense Category2', value: 'Expense Category2' },
                  { label: 'Expense Category3', value: 'Expense Category3' },
                ]
              }
              placeholder="Input details"
              onChange={(value) => setFormData({ ...formData, expenseCategories: value })}
            />
            <AppSelect
              label="Payment Method"
              value={formData.paymentMethod}
              listItems={
                [
                  { label: 'Bank Transfer', value: 'bank-transfer' },
                  { label: 'card', value: 'card' }
                ]
              }
              placeholder="Select Payment Method"
              onChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Notification Settings</h3>
            <div className="space-y-4">
              <AppCheckbox
                label="Email"
                id="notification-email"
                checked={formData.notificationSettings?.includes('email') ?? false}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationSettings: e.target.checked
                    ? [...(formData.notificationSettings?.filter(setting => setting !== 'email') || []), 'email']
                    : formData.notificationSettings?.filter(setting => setting !== 'email') || []
                })}
              />
              <AppCheckbox
                label="SMS"
                id="notification-sms"
                checked={formData.notificationSettings?.includes('sms') ?? false}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationSettings: e.target.checked
                    ? [...(formData.notificationSettings?.filter(setting => setting !== 'sms') || []), 'sms']
                    : formData.notificationSettings?.filter(setting => setting !== 'sms') || []
                })}
              />
              <AppCheckbox
                label="In-App"
                id="notification-in-app"
                checked={formData.notificationSettings?.includes('in-app') ?? false}
                onChange={(e) => setFormData({
                  ...formData,
                  notificationSettings: e.target.checked
                    ? [...(formData.notificationSettings?.filter(setting => setting !== 'in-app') || []), 'in-app']
                    : formData.notificationSettings?.filter(setting => setting !== 'in-app') || []
                })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Payment Confirmation Notification</h3>
            <div className="space-y-4">
              <AppCheckbox
                label="Date picker"
                id="date-picker"
                checked={false}
                onChange={() => { }}
              />
              <AppCheckbox
                label="Time picker"
                id="time-picker"
                checked={false}
                onChange={() => { }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Budget Alerts</h3>
            <div className="space-y-4">
              <AppCheckbox
                label="Email"
                id="budget-email"
                checked={formData.budgetAlerts?.includes('email') ?? false}
                onChange={(e) => setFormData({
                  ...formData,
                  budgetAlerts: e.target.checked
                    ? [...(formData.budgetAlerts?.filter(setting => setting !== 'email') || []), 'email']
                    : formData.budgetAlerts?.filter(setting => setting !== 'email') || []
                })}
              />
              <AppCheckbox
                label="SMS"
                id="budget-sms"
                checked={formData.budgetAlerts?.includes('sms') ?? false}
                onChange={(e) => setFormData({
                  ...formData,
                  budgetAlerts: e.target.checked
                    ? [...(formData.budgetAlerts?.filter(setting => setting !== 'sms') || []), 'sms']
                    : formData.budgetAlerts?.filter(setting => setting !== 'sms') || []
                })}
              />
              <AppCheckbox
                label="In-App"
                id="budget-in-app"
                checked={formData.budgetAlerts?.includes('in-app') ?? false}
                onChange={(e) => setFormData({
                  ...formData,
                  budgetAlerts: e.target.checked
                    ? [...(formData.budgetAlerts?.filter(setting => setting !== 'in-app') || []), 'in-app']
                    : formData.budgetAlerts?.filter(setting => setting !== 'in-app') || []
                })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <AppButton
            label="Save"
            className="btn-primary"
            isLoading={isUpdating}
            disabled={isUpdating}
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  )
}

export default FinanceAdminSettings;