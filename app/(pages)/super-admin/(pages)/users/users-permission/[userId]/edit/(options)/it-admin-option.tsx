import { OptionSwitch } from "./components/option-switch";
import { SwitchState } from "../page";




export const ITAdminOptions = ({
  switches,
  onSwitchChange,
  isDisabledSwitches
}: {
  switches: SwitchState,
  onSwitchChange: (id: string, checked: boolean) => void
  isDisabledSwitches: boolean
}) => {


  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900">IT Admin Options</h3>

      <div className="space-y-3">
        <OptionSwitch
          label="IT Administration"
          description="Grant user permission to manage all IT services."
          id="itAdministration"
          checked={switches.itAdministration}
          onChange={(checked) => onSwitchChange('itAdministration', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
      </div>
    </div>
  );
};