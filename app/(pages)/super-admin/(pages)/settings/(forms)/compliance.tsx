import useFormStore from "@/app/(pages)/super-admin/(pages)/settings/(forms)/form-state";
import { AppSelect } from "@/app/_components/shared/select";
import { TimeFrequency } from "@/app/_core/interfaces/super-admin";

const ComplianceSettingsForm = () => {
  const { setData, data } = useFormStore();

  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">Compliance Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppSelect
          label="Compliance reminder frequency"
          placeholder="Select compliance reminder frequency"
          value={
            data?.settings?.complianceSettings?.complianceReminderFrequency
          }
          listItems={[
            { label: "Weekly", value: "weekly" },
            { label: "Bi Weekly", value: "bi-weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          onChange={(value) => {
            setData({
              ...data,
              settings: {
                ...data?.settings,
                complianceSettings: {
                  ...(data?.settings?.complianceSettings ?? {}),
                  complianceReminderFrequency: value as TimeFrequency,
                },
              },
            });
          }}
        />
        <AppSelect
          label="Data Retention Duration"
          placeholder="Select data retention duration"
          value={`${data?.settings?.complianceSettings?.dataRetentionDuration}`}
          listItems={[
            { label: "6 months", value: "6-months" },
            { label: "1 year", value: "1-year" },
            { label: "2 years", value: "2-years" },
          ]}
          onChange={(value) => {
            setData({
              ...data,
              settings: {
                ...data?.settings,
                complianceSettings: {
                  ...(data?.settings?.complianceSettings ?? {}),
                  // dataRetentionDuration: parseInt(value, 10)
                  dataRetentionDuration: value ?? "",
                },
              },
            });
          }}
        />
      </div>
    </form>
  );
};

export default ComplianceSettingsForm;
