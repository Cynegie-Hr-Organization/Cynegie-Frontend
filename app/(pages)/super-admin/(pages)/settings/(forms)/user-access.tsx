import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppTimePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { ISuperAdminSettings } from "@/app/_core/interfaces/super-admin";





const UserAcessAndSecuritySettingsForm = () => {
  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">User Access & Security Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Minimum Password Length"
          id="minimum-password-length"
          placeholder="Enter minimum password length"
          value=""
          onChange={() => { }}
        />
        <AppMultipleSelect
          label="Password Complexity"
          selectedValues={[]}
          placeholder="Select password complexity"
          items={[
            { label: "Uppercase", value: "uppercase" },
            { label: "Numbers", value: "numbers" },
            { label: "Special Characters", value: "special-characters" },
          ]}
          onSelectionChange={() => { }}
        />
        <AppTimePicker
          minutesOnly
          label="Session Time Out"
          placeholder="Pick a time"
          setSelectedTime={() => { }}
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