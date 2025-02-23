import AppButton from "@/app/_components/shared/button";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import AppInputText, {
  AppInputTextArea,
} from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { IBudgetCreate } from "@/app/_core/interfaces/budget";
import {
  useBudgetMutations,
  useDepartment,
} from "@/app/_core/use-cases/finance/useBudget";
import { useAppToast } from "@/app/_hooks/toast";
import { AppModal } from "@/components/drawer/modal";
import { useIsMutating } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const AddBudgetModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { apptoast } = useAppToast();
  const isMutatingCreateBudget = useIsMutating({
    mutationKey: ["create-budget"],
  });
  const [formData, setFormData] = useState<IBudgetCreate>({
    budgetName: "",
    department: "",
    allocation: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const isFormValidated =
    formData.department &&
    formData.allocation &&
    formData.description &&
    formData.startDate &&
    formData.endDate;

  const { data: departmentsData } = useDepartment();

  const departments = useMemo(() => {
    return departmentsData?.data ?? [];
  }, [departmentsData]);

  const departmentOptions = useMemo(() => {
    return departments?.map((department) => ({
      label: department?.departmentName,
      value: department?.id,
    }));
  }, [departments]);

  const { createBudget } = useBudgetMutations();

  const handleCreateBudget = () => {
    const budgetData = {
      ...formData,
      allocation: formData.allocation === "" ? 0 : Number(formData.allocation),
    };

    createBudget.mutate(budgetData, {
      onSuccess: () => {
        apptoast.success({
          title: "Successful",
          message: "Budget created successfully",
        });
        setIsOpen(false);
      },
    });
  };

  return (
    <AppModal
      open={isOpen}
      setOpen={setIsOpen}
      trigger={trigger}
      header={<span className="font-roboto text-xl font-bold">New Budget</span>}
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
          <AppInputText
            label="Budget Name"
            placeholder="Enter budget name"
            onChange={(e) => {
              setFormData({
                ...formData,
                budgetName: e.target.value,
              });
            }}
            value={formData.budgetName}
            id={"budget-name"}
            requiredField
          />
          <AppSelect
            label="Department"
            placeholder="Select department"
            value={formData.department}
            onChange={(value) => {
              setFormData({ ...formData, department: value });
            }}
            requiredField
            listItems={departmentOptions}
          />
          <AppInputText
            label="Allocation"
            placeholder="Enter budget allocation"
            // type="number"
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                const truncatedValue = inputValue.slice(0, 15);
                const parsedValue =
                  truncatedValue === "" ? "" : parseInt(truncatedValue, 10);

                setFormData({
                  ...formData,
                  allocation: parsedValue,
                });
              }
            }}
            value={formData.allocation}
            id={"allocation"}
            requiredField
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
    </AppModal>
  );
};

export default AddBudgetModal;
