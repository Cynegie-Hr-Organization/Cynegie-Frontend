import useFormStore from "@/app/(pages)/super-admin/(pages)/settings/(forms)/form-state";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { ChangeEvent } from "react";

const IntegrationSettingsForm = () => {
  const { data, setData } = useFormStore();

  const handleAPIChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      settings: {
        ...data?.settings,
        integrationSettings: {
          ...(data?.settings?.integrationSettings ?? {}),
          api: event.target.value
        }
      }
    })
  }

  const handleThirdPartyIntegrationChange = (values: string[]) => {
    setData({
      ...data,
      settings: {
        ...data?.settings,
        integrationSettings: {
          ...(data?.settings?.integrationSettings ?? {}),
          thirdPartyIntegrations: values
        }
      }
    })
  }
  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">Integration Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppInputText
          label="API"
          placeholder="e.g Cynegie API"
          id="api"
          value={data?.settings?.integrationSettings?.api ?? ""}
          onChange={handleAPIChange}
        // disabled
        />

        <AppMultipleSelect
          label="Third Party Integrations"
          placeholder="Payroll System"
          items={[
            { label: "Payroll System", value: "payroll-system" },
            { label: "Accounting tool", value: "accounting-tool" },
            { label: "CRM", value: "crm" },
          ]}
          selectedValues={data?.settings?.integrationSettings?.thirdPartyIntegrations ?? []}
          onSelectionChange={handleThirdPartyIntegrationChange}
        />
      </div>
    </form>
  );
};

export default IntegrationSettingsForm;
