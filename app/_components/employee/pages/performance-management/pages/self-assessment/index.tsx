"use client";
import Modal from "@/app/_components/employee/modal";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { route } from "@/constants";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { AssessmentById } from "@/app/api/services/employee/performance-mgt/types";
import {
  answerAssessmentById,
  getAssessmentById,
} from "@/app/api/services/employee/performance-mgt";

const EmployeePerforamnceManagementSelfAssessment: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentById | null>(null);
  const [response, setResponse] = useState<string | number | undefined>("");
  const [questionId, setQuestionId] = useState<string>("");

  const fetchAssessmentMutation = useMutation({
    mutationFn: () => getAssessmentById(id),
    onSuccess: (response) => {
      setAssessment(response.data);
      setQuestionId(response.data.template.questions[0].id);
      console.log("Assessment fetched successfully:", response);
    },
    onError: (error) => {
      console.error("Failed to fetch assessment:", error);
    },
  });

  useEffect(() => {
    fetchAssessmentMutation.mutate();
  }, [id, fetchAssessmentMutation]);

  const answerAssessmentMutation = useMutation({
    mutationFn: (data: any) => answerAssessmentById(data),
    onSuccess: (data) => {
      console.log("Assessment answered successfully:", data);
      setShowSuccessModal(true);
    },
    onError: (error) => {
      console.error("Failed to answer assessment:", error);
    },
  });

  const handleFormSubmit = () => {
    const data = {
      question: questionId,
      response: [response],
      allowComments: false,
      comment: "",
      responseCriteria: "MULTI_SELECT",
    };

    console.log("Data:", data);
    answerAssessmentMutation.mutate(data);
  };

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
        inputFields={
          assessment?.template.questions.map((question) => ({
            label: question.question,
            type: "text",
            value: response,
            setValue: setResponse,
          })) || []
        }
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

export default EmployeePerforamnceManagementSelfAssessment;
