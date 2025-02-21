"use client";

import CardLayout from "@/app/_components/shared/cards";
import NewTask from "./new-task";
import NewDocument from "./new-document";
import NewTrainingModule from "./new-training-module";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type CreateTemplateStep = "task" | "document" | "training-module";

const TEMPLATE_STEPS: CreateTemplateStep[] = [
  "task",
  "document",
  "training-module",
];

const CreateNewTemplate = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<CreateTemplateStep>("task");

  const taskRef = useRef<HTMLButtonElement>(null);
  const documentRef = useRef<HTMLButtonElement>(null);
  const trainingModuleRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef =
      activeStep === "task"
        ? taskRef
        : activeStep === "document"
          ? documentRef
          : trainingModuleRef;

    if (currentRef.current && containerRef.current && sliderRef.current) {
      const buttonRect = currentRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      sliderRef.current.style.width = `${buttonRect.width}px`;
      sliderRef.current.style.left = `${buttonRect.left - containerRect.left}px`;
    }
  }, [activeStep]);

  const renderActiveComponent = () => {
    switch (activeStep) {
      case "document":
        return <NewDocument />;
      case "training-module":
        return <NewTrainingModule />;
      default:
        return <NewTask />;
    }
  };

  const handleNextStep = () => {
    const currentIndex = TEMPLATE_STEPS.indexOf(activeStep);
    if (currentIndex < TEMPLATE_STEPS.length - 1) {
      setActiveStep(TEMPLATE_STEPS[currentIndex + 1]);
    } else {
      router.push(`/hr-admin/onboarding/template/new-template/templateId`);
    }
  };

  const isLastStep = activeStep === TEMPLATE_STEPS[TEMPLATE_STEPS.length - 1];

  return (
    <form className="mb-12">
      <h3 className="text-lg font-semibold">Create New Template</h3>

      <CardLayout className="mt-6 space-y-6">
        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Template Name
            </span>
          </label>
          <input
            name="template-name"
            type="text"
            className="border outline-none rounded-lg p-2"
            placeholder="Template Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Description
            </span>
          </label>
          <textarea
            name="template-name"
            className="border outline-none rounded-lg p-2 resize-none"
            placeholder="Description"
          />
        </div>
      </CardLayout>

      <CardLayout
        className="mt-8 space-y-6 lg:p-6"
        bg="bg-none lg:bg-white border-none p-0"
      >
        <div
          ref={containerRef}
          className="flex gap-4 text-sm mb-4 pl-4 relative w-max"
        >
          <div className="absolute bottom-0 w-full h-[1px] bg-gray-200" />
          <div
            ref={sliderRef}
            className={`absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out`}
          />
          <button
            ref={taskRef}
            type="button"
            data-step="task"
            className={`p-4 ${activeStep === "task" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveStep("task")}
          >
            Tasks
          </button>
          <button
            ref={documentRef}
            type="button"
            data-step="document"
            className={`p-4 ${activeStep === "document" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveStep("document")}
          >
            Documents
          </button>
          <button
            ref={trainingModuleRef}
            type="button"
            data-step="training-module"
            className={`p-4 ${activeStep === "training-module" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveStep("training-module")}
          >
            Training Modules
          </button>
        </div>

        <div className="mt-6">{renderActiveComponent()}</div>
      </CardLayout>

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
    </form>
  );
};

export default CreateNewTemplate;
