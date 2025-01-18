"use client";

import Modal from "@/app/_components/employee/modal";
import EmployeeLearningAndDevelopmentCourseDetails from "@/app/_components/employee/pages/learning-and-development/pages/course-details";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { route } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmployeeLearningAndDevelopmentViewCourseDetailsPage() {
  const router = useRouter();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [ratingValue, setRatingValue] = useState<string | number | undefined>();
  return (
    <>
      <EmployeeLearningAndDevelopmentCourseDetails
        onBackTextClick={() =>
          router.push(route.employee.learningDevelopment.home)
        }
        backText="Back to My Courses"
        buttonGroup={{
          leftButton: {
            type: ButtonType.outlined,
            text: "Complete",
            onClick: () => setOpenSuccessModal(true),
          },
          rightButton: { type: ButtonType.contained, text: "Enroll" },
          position: "end",
        }}
      />
      <Modal
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        hasHeading={false}
        centerImage="/icons/modal-success.svg"
        centerTitle="Congratulations! You Have Completed the Training Course"
        centerMessage="We value your feedback. Please rate and provide feedback about the course"
        buttonOne={{
          type: ButtonType.outlined,
          text: "Continue to Dashboard",
          onClick: () => router.push(route.employee.learningDevelopment.home),
        }}
        buttonTwo={{
          type: ButtonType.contained,
          text: "Give Feedback",
          onClick: () => {
            setOpenSuccessModal(false);
            setOpenFeedbackModal(true);
          },
        }}
      />
      <Modal
        open={openFeedbackModal}
        onClose={() => {
          setOpenFeedbackModal(false);
          router.push(route.employee.learningDevelopment.home);
        }}
        title="Feedback Form"
        subtitle="Evaluate Course"
        hasHeading
        form={{
          gridSpacing: 5,
          inputFields: [
            {
              name: "What did you like about the course?",
              type: "message",
              placeholder: "Enter your feedback here",
            },
            {
              name: "What can be improved?",
              type: "message",
              placeholder: "Enter your feedback here",
            },
            {
              name: "Overall Rating",
              type: "select",
              placeholder: "Select Rating",
              options: [
                { label: "Excellent", value: 2 },
                { label: "Good", value: 1 },
                { label: "Bad", value: 0 },
              ],
              value: ratingValue,
              setValue: (newValue) => setRatingValue(newValue),
            },
            {
              name: "Would you recommned the course to others",
              type: "radio",
              options: [
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ],
            },
          ],
        }}
        buttonOne={{
          type: ButtonType.outlined,
          text: "Cancel",
          onClick: () => router.push(route.employee.learningDevelopment.home),
        }}
        buttonTwo={{
          type: ButtonType.outlined,
          text: "Submit",
          onClick: () => setOpenFeedbackModal(true),
        }}
      />
    </>
  );
}
