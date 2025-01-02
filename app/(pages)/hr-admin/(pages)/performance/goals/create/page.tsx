/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CardLayout from "@/app/_components/shared/cards";
import InputText, {
  InputTextArea,
} from "../../../../../../_components/shared/input-text";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppSelect } from "@/app/_components/shared/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { createGoals } from "@/app/api/services/performance/goals";
import { toast } from "react-toastify";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";

interface IGoal {
  goalName: string;
  description: string;
  goalType: string;
  dueDate: Date | undefined;
  employees: string[];
  priority: string;
  alignment: string;
  milestones: {
    milestoneName: string;
    dueDate: Date | undefined;
  }[];
  keyResults: {
    keyResult: string;
    targetValue: string;
    dueDate: Date | undefined;
  }[];
}

const PerformanceGoalsCreatePage = () => {
  const router = useRouter();
  const { employees, isFetching, handleSearch } = useFetchEmployees();

  const [formData, setFormData] = useState<IGoal>({
    goalName: "",
    description: "",
    goalType: "",
    dueDate: undefined,
    employees: [],
    priority: "",
    alignment: "",
    milestones: [{ milestoneName: "", dueDate: undefined }],
    keyResults: [{ keyResult: "", targetValue: "", dueDate: undefined }],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.goalName.trim()) {
      toast.error("Goal Name is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }

    if (!["team", "personal"].includes(formData.goalType)) {
      toast.error("Goal Type must be 'team' or 'personal'.");
      return;
    }

    if (!["High", "Medium", "Low"].includes(formData.priority)) {
      toast.error("Priority must be 'High', 'Medium', or 'Low'.");
      return;
    }

    if (!Array.isArray(formData.employees)) {
      toast.error("Employees must be selected.");
      return;
    }

    // Preparing payload
    const payload = {
      goalName: formData.goalName.trim(),
      description: formData.description.trim(),
      goalType: formData.goalType,
      priority: formData.priority,
      employees: formData.employees,
      dueDate: formData.dueDate?.toISOString(),
      alignment: formData.alignment.trim(),
      milestones: formData.milestones.map((m) => ({
        milestoneName: m.milestoneName.trim(),
        dueDate: m.dueDate?.toISOString(),
      })),
      keyResults: formData.keyResults.map((kr) => ({
        result: kr.keyResult.trim(),
        targetValue: Number(kr.targetValue) || 0,
        dueDate: kr.dueDate?.toISOString(),
      })),
    };

    console.log(payload);

    try {
      console.log(payload);
      const response = await createGoals(payload);
      console.log(response);
      if (response?.status === 201) {
        toast.success("Goal created successfully!");
        setTimeout(() => router.push("/hr-admin/performance/goals"), 2000);
      } else {
        toast.error("There was an error creating the goal.");
      }
    } catch (error) {
      toast.error("Failed to create the goal. Please try again.");
    }
  };

  return (
    <form className="space-y-8 pt-5 pb-10" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">Create Goal</h3>

      <CardLayout
        className="bg-white space-y-4 md:space-y-8 md:py-6"
        bg="p-4 md:p-6"
      >
        <InputText
          label="Goal Name"
          id="goal-name"
          placeholder="Enter goal name"
          onChange={(e) =>
            setFormData({ ...formData, goalName: e.target.value })
          }
          value={formData.goalName}
        />

        <InputTextArea
          label="Description"
          id="goal-description"
          placeholder="Enter goal description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
        />

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelect
            label="Goal Type"
            placeholder="Select a goal type"
            onChange={(value) => setFormData({ ...formData, goalType: value })}
            listItems={[
              { label: "Personal", value: "personal" },
              { label: "Team", value: "team" },
              { label: "Employee 3", value: "employee-3" },
            ]}
          />
          <AppMultipleSelect
            label="Assign Employees"
            placeholder="Assign Employees"
            items={employees.map((emp: any) => ({
              label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
              value: emp.id as string,
            }))}
            selectedValues={formData.employees}
            onSelectionChange={(values: string[]) =>
              setFormData({
                ...formData,
                employees: [...new Set(values)],
              })
            }
            width="w-full"
            noResultsText="No employees found"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelect
            label="Priority"
            placeholder="Assign Priority"
            onChange={(value) => setFormData({ ...formData, priority: value })}
            listItems={[
              { label: "Low", value: "Low" },
              { label: "Medium", value: "Medium" },
              { label: "High", value: "High" },
            ]}
          />
          <AppDatePicker
            label="Due Date"
            placeholder="Select a date"
            selectedDate={formData.dueDate}
            setSelectedDate={(date) =>
              setFormData({ ...formData, dueDate: date })
            }
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full lg:w-[calc(50%-16px)]">
          <InputText
            label="Alignment"
            id="alignment"
            placeholder="Enter alignment"
            onChange={(e) =>
              setFormData({ ...formData, alignment: e.target.value })
            }
            value={formData.alignment}
          />
        </div>

        <div className="space-y-6">
          <p className="text-sm font-semibold">Key Results</p>

          {formData.keyResults.map((keyResult, index) => (
            <div key={index} className="space-y-4">
              <InputText
                label="Key Result"
                id={`key-result-${index}`}
                placeholder="Enter key result"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keyResults: formData.keyResults.map((kr, i) =>
                      i === index ? { ...kr, keyResult: e.target.value } : kr,
                    ),
                  })
                }
                value={keyResult.keyResult}
              />

              <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
                <InputText
                  label="Target Value"
                  type="number"
                  id={`target-value-${index}`}
                  placeholder="Enter target value"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      keyResults: formData.keyResults.map((kr, i) =>
                        i === index
                          ? { ...kr, targetValue: e.target.value }
                          : kr,
                      ),
                    })
                  }
                  value={keyResult.targetValue}
                />
                <AppDatePicker
                  label="Due Date"
                  placeholder="Select a date"
                  selectedDate={keyResult.dueDate}
                  setSelectedDate={(date) =>
                    setFormData({
                      ...formData,
                      keyResults: formData.keyResults.map((kr, i) =>
                        i === index ? { ...kr, dueDate: date } : kr,
                      ),
                    })
                  }
                />
              </div>

              <button
                type="button"
                className="text-red-500"
                onClick={() =>
                  setFormData({
                    ...formData,
                    keyResults: formData.keyResults.filter(
                      (_, i) => i !== index,
                    ),
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                keyResults: [
                  ...formData.keyResults,
                  { keyResult: "", targetValue: "", dueDate: undefined },
                ],
              })
            }
            className="flex items-center gap-x-2 text-primary"
          >
            Add Key Result <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        <MilestoneForm formData={formData} setFormData={setFormData} />
      </CardLayout>

      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 justify-end">
        <button
          type="submit"
          className="transition-all duration-300 order-1 md:order-none bg-white px-4 py-2 rounded-md disabled:cursor-not-allowed border disabled:bg-gray-300 border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Save & Continue Later
        </button>

        <button
          type="submit"
          className="w-full md:w-[230px] transition-all duration-300 bg-primary text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:border disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Create
        </button>
      </div>
    </form>
  );
};

