"use client";

import CardLayout from "@/app/_components/shared/cards";
import InputText from "../../../../../../_components/shared/input-text";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppSelect } from "@/app/_components/shared/select";
import { useState } from "react";
import { AppSwitch } from "@/app/_components/shared/switch";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface IReviewCycle {
  reviewCycleName: string,
  startDate: Date | undefined,
  endDate: Date | undefined,
  daysOfGrace: string,
  assignedEmployees: string[],
  assignedReviewer: string,
  reminderType: string,
  reminderFrequency: string,
  notifyEmployees: boolean,
  notifyReviewers: boolean,
}


const NewReviewCycle = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState<IReviewCycle>({
    reviewCycleName: "",
    startDate: undefined,
    endDate: undefined,
    daysOfGrace: "",
    assignedEmployees: [],
    assignedReviewer: "",
    reminderType: "",
    reminderFrequency: "",
    notifyEmployees: false,
    notifyReviewers: false,
  });

  // useEffect(() => {
  //   setFormData({ ...formData });
  // }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      startDate: formData.startDate?.toISOString(),
      endDate: formData.endDate?.toISOString(),
    };
    console.log(data);
    router.push("/hr-admin/performance/overview");
    
    toast({
      title: "Successful",
      description: "Review cycle has been created successfully ",
    })
  };


  const isFormValid = formData.reviewCycleName.trim() !== "" &&
    formData.startDate &&
    formData.endDate &&
    formData.daysOfGrace.trim() !== "" &&
    formData.assignedEmployees.length > 0 &&
    formData.assignedReviewer.trim() !== "" &&
    (formData.notifyEmployees || formData.notifyReviewers);

  return (
    <form className="space-y-8 pt-5 pb-10" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">New Review Cycle</h3>

      <CardLayout className="bg-white space-y-4 md:space-y-8" bg="p-4 md:p-6">
        <InputText
          label="Review Cycle Name"
          id="review-cycle-name"
          placeholder="Enter cycle name"
          requiredField
          onChange={(e) => setFormData({ ...formData, reviewCycleName: e.target.value })}
          value={formData.reviewCycleName}
        />

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppDatePicker
            label="Start Date"
            requiredField
            selectedDate={formData.startDate}
            setSelectedDate={(date) => setFormData({ ...formData, startDate: date })}
          />
          <AppDatePicker
            label="End Date"
            requiredField
            selectedDate={formData.endDate}
            setSelectedDate={(date) => setFormData({ ...formData, endDate: date })}
          />
          <InputText
            label="Days of Grace"
            type="number"
            id="days-of-grace"
            placeholder="Select days of grace"
            requiredField
            onChange={(e) => setFormData({ ...formData, daysOfGrace: e.target.value })}
            value={formData.daysOfGrace}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelect
            label="Assign Employees"
            requiredField
            placeholder="Select employees"
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
            label="Assign Reviewer"
            requiredField
            placeholder="Select reviewer"
            onChange={(value) => setFormData({ ...formData, assignedReviewer: value })}
            listItems={[
              { label: "Reviewer 1", value: "reviewer-1" },
              { label: "Reviewer 2", value: "reviewer-2" },
              { label: "Reviewer 3", value: "reviewer-3" },
            ]}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelect
            label="Reminder Type"
            requiredField
            placeholder="Select reminder type"
            onChange={(value) => setFormData({ ...formData, reminderType: value })}
            listItems={[
              { label: "Before Review", value: "before-review" },
              { label: "After Review", value: "after-review" },
            ]}
          />
          <AppSelect
            label="Reminder Frequency"
            requiredField
            placeholder="Select reminder frequency"
            onChange={(value) => setFormData({ ...formData, reminderFrequency: value })}
            listItems={[
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
            ]}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-10 items-start md:items-center w-full mb-40">
          <AppSwitch label="Notify Employees" id="notify-employees" onChange={(value) => setFormData({ ...formData, notifyEmployees: value })} />
          <AppSwitch label="Notify Reviewers" id="notify-reviewers" onChange={(value) => setFormData({ ...formData, notifyReviewers: value })} />
        </div>
      </CardLayout>

      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 justify-end">
        <button type="submit"
          className="transition-all duration-300 order-1 md:order-none bg-white px-4 py-2 rounded-md disabled:cursor-not-allowed border disabled:bg-gray-300 border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Save & Continue Later
        </button>


        <button
          type="submit"
          disabled={!isFormValid}
          className="transition-all duration-300 bg-primary text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:border disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Create Review Cycle
        </button>
      </div>
    </form>
  );
};

export default NewReviewCycle;
