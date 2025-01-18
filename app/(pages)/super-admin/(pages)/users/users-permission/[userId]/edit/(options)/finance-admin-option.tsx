import { SwitchState } from "../page";
import { OptionSwitch } from "./components/option-switch";



export const FinanceAdminOptions = ({
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
      <h3 className="text-base font-bold text-gray-900">Finance Admin Options</h3>

      <div className="space-y-3">
        <OptionSwitch
          label="Chart of Account"
          description="Grant user permission to view chart of account."
          id="chartOfAccount"
          checked={switches.chartOfAccount}
          onChange={(checked) => onSwitchChange('chartOfAccount', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />

        <OptionSwitch
          label="Budgets"
          description="Grant user permission to access to be able to manage budgets."
          id="budgets"
          checked={switches.budgets}
          onChange={(checked) => onSwitchChange('budgets', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />

        <OptionSwitch
          label="Journals"
          description="Grant user access to journal enteries."
          id="journals"
          checked={switches.journals}
          onChange={(checked) => onSwitchChange('journals', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />

        <OptionSwitch
          label="Banking"
          description="Grant user access to banking."
          id="banking"
          checked={switches.banking}
          onChange={(checked) => onSwitchChange('banking', checked)}
          disabled={isDisabledSwitches}
        />

        <hr className="border-b border-gray-200" />

        <OptionSwitch
          label="Banking Transaction"
          description="Grant user full access to view transaction."
          id="bankingTransaction"
          checked={switches.bankingTransaction}
          onChange={(checked) => onSwitchChange('bankingTransaction', checked)}
          disabled={isDisabledSwitches}
        />
      </div>
    </div>
  );
};