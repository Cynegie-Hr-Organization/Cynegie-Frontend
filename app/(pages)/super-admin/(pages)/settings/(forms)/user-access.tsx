import useFormStore from "@/app/(pages)/super-admin/(pages)/settings/(forms)/form-state";
import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppTimePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { PasswordComplexity } from "@/app/_core/interfaces/super-admin";

const UserAcessAndSecuritySettingsForm = () => {
  const { data, setData } = useFormStore();
  const { minPasswordLength, passwordComplexity, sessionTimeout } =
    data?.settings?.userAccessSecuritySettings ?? {};

  console.log("password", data);

  // const handleCheckboxChange = (value: string) => {
  //   setData({
  //     ...data,
  //     settings: {
  //       ...data?.settings,
  //       userAccessSecuritySettings: {
  //         ...(data?.settings?.userAccessSecuritySettings ?? {}),
  //         [value]: !data?.settings?.userAccessSecuritySettings?.
  //       }
  //     }
  //   })
  // }

  const handleMinimumPasswordLength = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const passwordLength = numericValue
      ? parseInt(numericValue, 10)
      : undefined;

    setData({
      ...data,
      settings: {
        ...data?.settings,
        userAccessSecuritySettings: {
          ...(data?.settings?.userAccessSecuritySettings ?? {}),
          minPasswordLength: passwordLength,
        },
      },
    });
  };

  const handlePasswordComplexity = (value: string) => {
    setData({
      ...data,
      settings: {
        ...data?.settings,
        userAccessSecuritySettings: {
          ...(data?.settings?.userAccessSecuritySettings ?? {}),
          passwordComplexity: value as PasswordComplexity,
        },
      },
    });
  };

  const handleSessionTimeout = (value?: Date) => {
    const selectedTime = new Date(value ?? new Date());
    const minutes = selectedTime.getMinutes();

    setData({
      ...data,
      settings: {
        ...data?.settings,
        userAccessSecuritySettings: {
          ...(data?.settings?.userAccessSecuritySettings ?? {}),
          sessionTimeout: minutes,
        },
      },
    });
  };
  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">User Access & Security Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Minimum Password Length"
          id="minimum-password-length"
          placeholder="Enter minimum password length"
          value={`${minPasswordLength ?? ""}`}
          onChange={(e) => handleMinimumPasswordLength(e.target.value)}
        />

        <AppMultipleSelect
          label="Password Complexity"
          selectedValues={[passwordComplexity ?? ""]}
          placeholder="Select password complexity"
          items={[
            { label: "Uppercase", value: "uppercase" },
            { label: "Numbers", value: "numbers" },
            { label: "Special Characters", value: "special-characters" },
          ]}
          onSelectionChange={(value) => {
            handlePasswordComplexity(value.map((item) => item).join(", "));
          }}
        />

        <AppTimePicker
          minutesOnly
          label="Session Time Out"
          placeholder="Pick a time"
          selectedTime={new Date(sessionTimeout ?? "") ?? new Date()}
          setSelectedTime={(value) => handleSessionTimeout(value)}
        />

        {/* <TimePicker
          className="w-full hover:border-primary border-primary border rounded-lg ring-0 hover:ring-0"
          preventOverflow
          editable={true}
          format="mm"
        /> */}
      </div>

      <div>
        <AppCheckbox
          label="Enable System Notification"
          id="enable-dark-mode"
          checked={false}
          onChange={(value) => console.log(value)}
        />
      </div>
    </form>
  );
};

export default UserAcessAndSecuritySettingsForm;
