import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { FaCirclePlus } from "react-icons/fa6";

const ApprovalAndWorkflowSettingsForm = () => {
  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">Approval And Workflow Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Stage"
          id="stage"
          placeholder="Stage 1"
          value="Stage 1"
          disabled
        />
        <AppInputText
          label="Stage Name"
          id="stage-name"
          placeholder="Stage Name"
          value=""
          onChange={() => { }}
        />
        <AppMultipleSelect
          label="Approvers"
          placeholder="Select approvers"
          selectedValues={[]}
          items={[
            { label: "Super Admin", value: "super-admin" },
            { label: "HR Admin", value: "hr-admin" },
            { label: "IT Admin", value: "it-admin" },
            { label: "Finance Admin", value: "finance-admin" },
            { label: "Manager", value: "manager" },
          ]}
          onSelectionChange={(value) => console.log(value)}
        />
      </div>

      <div className="space-y-3">
        <button
          type="button"
          className="text-primary font-semibold flex items-center gap-2"
          onClick={() => { }}
        >
          <FaCirclePlus size={16} className="text-primary" />
          Add Stage
        </button>
        <AppCheckbox
          label="Enable System Notification"
          id="enable-dark-mode"
          checked={true}
          onChange={() => { }}
        />
      </div>
    </form>
  );
};

export default ApprovalAndWorkflowSettingsForm;