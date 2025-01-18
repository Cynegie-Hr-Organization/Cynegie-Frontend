import { OptionSwitch } from "./components/option-switch";
import { SwitchState } from "../page";





export const HRAdminOptions = ({
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
      <h3 className="text-base font-bold text-gray-900">HR Admin Options</h3>

      <div className="space-y-3">
        <OptionSwitch
          label="Onboarding"
          description="Grant user permission to onboard employees."
          id="onboarding"
          checked={switches.onboarding}
          onChange={(checked) => onSwitchChange('onboarding', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
        <OptionSwitch
          label="Hiring"
          description="Grant user permission to access to be able to hire employees."
          id="hiring"
          checked={switches.hiring}
          onChange={(checked) => onSwitchChange('hiring', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
        <OptionSwitch
          label="Employee Management"
          description="Grant user access to manage employee."
          id="employeeManagement"
          checked={switches.employeeManagement}
          onChange={(checked) => onSwitchChange('employeeManagement', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
        <OptionSwitch
          label="Performance Management"
          description="Grant user access to view their performance"
          id="performanceManagement"
          checked={switches.performanceManagement}
          onChange={(checked) => onSwitchChange('performanceManagement', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
        <OptionSwitch
          label="Payroll"
          description="Grant user full access to review their payroll."
          id="payroll"
          checked={switches.payroll}
          onChange={(checked) => onSwitchChange('payroll', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
        <OptionSwitch
          label="Device Management"
          description="Grant user full access to manage devices."
          id="deviceManagement"
          checked={switches.deviceManagement}
          onChange={(checked) => onSwitchChange('deviceManagement', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
        <OptionSwitch
          label="App Management"
          description="Grant user full access to manage apps."
          id="appManagement"
          checked={switches.appManagement}
          onChange={(checked) => onSwitchChange('appManagement', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />
      </div>
    </div>
  );
};
