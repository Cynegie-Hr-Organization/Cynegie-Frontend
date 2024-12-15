'use client'

import AppButton from "@/app/_components/shared/button";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import InputText from "@/app/_components/shared/input-text";
import { AppCheckbox } from "@/app/_components/shared/radio";
import { AppSelect } from "@/app/_components/shared/select";

const FinanceAdminSettings = () => {
  return (
    <div>
      <div className="space-y-8 py-6">
        <h3 className="text-2xl font-bold">General Settings</h3>

        <div className="common-card space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
            <AppSelect
              label="Company Bank Account Details"
              listItems={
                [
                  { label: 'Bank Name', value: 'Bank Name' },
                  { label: 'Account Number', value: 'Account Number' },
                  { label: 'Account Name', value: 'Account Name' },
                ]
              }
              placeholder="Input details"
              onChange={() => { }}
            />
            <AppSelect
              label="Default Currency"
              listItems={
                [
                  { label: 'NGN', value: 'NGN' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' },
                  { label: 'GBP', value: 'GBP' },
                ]
              }
              placeholder="Input details"
              onChange={() => { }}
            />
            <AppDatePicker
              label="Fiscal Year Start"
              placeholder="Date"
              selectedDate={new Date()}
              setSelectedDate={() => { }}
            />

          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
            <InputText
              value=""
              id="tax-settings"
              label="Tax Settings"
              placeholder="Input details"
              onChange={() => { }}
            />
            <AppSelect
              label="Expense Categories"
              listItems={
                [
                  { label: 'Expense Category1', value: 'Expense Category1' },
                  { label: 'Expense Category2', value: 'Expense Category2' },
                  { label: 'Expense Category3', value: 'Expense Category3' },
                ]
              }
              placeholder="Input details"
              onChange={() => { }}
            />
            <AppDatePicker
              label="Fiscal Year Start"
              placeholder="Date"
              selectedDate={new Date()}
              setSelectedDate={() => { }}
            />

          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Notification Settings</h3>
            <div className="space-y-4">
              <AppCheckbox
                label="Email"
                id="notification-email"
                checked={false}
                onChange={() => { }}
              />
              <AppCheckbox
                label="SMS"
                id="notification-sms"
                checked={false}
                onChange={() => { }}
              />
              <AppCheckbox
                label="In-App"
                id="notification-in-app"
                checked={false}
                onChange={() => { }}
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
                checked={false}
                onChange={() => { }}
              />
              <AppCheckbox
                label="SMS"
                id="budget-sms"
                checked={false}
                onChange={() => { }}
              />
              <AppCheckbox
                label="In-App"
                id="budget-in-app"
                checked={false}
                onChange={() => { }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <AppButton
            label="Save"
            className="btn-primary"
            onClick={() => { }}
          />
        </div>
      </div>
    </div>
  )
}

export default FinanceAdminSettings;