"use client";

import CardLayout from "@/app/_components/shared/cards";
import InputText, { InputTextArea } from "../../../../../../_components/shared/input-text";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppSelect } from "@/app/_components/shared/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon } from "lucide-react";



interface IGoal {
  goalName: string,
  goalDescription: string,
  startDate: Date | undefined,
  dueDate: Date | undefined,
  daysOfGrace: string,
  assignedEmployees: string[],
  priority: string,
  alignment: string,
  milestones: {
    milestone: string,
    dueDate: Date | undefined,
  }[]
}

const PerformanceGoalsCreatePage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState<IGoal>({
    goalName: "",
    goalDescription: "",
    startDate: undefined,
    dueDate: undefined,
    daysOfGrace: "",
    assignedEmployees: [],
    priority: "",
    alignment: "",
    milestones: []
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      startDate: formData.startDate?.toISOString(),
      dueDate: formData.dueDate?.toISOString(),
    };
    console.log(data);
    router.push("/hr-admin/performance/goals");

    toast({
      title: "Successful",
      description: "Goal has been created successfully ",
    })
  };


  const isFormValid = formData.goalName.trim() !== "" &&
    formData.startDate &&
    formData.dueDate &&
    formData.daysOfGrace.trim() !== "" &&
    formData.assignedEmployees.length > 0 &&
    formData.priority.trim() !== "" &&
    formData.alignment.trim() !== "" &&
    formData.milestones.length > 0;

  return (
    <form className="space-y-8 pt-5 pb-10" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">Create Goal</h3>

      <CardLayout className="bg-white space-y-4 md:space-y-8 md:py-6" bg="p-4 md:p-6">
        <InputText
          label="Goal Name"
          id="goal-name"
          placeholder="Enter goal name"
          onChange={(e) => setFormData({ ...formData, goalName: e.target.value })}
          value={formData.goalName}
        />

        <InputTextArea
          label="Description"
          id="goal-description"
          placeholder="Enter goal description"
          onChange={(e) => setFormData({ ...formData, goalDescription: e.target.value })}
          value={formData.goalDescription}
        />

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelect
            label="Goal Type"
            placeholder="Select a type"
            onChange={(value) => {
              setFormData({ ...formData, assignedEmployees: [...new Set([...formData.assignedEmployees, value])] });
            }}
            listItems={[
              { label: "Employee 1", value: "employee-1" },
              { label: "Employee 2", value: "employee-2" },
              { label: "Employee 3", value: "employee-3" },
            ]}
          />
          <AppSelect
            label="Assign Employees"
            placeholder="Assign Employees"
            onChange={(value) => setFormData({ ...formData, assignedEmployees: [...new Set([...formData.assignedEmployees, value])] })}
            listItems={[
              { label: "Employee 1", value: "employee-1" },
              { label: "Employee 2", value: "employee-2" },
              { label: "Employee 3", value: "employee-3" },
            ]}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelect
            label="Priority"
            placeholder="Assign Priority"
            onChange={(value) => setFormData({ ...formData, priority: value })}
            listItems={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />
          <AppDatePicker
            label="Due Date"
            placeholder="Select a date"
            selectedDate={formData.dueDate}
            setSelectedDate={(date) => setFormData({ ...formData, dueDate: date })}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-betwee w-full lg:w-[calc(50%-16px)]">
          <AppSelect
            label="Alignment"
            placeholder="Assign Alignment"
            onChange={(value) => setFormData({ ...formData, alignment: value })}
            listItems={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />
        </div>


        <div className="space-y-6">
          <p className="text-sm font-semibold">Key Results</p>

          <div className="space-y-4">
            <InputText
              label="Key Result"
              id="key-result"
              placeholder="Enter key result"
              onChange={() => { }}
              value=""
            />

            <div>
              <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
                <InputText
                  label="Target Value"
                  id="key-result"
                  placeholder="Enter key result"
                  onChange={() => { }}
                  value=""
                />
                <AppDatePicker
                  label="Due Date"
                  placeholder="Select a date"
                  selectedDate={formData.dueDate}
                  setSelectedDate={(date) => setFormData({ ...formData, dueDate: date })}
                />
              </div>


              <button type="button" className="text-red-500">remove</button>
            </div>


            <button type="button" className="flex items-center gap-x-2 text-primary">
              Add<PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <MilstoneForm formData={formData} setFormData={setFormData} />
      </CardLayout>

      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 justify-end">
        <button type="submit"
          className="transition-all duration-300 order-1 md:order-none bg-white px-4 py-2 rounded-md disabled:cursor-not-allowed border disabled:bg-gray-300 border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Save & Continue Later
        </button>


        <button
          type="submit"
          // disabled={!isFormValid}
          className="w-full md:w-[230px] transition-all duration-300 bg-primary text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:border disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Create
        </button>
      </div>
    </form>
  );
};

const MilstoneForm = ({ formData, setFormData }: { formData: IGoal, setFormData: (data: IGoal) => void }) => {
  return (
    <div className="space-y-6">
      <p className="text-sm font-semibold">Milestone</p>

      <div className="space-y-4">
        <InputText
          label="Milestone"
          id="key-result"
          placeholder="Enter key result"
          onChange={(e) => { formData.milestones[0] = { ...formData.milestones[0], milestone: e.target.value } }}
          value={formData.milestones[0]?.milestone}
        />

        <div>
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full lg:w-[calc(50%-16px)]">
            <AppDatePicker
              label="Due Date"
              placeholder="Select a date"
              selectedDate={formData.milestones[0]?.dueDate}
              setSelectedDate={(date) => setFormData({ ...formData, milestones: [...formData.milestones, { milestone: "", dueDate: date }] })}
            />
          </div>

          <button type="button" className="text-red-500">remove</button>
        </div>


        <button type="button" className="flex items-center gap-x-2 text-primary">
          Add<PlusIcon className="w-4 h-4" />
        </button>

      </div>
    </div>
  )
}



export default PerformanceGoalsCreatePage;