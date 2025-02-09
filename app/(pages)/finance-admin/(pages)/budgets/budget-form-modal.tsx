import AppButton from "@/app/_components/shared/button";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import AppInputText, {
  AppInputTextArea,
} from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { IBudgetCreate } from "@/app/_core/interfaces/budget";
import { useBudgetMutations } from "@/app/_core/use-cases/finance/useBudget";
import { handleError } from "@/app/_core/utils/axios";
import { DrawerDialog } from "@/components/drawer/modal";
import { useIsMutating } from "@tanstack/react-query";
import { useState } from "react";

const AddBudgetModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMutatingCreateBudget = useIsMutating({
    mutationKey: ["create-budget"],
  });
  const [formData, setFormData] = useState<IBudgetCreate>({
    budgetName: "Support Infrastructure Upgrade",
    department: "Finance",
    allocation: 20000,
    description: "Upgrade servers and networking equipments",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
  });

  const isFormValidated =
    formData.department &&
    formData.allocation &&
    formData.description &&
    formData.startDate &&
    formData.endDate;

  const { createBudget } = useBudgetMutations();

  const handleCreateBudget = () => {
    createBudget.mutate(formData, {
      onError: (error) => handleError(error, "", false),
    });
  };

  return (
    <DrawerDialog
      open={isOpen}
      setOpen={setIsOpen}
      trigger={trigger}
      header={
        <span>
          <span className="font-roboto text-xl font-bold">New Budget</span>
        </span>
      }
      footer={
        <div className="flex items-center justify-center gap-4">
          <AppButton
            label="Cancel"
            className="btn-secondary w-[296px]"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <AppButton
            label="Save Budget"
            className="btn-primary w-[296px]"
            isLoading={isMutatingCreateBudget > 0}
            disabled={isMutatingCreateBudget > 0 || !isFormValidated}
            onClick={() => {
              handleCreateBudget();
            }}
          />
        </div>
      }
    >
      <form>
        <div className="space-y-4">
          <AppSelect
            label="Department"
            placeholder="Select department"
            onChange={(value) => {
              setFormData({ ...formData, department: value });
            }}
            requiredField
            listItems={[
              { label: "Finance Department", value: "Finance" },
              { label: "HR Department", value: "HR" },
              { label: "IT Department", value: "IT" },
            ]}
          />
          <AppInputText
            label="Allocation"
            placeholder="0"
            onChange={(e) => {
              setFormData({
                ...formData,
                allocation: parseInt(e.target.value),
              });
            }}
            value={formData.allocation}
            id={"allocation"}
            requiredField
            type={"number"}
          />
          <AppInputTextArea
            label="Description"
            placeholder="Enter description"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            value={formData.description}
            id={"description"}
            requiredField
          />
          <AppDatePicker
            label="Start Date"
            placeholder="Date"
            selectedDate={
              formData.startDate ? new Date(formData.startDate) : undefined
            }
            setSelectedDate={(date) => {
              setFormData({
                ...formData,
                startDate: date?.toISOString() ?? "",
              });
            }}
            requiredField
          />
          <AppDatePicker
            label="End Date"
            placeholder="Date"
            selectedDate={
              formData.endDate ? new Date(formData.endDate) : undefined
            }
            setSelectedDate={(date) => {
              setFormData({ ...formData, endDate: date?.toISOString() ?? "" });
            }}
            requiredField
          />
        </div>
      </form>
    </DrawerDialog>
  );
};

export default AddBudgetModal;