const MilestoneForm = ({
  formData,
  setFormData,
}: {
  formData: IGoal;
  setFormData: (data: IGoal) => void;
}) => {
  return (
    <div className="space-y-6">
      <p className="text-sm font-semibold">Milestones</p>

      {formData.milestones.map((milestone, index) => (
        <div key={index} className="space-y-4">
          <InputText
            label="Milestone Name"
            id={`milestone-name-${index}`}
            placeholder="Enter milestone name"
            onChange={(e) =>
              setFormData({
                ...formData,
                milestones: formData.milestones.map((m, i) =>
                  i === index ? { ...m, milestoneName: e.target.value } : m,
                ),
              })
            }
            value={milestone.milestoneName}
          />

          <AppDatePicker
            label="Due Date"
            placeholder="Select a date"
            selectedDate={milestone.dueDate}
            setSelectedDate={(date) =>
              setFormData({
                ...formData,
                milestones: formData.milestones.map((m, i) =>
                  i === index ? { ...m, dueDate: date } : m,
                ),
              })
            }
          />

          <button
            type="button"
            className="text-red-500"
            onClick={() =>
              setFormData({
                ...formData,
                milestones: formData.milestones.filter((_, i) => i !== index),
              })
            }
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setFormData({
            ...formData,
            milestones: [
              ...formData.milestones,
              { milestoneName: "", dueDate: undefined },
            ],
          })
        }
        className="flex items-center gap-x-2 text-primary"
      >
        Add Milestone <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PerformanceGoalsCreatePage;
