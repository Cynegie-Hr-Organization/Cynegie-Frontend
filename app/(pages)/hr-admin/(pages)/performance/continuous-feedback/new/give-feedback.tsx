"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppFileUpload } from "@/app/_components/shared/file-upload";
import { InputTextArea } from "@/app/_components/shared/input-text";
import AppRadio from "@/app/_components/shared/radio";
import { AppSelect } from "@/app/_components/shared/select";
import { giveFeedback } from "@/app/api/services/performance/continous-feedback";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";

export interface FeedbackPayload {
  recipient: string[];
  feedbackType: "positive" | "negative" | "neutral";
  comment: string;
  rating: number;
  attachment: string;
}

const DEFAULT_ATTACHMENT = "https://example.com/attachment.jpg";

const GiveFeedback = () => {
  const router = useRouter();
  const { employees, isFetching } = useFetchEmployees();

  const [formData, setFormData] = useState<FeedbackPayload>({
    recipient: [],
    feedbackType: "positive",
    comment: "",
    rating: 0,
    attachment: DEFAULT_ATTACHMENT,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const { recipient, feedbackType, comment, rating, attachment } = formData;

    if (
      !recipient.length ||
      !feedbackType ||
      !comment.trim() ||
      rating === 0 ||
      !attachment
    ) {
      toast.error("Please fill out all fields before submitting feedback.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await giveFeedback(formData);

      if (response.status === 201) {
        toast.success("Feedback submitted successfully:");
        router.push("/hr-admin/performance/continuous-feedback");
      } else {
        toast.error("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CardLayout className="space-y-6" bg="bg-white p-4 md:p-6 lg:p-8">
        {isFetching ? (
          <div className="md:space-y-12">
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
        ) : (
          <>
            <AppMultipleSelect
              label="Recipient"
              placeholder="Select Recipient"
              selectedValues={formData.recipient}
              onSelectionChange={(values: string[]) =>
                setFormData({
                  ...formData,
                  recipient: [...new Set(values)],
                })
              }
              items={employees.map((emp: any) => ({
                label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                value: emp.id as string,
              }))}
              width="w-full"
              noResultsText="No employees found"
            />

            <div className="space-y-2">
              <p className="text-sm font-semibold">Feedback Type</p>
              <div className="space-y-3">
                <AppRadio
                  id="positive"
                  label="Positive"
                  checked={formData.feedbackType === "positive"}
                  onChange={() => {
                    setFormData({ ...formData, feedbackType: "positive" });
                  }}
                />
                <AppRadio
                  id="negative"
                  label="Negative"
                  checked={formData.feedbackType === "negative"}
                  onChange={() => {
                    setFormData({ ...formData, feedbackType: "negative" });
                  }}
                />
                <AppRadio
                  id="neutral"
                  label="Neutral"
                  checked={formData.feedbackType === "neutral"}
                  onChange={() => {
                    setFormData({ ...formData, feedbackType: "neutral" });
                  }}
                />
              </div>
            </div>

            <InputTextArea
              label="Comment"
              id="comment"
              placeholder="Enter your feedback here"
              value={formData.comment}
              onChange={(e) => {
                setFormData({ ...formData, comment: e.target.value });
              }}
            />

            <div className="flex flex-col lg:flex-row gap-6">
              <AppSelect
                listItems={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
                label="Rating"
                placeholder="Select Rating"
                onChange={(value) => {
                  setFormData({ ...formData, rating: Number(value) });
                }}
              />
              <AppFileUpload
                label="Attachment"
                className="w-full"
                onChange={(files) => {
                  const fileUrl = files[0]
                    ? (files[0] as any).url || DEFAULT_ATTACHMENT
                    : DEFAULT_ATTACHMENT;
                  setFormData({ ...formData, attachment: fileUrl });
                }}
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
          label="Give Feedback"
          className="btn-primary w-full md:w-[230px]"
          onClick={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </>
  );
};

export default GiveFeedback;
