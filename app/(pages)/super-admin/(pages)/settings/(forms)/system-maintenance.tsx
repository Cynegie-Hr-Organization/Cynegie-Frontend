import { AppSelect } from "@/app/_components/shared/select";

const SystemMaintenanceSettingsForm = () => {
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
          onChange={() => { }}
        />


        <AppSelect
          label="Error Log Level"
          placeholder="Select error log level"
          listItems={[
            { label: "Error Only", value: "error-only" },
            { label: "Warnings", value: "warnings" },
            { label: "All Logs", value: "all-logs" },
          ]}
          onChange={() => { }}
        />
      </div>
    </form>
  );
};

export default SystemMaintenanceSettingsForm;