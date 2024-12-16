"use client";

import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { InputTextArea } from "@/app/_components/shared/input-text";
import { AppSelectWithSearch } from "@/app/_components/shared/select-with-search";
import { requestFeedback } from "@/app/api/services/performance/continous-feedback";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export interface FeedbackPayload {
  recipient: string[];
  feedbackQuestions: string[];
  dueDate: string;
}

const RequestFeedback = () => {
  const { employees, isFetching, handleSearch } = useFetchEmployees();

  const [formData, setFormData] = useState<FeedbackPayload>({
    recipient: [],
    feedbackQuestions: [""],
    dueDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Make API request
      const response = await requestFeedback(formData);
      console.log(response);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Feedback request sent successfully!");
        setFormData({
          recipient: [],
          feedbackQuestions: [""],
          dueDate: "",
        });
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
      <CardLayout className="space-y-6" bg="bg-white p-4 md:p-6 lg:p-8">
        <AppSelectWithSearch
          label="Feedback Providers"
          placeholder="Select"
          onChange={(value) =>
            setFormData({
              ...formData,
              recipient: [...new Set(value)],
            })
          }
          listItems={employees.map((emp) => ({
            label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
            value: emp.id as string,
          }))}
          isLoading={isFetching}
          onSearch={handleSearch}
          selectedItems={formData.recipient}
        />

        <div className="space-y-4">
          <p className="text-sm font-semibold">Feedback Questions</p>

          {formData.feedbackQuestions.map((question, index) => (
            <div key={index} className="space-y-2">
              <InputTextArea
                label={`Question ${index + 1}`}
                placeholder="Enter your feedback question"
                value={question}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feedbackQuestions: formData.feedbackQuestions.map((q, i) =>
                      i === index ? e.target.value : q,
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
                    feedbackQuestions: formData.feedbackQuestions.filter(
                      (_, i) => i !== index,
                    ),
                  })
                }
                disabled={formData.feedbackQuestions.length === 1} // Prevent removing the last question
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
                feedbackQuestions: [...formData.feedbackQuestions, ""],
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
              formData.dueDate === "" ? new Date() : new Date(formData.dueDate)
            }
            setSelectedDate={(value) =>
              setFormData({
                ...formData,
                dueDate: value?.toISOString() ?? "",
              })
            }
          />
        </div>
      </CardLayout>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Request Feedback"}
        </button>
      </div>
    </form>
  );
};

export default RequestFeedback;
