import useFormStore from "@/app/(pages)/super-admin/(pages)/settings/(forms)/form-state";
import { AppSelect } from "@/app/_components/shared/select";
import { ErrorLevel, TimeFrequency } from "@/app/_core/interfaces/super-admin";

const SystemMaintenanceSettingsForm = () => {
  const { data, setData } = useFormStore();

  const handleScheduleChange = (value: string) => {
    setData({
      ...data,
      settings: {
        ...data?.settings,
        integrationSettings: {
          ...(data?.settings?.integrationSettings ?? {}),
          scheduleDataBackups: value as TimeFrequency
        }
      }
    })
  }


  const handleErrorLevelChange = (value: string) => {
    setData({
      ...data,
      settings: {
        ...data?.settings,
        integrationSettings: {
          ...(data?.settings?.integrationSettings ?? {}),
          errorLogLevel: value as ErrorLevel
        }
      }
    })
  }


  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">System Maintenance Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppSelect
          label="Schedule Data Backups"
          placeholder="Select schedule"
          listItems={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          value={data?.settings?.integrationSettings?.scheduleDataBackups}
          onChange={handleScheduleChange}
        />

        <AppSelect
          label="Error Log Level"
          placeholder="Select error log level"
          listItems={[
            { label: "Error Only", value: "error-only" },
            { label: "Warnings", value: "warnings" },
            { label: "All Logs", value: "all-logs" },
          ]}
          value={data?.settings?.integrationSettings?.errorLogLevel}
          onChange={handleErrorLevelChange}
        />
      </div>
    </form>
  );
};

export default SystemMaintenanceSettingsForm;
