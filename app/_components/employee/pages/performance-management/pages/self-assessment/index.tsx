"use client";
import Modal from "@/app/_components/employee/modal";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { route } from "@/constants";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AssessmentById } from "@/app/api/services/employee/performance-mgt/types";
import {
  answerAssessmentById,
  getAssessmentById,
} from "@/app/api/services/employee/performance-mgt";

// Ensure getAssessmentById is typed properly
const fetchAssessmentById = (id: string): Promise<AssessmentById> =>
  getAssessmentById(id);

const EmployeePerforamnceManagementSelfAssessment: React.FC = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState<string | number | undefined>("");
  const [questionId, setQuestionId] = useState<string>("");

  const { data: assessment, isLoading, error, isSuccess } = useQuery({
    queryKey: ["assessment", id],
    queryFn: () => fetchAssessmentById(id),
  });

  // Handle side effects with useEffect
  useEffect(() => {
    if (isSuccess && assessment) {
      setQuestionId(assessment.data.template.questions[0].id);
      console.log("Assessment fetched successfully:", assessment);
    }
  }, [isSuccess, assessment]);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch assessment:", error);
    }
  }, [error]);

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

  if (isLoading) return <div>Loading...</div>;

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
          assessment?.data.template.questions.map((question) => ({
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