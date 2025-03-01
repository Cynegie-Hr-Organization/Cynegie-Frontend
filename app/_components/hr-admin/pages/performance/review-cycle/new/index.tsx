/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { AppSelectWithSearch } from "@/app/_components/shared/select-with-search";
import { AppSwitch } from "@/app/_components/shared/switch";
import { createReviewCycle } from "@/app/api/services/performance/review cycle";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface IReviewCycle {
  reviewCycleName: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  daysOfGrace: string;
  assignedEmployees: string[];
  assignedReviewer: string[];
  reminderType: string;
  reminderFrequency: string;
  notifyEmployees: boolean;
  notifyReviewers: boolean;
}

const NewReviewCycle = () => {
  const router = useRouter();
  const { employees, isFetching, handleSearch } = useFetchEmployees();

  const [formData, setFormData] = useState<IReviewCycle>({
    reviewCycleName: "",
    startDate: undefined,
    endDate: undefined,
    daysOfGrace: "",
    assignedEmployees: [],
    assignedReviewer: [],
    reminderType: "",
    reminderFrequency: "",
    notifyEmployees: false,
    notifyReviewers: false,
  });

  const handleFormChange = (key: keyof IReviewCycle, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Form submit logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Payload formatting
    const payload = {
      cycleName: formData.reviewCycleName,
      startDate: formData.startDate?.toISOString(),
      endDate: formData.endDate?.toISOString(),
      daysOfGrace: Number(formData.daysOfGrace),
      employees: formData.assignedEmployees,
      reviewers: formData.assignedReviewer,
      reminderType: formData.reminderType,
      reminderFrequency: formData.reminderFrequency,
    };

    console.log(payload); // Debugging log for payload

    try {
      const response = await createReviewCycle(payload);
      console.log(response);
      if (response?.status === 201) {
        toast.success("Review cycle has been created successfully.");
        setTimeout(() => {
          router.push("/hr-admin/performance/overview");
        }, 2000);
      } else {
        toast.error("There was an error creating the review cycle.");
      }
    } catch (error) {
      console.error("Error creating review cycle:", error);
      toast.error("Something went wrong while creating the review cycle.");
    }
  };

  // Form validation
  // Form validation
  const isFormValid =
    formData.reviewCycleName.trim() !== "" &&
    formData.startDate instanceof Date &&
    !isNaN(formData.startDate.getTime()) &&
    formData.endDate instanceof Date &&
    !isNaN(formData.endDate.getTime()) &&
    !isNaN(Number(formData.daysOfGrace)) &&
    Number(formData.daysOfGrace) > 0 &&
    formData.assignedEmployees.length > 0 &&
    formData.assignedReviewer.length > 0 &&
    formData.reminderType.trim() !== "" &&
    formData.reminderFrequency.trim() !== "";

  return (
    <form className="space-y-8 pt-5 pb-10" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">New Review Cycle</h3>

      <CardLayout className="bg-white space-y-4 md:space-y-8" bg="p-4 md:p-6">
        <AppInputText
          label="Review Cycle Name"
          id="review-cycle-name"
          placeholder="Enter cycle name"
          requiredField
          onChange={(e) =>
            setFormData({ ...formData, reviewCycleName: e.target.value })
          }
          value={formData.reviewCycleName}
        />

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppDatePicker
            label="Start Date"
            requiredField
            selectedDate={formData.startDate}
            setSelectedDate={(date) =>
              setFormData({ ...formData, startDate: date })
            }
          />
          <AppDatePicker
            label="End Date"
            requiredField
            selectedDate={formData.endDate}
            setSelectedDate={(date) =>
              setFormData({ ...formData, endDate: date })
            }
          />
          <AppInputText
            label="Days of Grace"
            type="number"
            id="days-of-grace"
            placeholder="Select days of grace"
            requiredField
            onChange={(e) =>
              setFormData({ ...formData, daysOfGrace: e.target.value })
            }
            value={formData.daysOfGrace}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelectWithSearch
            label="Assign Employees"
            requiredField
            placeholder="Search and select employees"
            listItems={employees.map((emp) => ({
              label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
              value: emp.id as string,
            }))}
            onChange={(value) => handleFormChange("assignedEmployees", value)}
            isLoading={isFetching}
            onSearch={handleSearch}
            selectedItems={formData.assignedEmployees}
          />

          <AppSelectWithSearch
            label="Assign Reviewer"
            requiredField
            placeholder="Search and select reviewer"
            listItems={employees.map((emp) => ({
              label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
              value: emp.id as string,
            }))}
            onChange={(value) => handleFormChange("assignedReviewer", value)}
            isLoading={isFetching}
            onSearch={handleSearch}
            selectedItems={formData.assignedReviewer}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-10 items-center justify-between w-full">
          <AppSelect
            label="Reminder Type"
            requiredField
            placeholder="Select reminder type"
            onChange={(value) =>
              setFormData({ ...formData, reminderType: value })
            }
            listItems={[
              { label: "Sms", value: "sms" },
              { label: "Email", value: "email" },
            ]}
          />
          <AppSelect
            label="Reminder Frequency"
            requiredField
            placeholder="Select reminder frequency"
            onChange={(value) =>
              setFormData({ ...formData, reminderFrequency: value })
            }
            listItems={[
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
            ]}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-10 items-start md:items-center w-full mb-40">
          <AppSwitch
            label="Notify Employees"
            id="notify-employees"
            onChange={(value) =>
              setFormData({ ...formData, notifyEmployees: value })
            }
          />
          <AppSwitch
            label="Notify Reviewers"
            id="notify-reviewers"
            onChange={(value) =>
              setFormData({ ...formData, notifyReviewers: value })
            }
          />
        </div>
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
