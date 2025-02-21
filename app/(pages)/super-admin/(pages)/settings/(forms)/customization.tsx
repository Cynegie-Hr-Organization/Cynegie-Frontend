import { AppSelect } from "@/app/_components/shared/select";

const CustomizationSettingsForm = () => {
  // const {data, setData} = useFormStore();

  // const handleThemeAndBrandingChange = (value: string) => {
  //   setData({
  //     ...data,
  //     settings: {
  //       ...data?.settings,
  //      integrationSettings: {
  //         ...(data?.settings?.integrationSettings ?? {}),
  //         api: value as ThemeAndBranding
  //       }
  //     }
  //   })
  // }
  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">Customization Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppSelect
          label="Theme and Branding"
          placeholder="Select theme and branding"
          listItems={[
            { label: "Light mode", value: "light" },
            { label: "Dark mode", value: "dark" },
            { label: "Custom", value: "custom" },
          ]}
          onChange={() => { }}
        />

        <AppSelect
          label="Dashboard Configuration"
          placeholder="Select dashboard configuration"
          listItems={[
            { label: "Pending approvals", value: "pending-approvals" },
            { label: "User permission", value: "user-permission" },
            { label: "User activity", value: "user-activity" },
          ]}
          onChange={() => { }}
        />
      </div>
    </form>
  );
};

export default CustomizationSettingsForm;
