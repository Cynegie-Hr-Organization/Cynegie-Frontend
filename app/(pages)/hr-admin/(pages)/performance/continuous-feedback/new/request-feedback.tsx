"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import { AppInputTextArea } from "@/app/_components/shared/input-text";
import { requestFeedback } from "@/app/api/services/performance/continous-feedback";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

export interface FeedbackPayload {
  feedbackProviders: string[];
  employeeId: string;
  feedbackQuestion: string[];
  dueDate: string;
}

const RequestFeedback = () => {
  const router = useRouter();
  const { employees, isFetching } = useFetchEmployees();

  const [formData, setFormData] = useState<FeedbackPayload>({
    feedbackProviders: [],
    employeeId: "",
    feedbackQuestion: [""],
    dueDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { feedbackProviders, employeeId, feedbackQuestion, dueDate } =
      formData;

    if (
      !feedbackProviders.length ||
      !employeeId ||
      feedbackQuestion.some((q) => !q.trim()) ||
      !dueDate
    ) {
      toast.error("Please fill out all fields before submitting feedback.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await requestFeedback({
        ...formData,
        feedbackQuestion: formData.feedbackQuestion[0],
      });

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Feedback request sent successfully!");
        setFormData({
          feedbackProviders: [],
          feedbackQuestion: [""],
          dueDate: "",
          employeeId: "",
        });
        router.push("/hr-admin/performance/continuous-feedback");
      } else {
        toast.error("Failed to send feedback request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback request:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardLayout className="space-y-6 mb-6" bg="bg-white p-4 md:p-6 lg:p-8">
        {isFetching ? (
          <div className="md:space-y-12">
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
        ) : (
          <>
            <AppMultipleSelect
              label="Feedback Providers"
              placeholder="Select"
              items={employees.map((emp: any) => ({
                label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                value: emp.id as string,
              }))}
              selectedValues={formData.feedbackProviders}
              onSelectionChange={(values: string[]) =>
                setFormData({
                  ...formData,
                  feedbackProviders: [...new Set(values)],
                })
              }
              width="w-full"
              noResultsText="No Feedback Providers found"
            />

            <AppMultipleSelect
              label="Employee"
              placeholder="Select Employee"
              items={employees.map((emp: any) => ({
                label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                value: emp.id as string,
              }))}
              selectedValues={formData.employeeId ? [formData.employeeId] : []}
              onSelectionChange={(values: string[]) =>
                setFormData({
                  ...formData,
                  employeeId: values[0] ?? "",
                })
              }
              width="w-full"
              noResultsText="No Employees found"
            />

            <div className="space-y-4">
              <p className="text-sm font-semibold">Feedback Questions</p>

              {formData.feedbackQuestion.map((question, index) => (
                <div key={index} className="space-y-2">
                  <AppInputTextArea
                    label={`Question ${index + 1}`}
                    placeholder="Enter your feedback question"
                    value={question}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        feedbackQuestion: formData.feedbackQuestion.map(
                          (q, i) => (i === index ? e.target.value : q),
                        ),
                      })
                    }
                    id={`question-${index}`}
                  />
                  <button
                    type="button"
                    className="text-red-500 text-sm"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        feedbackQuestion: formData.feedbackQuestion.filter(
                          (_, i) => i !== index,
                        ),
                      })
                    }
                    disabled={formData.feedbackQuestion.length === 1}
                  >
                    Remove Question
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="flex items-center gap-x-2 text-primary text-sm"
                onClick={() =>
                  setFormData({
                    ...formData,
                    feedbackQuestion: [...formData.feedbackQuestion, ""],
                  })
                }
              >
                Add Question <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 w-full md:w-[calc(50%+16px)]">
              <AppDatePicker
                label="Due Date"
                placeholder="Select Due Date"
                selectedDate={
                  formData.dueDate === ""
                    ? new Date()
                    : new Date(formData.dueDate)
                }
                setSelectedDate={(value) =>
                  setFormData({
                    ...formData,
                    dueDate: value?.toISOString() ?? "",
                  })
                }
              />
            </div>
          </>
        )}
      </CardLayout>

      <div className="flex flex-col md:flex-row justify-end gap-4">
        <AppButton
          label="Save & Continue Later"
          className="btn-secondary w-full md:w-[230px]"
        />
        <AppButton
          label={isSubmitting ? "Submitting..." : "Request Feedback"}
          className="btn-primary"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default RequestFeedback;
