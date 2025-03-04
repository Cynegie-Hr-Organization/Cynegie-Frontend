"use client";
import Modal from "@/app/_components/employee/modal";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { route } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PerforamanceManagementManagerAssessment: React.FC = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  console.log(id);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState<string | number | undefined>("");
  const [questionId, setQuestionId] = useState<string>("");
  // const [questionId] = useState<string>("");

  const dummyAssessment = {
    data: {
      template: {
        questions: [
          {
            id: "question-1",
            question: "How would you rate your performance this quarter?",
          },
          {
            id: "question-2",
            question: "What challenges did you face during this period?",
          },
        ],
      },
    },
  };

  useEffect(() => {
    setQuestionId(dummyAssessment.data.template.questions[0].id);
  }, [dummyAssessment.data.template.questions]);

  const handleFormSubmit = () => {
    const data = {
      question: questionId,
      response: [response],
      allowComments: false,
      comment: "",
      responseCriteria: "MULTI_SELECT",
    };
    console.log("Dummy submission data:", data);
    setShowSuccessModal(true);
  };

  return (
    <Page
      title="Manager Assessment"
      smallHeading
      backText="Back to assessments"
      onBackTextClick={() =>
        router.push(route.employee.performanceManagement.home)
      }
    >
      <Form
        isCard
        gridSpacing={4}
        inputFields={dummyAssessment.data.template.questions.map(
          (question) => ({
            label: question.question,
            type: "text",
            value: response,
            setValue: setResponse,
          })
        )}
        buttonGroup={{
          leftButton: {
            type: ButtonType.outlined,
            text: "Save & Continue Later",
          },
          rightButton: {
            type: ButtonType.contained,
            text: "Submit",
            onClick: handleFormSubmit,
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

export default PerforamanceManagementManagerAssessment;
