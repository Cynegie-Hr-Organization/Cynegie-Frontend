"use client";

import CardLayout from "@/app/_components/shared/cards";
import InputText from "./input-text";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppSelect } from "@/app/_components/shared/select";
import { useState } from "react";


interface IReviewCycle {
  reviewCycleName: string,
  startDate: Date | undefined,
  endDate: Date | undefined,
  daysOfGrace: string,
  assignedEmployees: string,
  assignedReviewer: string,
  reminderType: string,
  reminderFrequency: string,
}
const NewReviewCycle = () => {
  const [formData, setFormData] = useState<IReviewCycle>({
    reviewCycleName: "",
    startDate: undefined,
    endDate: undefined,
    daysOfGrace: "",
    assignedEmployees: '',
    assignedReviewer: "",
    reminderType: "",
    reminderFrequency: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      startDate: formData.startDate?.toISOString(),
      endDate: formData.endDate?.toISOString(),
    };
    console.log(data);
  };

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
            onChange={(value) => setFormData({ ...formData, assignedEmployees: value })}
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
      </CardLayout>

      <div className="flex justify-end">
        <button type="submit"
          disabled={!formData.reviewCycleName || !formData.startDate || !formData.endDate || !formData.daysOfGrace || formData.assignedEmployees.length === 0 || formData.assignedReviewer === ""}
          className="bg-primary text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500"
        >Create Review Cycle</button>
      </div>
    </form>
  );
};

export default NewReviewCycle;
