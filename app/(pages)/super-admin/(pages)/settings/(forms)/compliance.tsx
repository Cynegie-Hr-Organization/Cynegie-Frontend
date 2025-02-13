import { AppSelect } from "@/app/_components/shared/select";
import { ISuperAdminSettings, TimeFrequency } from "@/app/_core/interfaces/super-admin";

const ComplianceSettingsForm = ({ settingsData }: {
  settingsData: {
    formData: Partial<ISuperAdminSettings>,
    setFormData: (settings: Partial<ISuperAdminSettings>) => void,
    isLoading: boolean
  }
}) => {
  const { formData, setFormData, isLoading } = settingsData;
  const { settings } = formData ?? {}
  const { complianceSettings } = settings ?? {}
  const { complianceReminderFrequency, dataRetentionDuration } = complianceSettings ?? {}

  const updateComplianceSettings = (updates: Partial<typeof complianceSettings>) => {
    setFormData({
      ...formData,
      settings: {
        ...formData.settings!,
        complianceSettings: {
          ...formData?.settings?.complianceSettings!,
          ...updates
        }
      }
    });
  };

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
            updateComplianceSettings({
              complianceReminderFrequency: value as TimeFrequency
            });
          }}
        />
        <AppSelect
          label="Data Retention Duration"
          placeholder="Select data retention duration"
          value={`${dataRetentionDuration}`}
          listItems={[
            { label: "6 months", value: `${6 * 30}` },
            { label: "1 year", value: `${1 * 365}` },
            { label: "2 years", value: `${2 * 365}` }
          ]}
          onChange={(value) => {
            updateComplianceSettings({
              dataRetentionDuration: parseInt(value, 10)
            });
          }}
        />
      </div>
    </form>
  );
};

export default ComplianceSettingsForm;