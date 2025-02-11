import { AppSelect } from "@/app/_components/shared/select";
import { ISuperAdminSettings, TimeFrequency } from "@/app/_core/interfaces/super-admin";
import { useState } from 'react';

const ComplianceSettingsForm = ({ settingsData }: {
  settingsData: {
    formData: Partial<ISuperAdminSettings>,
    setFormData: (settings: Partial<ISuperAdminSettings>) => void,
    isLoading: boolean
  }
}) => {
  const [complianceSettingsForm, setComplianceSettingsForm] = useState<{
    settings?: {
      complianceSettings?: {
        dataRetentionDuration?: number;
        complianceReminderFrequency?: string;
      }
    }
  }>({});
  const { formData, setFormData, isLoading } = settingsData;
  const { settings } = formData ?? {}
  const { complianceSettings } = settings ?? {}
  const { complianceReminderFrequency, dataRetentionDuration } = complianceSettings ?? {}

  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">Compliance Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppSelect
          label="Compliance reminder frequency"
          placeholder="Select compliance reminder frequency"
          value={complianceReminderFrequency}
          listItems={[
            { label: "Weekly", value: "weekly" },
            { label: "Bi Weekly", value: "bi-weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          onChange={(value) => {
            setFormData({
              ...formData,
              settings: {
                complianceSettings: {
                  ...formData?.settings?.complianceSettings,
                  complianceReminderFrequency: value as TimeFrequency
                }
              }
            })
          }}
        />
        <AppSelect
          label="Data Retention Duration"
          placeholder="Select data retention duration"
          listItems={[
            { label: "6 months", value: "6-months" },
            { label: "1 year", value: "1-year" },
            { label: "2 years", value: "2-years" }
          ]}
          onChange={(value) => { }}
        />
      </div>
    </form>
  );
};

export default ComplianceSettingsForm;