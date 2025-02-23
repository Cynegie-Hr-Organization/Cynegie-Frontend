import useFormStore from "@/app/(pages)/super-admin/(pages)/settings/(forms)/form-state";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { ApprovalStage } from "@/app/_core/interfaces/super-admin";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const ApprovalAndWorkflowSettingsForm = () => {
  const { data, setData } = useFormStore();
  const [stages, setStages] = useState<ApprovalStage[]>([]);

  useEffect(() => {
    const initialStages =
      data?.settings?.approvalWorkflowSettings?.stages ?? [];
    setStages(initialStages.length > 0 ? initialStages : []);
  }, [data]);

  const handleAddStage = () => {
    // const newStageNumber = stages.length + 1;
    const newStage = {
      stageName: "",
      approvers: [],
    };

    const updatedStages = [...stages, newStage];
    setStages(updatedStages);

    setData({
      ...data,
      settings: {
        ...data?.settings,
        approvalWorkflowSettings: {
          ...data?.settings?.approvalWorkflowSettings,
          stages: updatedStages,
        },
      },
    });
  };

  const handleRemoveStage = (indexToRemove: number) => {
    const updatedStages = stages.filter((_, index) => index !== indexToRemove);
    setStages(updatedStages);

    setData({
      ...data,
      settings: {
        ...data?.settings,
        approvalWorkflowSettings: {
          ...data?.settings?.approvalWorkflowSettings,
          stages: updatedStages,
        },
      },
    });
  };

  const handleStageNameChange = (index: number, newName: string) => {
    const updatedStages = stages.map((stage, idx) =>
      idx === index ? { ...stage, stageName: newName } : stage,
    );

    setStages(updatedStages);

    // Update form store
    setData({
      ...data,
      settings: {
        ...data?.settings,
        approvalWorkflowSettings: {
          ...data?.settings?.approvalWorkflowSettings,
          stages: updatedStages,
        },
      },
    });
  };

  const handleApproversChange = (index: number, approvers: string[]) => {
    const updatedStages = stages.map((stage, idx) =>
      idx === index ? { ...stage, approvers } : stage,
    );
    setStages(updatedStages);

    // Update form store
    setData({
      ...data,
      settings: {
        ...data?.settings,
        approvalWorkflowSettings: {
          ...data?.settings?.approvalWorkflowSettings,
          stages: updatedStages,
        },
      },
    });
  };

  // const handleSystemNotificationChange = (index: number, checked: boolean) => {
  //   const updatedStages = stages.map((stage, idx) =>
  //     idx === index ? { ...stage, isSystemNotificationEnabled: checked } : stage
  //   );
  //   setStages(updatedStages);

  //   // Update form store
  //   setData({
  //     ...data,
  //     settings: {
  //       ...data?.settings,
  //       approvalWorkflowSettings: {
  //         ...data?.settings?.approvalWorkflowSettings,
  //         stages: updatedStages
  //       }
  //     }
  //   });
  // };

  const approverOptions = [
    { label: "Super Admin", value: "super-admin" },
    { label: "HR Admin", value: "hr-admin" },
    { label: "IT Admin", value: "it-admin" },
    { label: "Finance Admin", value: "finance-admin" },
    { label: "Manager", value: "manager" },
  ];

  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">Approval And Workflow Settings</h3>

      {stages.map((stage, index) => (
        <div
          key={`stage-${index + 1}`}
          className="flex items-center justify-between flex-grow space-x-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <AppInputText
              label="Stage"
              id={`stage-number-${index + 1}`}
              placeholder="Stage Number"
              value={`Stage ${index + 1}`}
              disabled
            />
            <AppInputText
              label="Stage Name"
              id={`stage-name-${index + 1}`}
              placeholder="Enter Stage Name"
              value={stage.stageName}
              onChange={(e) => handleStageNameChange(index, e.target.value)}
            />
            <AppMultipleSelect
              label="Approvers"
              placeholder="Select approvers"
              selectedValues={stage.approvers}
              items={approverOptions}
              onSelectionChange={(value) => handleApproversChange(index, value)}
            />
          </div>
          {stages.length > 1 && (
            <div>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveStage(index)}
              >
                <FaRegTrashAlt size={16} />
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="space-y-3">
        <button
          type="button"
          className="text-primary font-semibold flex items-center gap-2"
          onClick={handleAddStage}
        >
          <FaCirclePlus size={16} className="text-primary" />
          Add Stage
        </button>
        {/* <AppCheckbox
          label="Enable System Notification"
          id="enable-dark-mode"
          checked={true}
          onChange={() => { }}
        /> */}
      </div>
    </form>
  );
};

export default ApprovalAndWorkflowSettingsForm;
