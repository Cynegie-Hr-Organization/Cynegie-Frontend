"use client";
import Modal from "@/app/_components/employee/modal";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { route } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EmployeePerforamnceManagementSelfAssessment: React.FC = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <Page
      title="Self Assessment"
      smallHeading
      backText="Back to assessments"
      onBackTextClick={() =>
        router.push(route.employee.performanceManagement.home)
      }
    >
      <Form
        isCard
        gridSpacing={4}
        inputFields={[
          {
            name: "How is your understanding of your job responsiblities and requirements?",
            type: "message",
          },
          {
            name: "Rating",
            type: "select",
            placeholder: "Select",
            options: [
              { label: "Excellent", value: 2 },
              { label: "Good", value: 1 },
              { label: "Bad", value: 0 },
            ],
            selectValControlledFromOutside: false,
          },
          {
            name: "How do you assess the quality of your work output?",
            type: "message",
          },
          {
            name: "Rating",
            type: "select",
            placeholder: "Select",
            options: [
              { label: "Excellent", value: 2 },
              { label: "Good", value: 1 },
              { label: "Bad", value: 0 },
            ],
            selectValControlledFromOutside: false,
          },
          {
            name: "How do you effectively communicate with your team?",
            type: "message",
          },
          {
            name: "Rating",
            type: "select",
            placeholder: "Select",
            options: [
              { label: "Excellent", value: 2 },
              { label: "Good", value: 1 },
              { label: "Bad", value: 0 },
            ],
            selectValControlledFromOutside: false,
          },
        ]}
        buttonGroup={{
          leftButton: {
            type: ButtonType.outlined,
            text: "Save & Continue Later",
          },
          rightButton: {
            type: ButtonType.contained,
            text: "Submit",
            onClick: () => setShowSuccessModal(true),
          },
          position: "end",
        }}
      />
      <Modal
        {...{
          open: showSuccessModal,
          onClose: () => setShowSuccessModal(false),
          hasHeading: false,
          centerImage: "/icons/modal-success.svg",
          centerTitle: "Your form has been successfully submitted",
          centerMessage: "Your response has been sent",
          centerButton: true,
          buttonOne: {
            type: ButtonType.contained,
            text: "Continue to Dashboard",
            onClick: () =>
              router.push(route.employee.performanceManagement.home),
          },
          reduceVerticalGap: true,
        }}
      />
    </Page>
  );
};

export default EmployeePerforamnceManagementSelfAssessment;
