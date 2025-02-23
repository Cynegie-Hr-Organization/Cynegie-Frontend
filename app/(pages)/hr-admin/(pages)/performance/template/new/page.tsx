/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import AppInputText, {
  AppInputTextArea,
} from "@/app/_components/shared/input-text";
import { AppSwitch } from "@/app/_components/shared/switch";
import { createTemplate } from "@/app/api/services/performance/template";
import { AppModal } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Question {
  question: string;
  description: string;
  responseCriteria: string;
  allowComments: boolean;
}

const PerformanceTemplateNewPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [templateName, setTemplateName] = useState<string>("");
  const [templateDescription, setTemplateDescription] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const mutation = useMutation({
    mutationFn: (payload: any) => createTemplate(payload),
    onSuccess: (response) => {
      console.log(response);
      if (response.status === 201) {
        toast.success(response.message || "Template created successfully!");
        queryClient.invalidateQueries({ queryKey: ["templates"] });
        router.push("/hr-admin/performance/template");
      } else if (response.statusCode === 401) {
        toast.error("Unauthorized. Please log in and try again.");
      } else {
        toast.error("Failed to create template. Please try again.");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });

  const handleAddQuestion = (newQuestion: Question) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleSubmit = () => {
    const payload = {
      templateName,
      instructions: templateDescription,
      questions,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">New Template</h3>

      <CardLayout className="space-y-6 p-4 md:p-6">
        <AppInputText
          label="Template Name"
          id="template-name"
          placeholder="Enter template name"
          onChange={(e) => setTemplateName(e.target.value)}
          value={templateName}
        />

        <AppInputTextArea
          label="Template Description"
          id="template-description"
          placeholder="Enter template description"
          onChange={(e) => setTemplateDescription(e.target.value)}
          value={templateDescription}
        />

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Questions</h4>
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <QuestionCard key={idx} question={q} />
            ))}
          </div>
          <AddQuestionModal onAddQuestion={handleAddQuestion} />
        </div>
      </CardLayout>

      <FooterButtons
        btn1Label="Save & Continue Later"
        btn2Label="Submit"
        onBtn1Click={() => console.log("Save & Continue Later")}
        onBtn2Click={handleSubmit}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
};

const QuestionCard = ({ question }: { question: Question }) => (
  <div className="common-card gap-4">
    <div className="flex flex-col gap-2 text-sm">
      <p className="font-semibold">
        {question.question || "Untitled Question"}
      </p>
      <p className="flex gap-2 items-center text-gray-500">
        {question.description || "No description provided"}
      </p>
    </div>
  </div>
);

const FooterButtons = ({
  btn1Label,
  btn2Label,
  onBtn1Click,
  onBtn2Click,
  isSubmitting,
  isDisabled,
}: {
  btn1Label: string;
  btn2Label: string;
  onBtn1Click: () => void;
  onBtn2Click: () => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}) => (
  <div className="flex flex-col md:flex-row justify-end gap-4">
    <AppButton
      label={btn1Label}
      className="btn-secondary"
      onClick={onBtn1Click}
    />
    <AppButton
      label={btn2Label}
      className="btn-primary"
      onClick={onBtn2Click}
      disabled={isDisabled}
      isLoading={isSubmitting}
    />
  </div>
);

const AddQuestionModal = ({
  onAddQuestion,
}: {
  onAddQuestion: (question: Question) => void;
}) => {
  const [question, setQuestion] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [allowComments, setAllowComments] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAdd = () => {
    onAddQuestion({
      question,
      description,
      responseCriteria: "rating",
      allowComments,
    });
    setQuestion("");
    setDescription("");
    setAllowComments(false);
  };

  const isAddDisabled = !question || !description;

  return (
    <AppModal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      trigger={
        <button
          type="button"
          className="flex gap-2 items-center text-primary text-sm font-bold"
        >
          Add Questions
        </button>
      }
      header={
        <DialogTitle className="space-y-1">
          <p className="font-semibold">Add Question</p>
          <p className="font-normal text-sm">Add and create question</p>
        </DialogTitle>
      }
      footer={
        <FooterButtons
          btn1Label="Cancel"
          btn2Label="Add Question"
          onBtn1Click={() => setIsModalOpen(false)}
          onBtn2Click={handleAdd}
          isDisabled={isAddDisabled}
        />
      }
    >
      <form className="space-y-4">
        <AppInputText
          label="Question"
          id="question"
          requiredField
          placeholder="Enter question"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />

        <AppInputTextArea
          label="Description"
          id="description"
          placeholder="Enter description"
          requiredField
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <div className="flex flex-col gap-4">
          <p className="font-semibold">Response Criteria</p>
          <div className="space-y-6">
            <div className="common-card flex justify-between items-center gap-4">
              <p className="font-semibold">Ratings</p>
            </div>
            <div className="common-card flex justify-between items-center gap-4">
              <p className="font-semibold">Allow Comments</p>
              <AppSwitch
                id="allow-comments"
                onChange={(checked) => setAllowComments(checked)}
                checked={allowComments}
              />
            </div>
          </div>
        </div>
      </form>
    </AppModal>
  );
};

export default PerformanceTemplateNewPage;
