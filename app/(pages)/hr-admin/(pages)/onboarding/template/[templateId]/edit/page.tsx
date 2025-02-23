"use client";

import { Spinner } from "@/app/_components/shared/buttons";
import AppInputText, {
  AppInputTextArea,
} from "@/app/_components/shared/input-text";
import AppTabs from "@/app/_components/shared/tabs";
import { ITemplate } from "@/app/_core/actions/hr-admin/onboarding";
import { useTemplates } from "@/app/_core/use-cases/hr-admin/useOnboarding";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import NewDocument from "./new-document";
import NewTask from "./new-task";
import NewTrainingModule from "./new-training-module";

type CreateTemplateStep = "Task" | "Document" | "Training Module";

const CreateNewTemplate = () => {
  const router = useRouter();
  const { templateId } = useParams();
  const { data, isLoading } = useTemplates();
  const { data: templates } = data ?? {};

  const template = useMemo(
    () => templates?.find((template) => template.id === templateId),
    [templates, templateId],
  );
  const [formData, setFormData] =
    useState<Partial<ITemplate | undefined>>(template);

  useEffect(() => {
    setFormData(template ?? undefined);
  }, [template]);

  const [activeTab, setActiveTab] = useState<CreateTemplateStep>("Task");
  const TEMPLATE_STEPS = [
    { label: "Task", onClick: () => setActiveTab("Task") },
    { label: "Document", onClick: () => setActiveTab("Document") },
    {
      label: "Training Module",
      onClick: () => setActiveTab("Training Module"),
    },
  ];

  const isLastStep =
    activeTab === TEMPLATE_STEPS[TEMPLATE_STEPS.length - 1].label;

  const handleNextStep = () => {
    const currentIndex = TEMPLATE_STEPS.findIndex(
      (step) => step.label === activeTab,
    );

    if (currentIndex !== -1 && currentIndex < TEMPLATE_STEPS.length - 1) {
      const nextStep = TEMPLATE_STEPS[currentIndex + 1];
      setActiveTab(nextStep.label as CreateTemplateStep);
    } else {
      router.push(`/hr-admin/onboarding/template/${templateId}`);
    }
  };

  const renderActiveComponents = {
    Task: <NewTask />,
    Document: <NewDocument />,
    "Training Module": <NewTrainingModule />,
  };

  return (
    <form className="mb-12 space-y-6">
      <h3 className="text-lg font-semibold">Edit Template</h3>

      {isLoading ? (
        <div className="flex flex-col md:flex-row items-center gap-x-2">
          <Spinner className="text-primary" />{" "}
          <p>Please hold while we fetch your initial content</p>
        </div>
      ) : (
        <>
          <div className="common-card space-y-4 !border-none">
            <div className="flex flex-col">
              <AppInputText
                id="template-name"
                // className="border outline-none rounded-lg p-2"
                label="Template Name"
                placeholder="Template Name"
                requiredField
                value={formData?.templateName ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, templateName: e.target.value })
                }
                isLoadingContent={isLoading}
              />
            </div>
            <div className="flex flex-col">
              <AppInputTextArea
                id="template-name"
                // className="border outline-none rounded-lg p-2 resize-none"
                placeholder="Description"
                label="Description"
                requiredField
                value={formData?.instructions ?? ""}
                onChange={() => {}}
                // isLoadingContent={isLoading}
              />
            </div>
          </div>

          <div className="common-card space-y-4 !border-none">
            <AppTabs tabs={TEMPLATE_STEPS} activeTabLabel={activeTab} />

            <div className="mt-6">
              {renderActiveComponents[activeTab] ?? null}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-10">
            <button
              type="button"
              className="capitalize w-full md:w-[230px] flex items-center justify-center gap-x-2 outline-none border border-gray-400 bg-white rounded-lg px-[12.33px] py-[9px] font-bold"
            >
              Save & Continue Later
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="capitalize w-full md:w-[230px] gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold"
            >
              {isLastStep ? "Publish" : "Next"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default CreateNewTemplate;
