import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";

const IntegrationSettingsForm = () => {
  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">Integration Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppInputText
          label="API"
          placeholder="Cynegie API"
          id="api"
          value=""
          disabled
        />


        <AppSelect
          label="Third Party Integrations"
          placeholder="Payroll System"
          listItems={[
            { label: "Payroll System", value: "payroll-system" },
            { label: "Accounting tool", value: "accounting-tool" },
            { label: "CRM", value: "crm" },
          ]}
          onChange={() => { }}
        />
      </div>
    </form>
  );
};

export default IntegrationSettingsForm;