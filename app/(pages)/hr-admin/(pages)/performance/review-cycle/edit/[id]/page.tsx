/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppSelect } from "@/app/_components/shared/select";
import { AppSwitch } from "@/app/_components/shared/switch";
import useFetchEmployees from "@/utils/usefetchEmployees";
import InputText from "@/app/_components/shared/input-text";
import {
  editReviewCycle,
  fetchReviewCycleById,
} from "@/app/api/services/performance/review cycle";
import { toast } from "react-toastify";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";

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

const EditReviewCycle = () => {
  const router = useRouter();
  const { id } = useParams();
  const reviewId = typeof id === "string" ? id : "default-id";

  const { employees } = useFetchEmployees();

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

  useEffect(() => {
    const fetchReviewCycle = async () => {
      try {
        const response = await fetchReviewCycleById(reviewId);
        const data = response?.data;
        console.log(data);

        // Extract employees with `deletedAt` null
        const availableEmployeeIds = (data.employees || [])
          .filter((employee: any) => employee.deletedAt === null)
          .map((employee: any) => employee.id);

        console.log("Available Employee IDs:", availableEmployeeIds);

        if (data) {
          setFormData({
            reviewCycleName: data.cycleName,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            daysOfGrace: String(data.daysOfGrace),
            assignedEmployees: availableEmployeeIds,
            assignedReviewer: data.reviewers,
            reminderType: data.reminderType,
            reminderFrequency: data.reminderFrequency,
            notifyEmployees: data.notifyEmployees,
            notifyReviewers: data.notifyReviewers,
          });
        }
      } catch (error) {
        console.error("Error fetching review cycle:", error);
        toast.error("Failed to load review cycle data.");
      }
    };

    if (reviewId) {
      fetchReviewCycle();
    }
  }, [reviewId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    console.log(payload);

    try {
      const response = await editReviewCycle(reviewId, payload);
      console.log(response);
      if (response?.status === 200) {
        toast.success("Review cycle updated successfully.");
        setTimeout(() => {
          router.push("/hr-admin/performance/overview");
        }, 2000);
      } else {
        toast.error("There was an error updating the review cycle.");
      }
    } catch (error) {
      console.error("Error updating review cycle:", error);
      toast.error("Something went wrong while updating the review cycle.");
    }
  };

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
      <h3 className="text-lg font-semibold">Edit Review Cycle</h3>

      <CardLayout className="bg-white space-y-4 md:space-y-8" bg="p-4 md:p-6">
        <InputText
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
          <InputText
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
          <AppMultipleSelect
            label="Assign Employees"
            placeholder="Assign Employees"
            items={employees.map((emp) => ({
              label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
              value: emp.id as string,
            }))}
            selectedValues={formData.assignedEmployees}
            onSelectionChange={(values: string[]) =>
              setFormData({
                ...formData,
                assignedEmployees: [...new Set(values)],
              })
            }
            width="w-full"
            noResultsText="No employees found"
          />

          <AppMultipleSelect
            label="Assign Reviewer"
            placeholder="Assign Reviewer"
            items={employees.map((emp) => ({
              label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
              value: emp.id as string,
            }))}
            selectedValues={formData.assignedReviewer}
            onSelectionChange={(values: string[]) =>
              setFormData({
                ...formData,
                assignedReviewer: [...new Set(values)],
              })
            }
            width="w-full"
            noResultsText="No reviewers found"
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
          disabled={!isFormValid}
          className="transition-all duration-300 bg-primary text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:border disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Save & Continue Later
        </button>

        <button
          type="submit"
          disabled={!isFormValid}
          className="transition-all duration-300 bg-primary text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:border disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 font-semibold"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditReviewCycle;
