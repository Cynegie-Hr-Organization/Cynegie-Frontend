"use client";

import { CreateTemplateStep } from "@/app/(pages)/hr-admin/(pages)/onboarding/template/[templateId]/page";
import AppButton from "@/app/_components/shared/button";
import { Spinner } from "@/app/_components/shared/buttons";
import AppInputText, { AppInputTextArea } from "@/app/_components/shared/input-text";
import AppTabs from "@/app/_components/shared/tabs";
import { ITemplate } from "@/app/_core/actions/hr-admin/onboarding";
import { useGetTemplate, useTemplateMutations } from "@/app/_core/use-cases/hr-admin/useOnboarding";
import { AppToast } from "@/app/_hooks/toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewDocument from "./edit-document";
import NewTask from "./edit-task";
import NewTrainingModule from "./edit-training-module";




const CreateNewTemplate = () => {
  const router = useRouter();
  const { templateId } = useParams();
  const { updateTemplate, isLoading } = useTemplateMutations()
  const { data, isLoading: isFetching } = useGetTemplate(templateId as string);
  const { data: template } = data ?? {}

  const [formData, setFormData] = useState<Partial<ITemplate>>(template as Partial<ITemplate>);

  useEffect(() => {
    setFormData(template as Partial<ITemplate>)
  }, [template])

  const [activeTab, setActiveTab] = useState<CreateTemplateStep>("Task");
  const TEMPLATE_STEPS = [
    { label: "Task", onClick: () => setActiveTab('Task') },
    { label: "Document", onClick: () => setActiveTab('Document') },
    { label: "Training Module", onClick: () => setActiveTab('Training Module') }
  ];

  const isLastStep = activeTab === TEMPLATE_STEPS[TEMPLATE_STEPS.length - 1].label;

  const renderActiveComponents = {
    "Task": <NewTask />,
    "Document": <NewDocument />,
    "Training Module": <NewTrainingModule />,
  };


  const handleSave = () => {
    const { company, id, createdAt, deleted, updatedAt, createdBy, questions, ...updatedDetails } = formData ?? {}
    console.log(updatedDetails)
    updateTemplate.mutate({ id: `${templateId}`, body: updatedDetails }, {
      onSuccess: (data) => {
        AppToast.success({ title: 'Successful', message: data.message })
        router.push(`/hr-admin/onboarding/template/${templateId}`)
      },
    })
  }

  const handleNextStep = () => {
    const currentIndex = TEMPLATE_STEPS.findIndex(step => step.label === activeTab);

    if (currentIndex !== -1 && currentIndex < TEMPLATE_STEPS.length - 1) {
      const nextStep = TEMPLATE_STEPS[currentIndex + 1];
      setActiveTab(nextStep.label as CreateTemplateStep);
    } else {
      handleSave()
    }
  };


  return (
    <form className="mb-12 space-y-6">
      <h3 className="text-lg font-semibold">Template Editor</h3>


      {isFetching ? (
        <div className="flex flex-col md:flex-row items-center gap-x-2">
          <Spinner className="text-primary" /> <p>Please hold while we fetch your initial content</p>
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
                value={formData?.templateName ?? ''}
                onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
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
                value={formData?.instructions ?? ''}
                onChange={() => { }}
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

            <AppButton
              type="button"
              onClick={handleNextStep}
              isLoading={isLoading}
              label={isLastStep ? "Publish" : "Next"}
              className="bg-primary text-white"
            />
          </div>
        </>
      )}
    </form>
  );
};

export default CreateNewTemplate;
