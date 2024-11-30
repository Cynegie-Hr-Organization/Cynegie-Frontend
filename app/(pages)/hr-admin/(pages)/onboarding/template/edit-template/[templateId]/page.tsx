"use client";

import Appbutton from "@/app/_components/shared/buttons";
import CardLayout from "@/app/_components/shared/cards";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type TemplateDetailsStep = "task" | "document" | "training-module";
// const TEMPLATE_STEPS: TemplateDetailsStep[] = ["task", "document", "training-module"];

const MOCK_TEMPLATE = {
  name: "New Employee Onboarding Template",
  description: "Comprehensive onboarding process for new employees",
  tasks: [
    {
      id: 1,
      title: "Complete HR Paperwork",
      details: "Analytics delivers actionable, industry-ready initiatives each time a business complete their full account. Phasellus vitae amet amet, mauris faucibus at sit. Pellentesque rhoncus adipiscing a enim, quis tortor, non etiam. Eget faucibus mattis consequat dui imperdiet scelerisque. Lorem placerat blandit ut lobortis volutpat convallis libero. Sed imperdiet dignissim ipsum quam."
    },
    {
      id: 2,
      title: "IT Equipment Setup",
      details: "Receive and set up company laptop and accessories"
    }
  ],
  documents: [
    {
      id: 1,
      title: "Employee Handbook",
      details: "Review company policies and procedures"
    },
    {
      id: 2,
      title: "Benefits Guide",
      details: "Understand company benefits and enrollment process"
    }
  ],
  trainingModules: [
    {
      id: 1,
      title: "Company Culture",
      details: "Introduction to company values and culture"
    },
    {
      id: 2,
      title: "Role-Specific Training",
      details: "Detailed training for specific job responsibilities"
    }
  ]
};

const TemplateDetailsPage = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<TemplateDetailsStep>("task");

  const taskRef = useRef<HTMLButtonElement>(null);
  const documentRef = useRef<HTMLButtonElement>(null);
  const trainingModuleRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef =
      activeStep === "task" ? taskRef :
        activeStep === "document" ? documentRef :
          trainingModuleRef;

    if (currentRef.current && containerRef.current && sliderRef.current) {
      const buttonRect = currentRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      sliderRef.current.style.width = `${buttonRect.width}px`;
      sliderRef.current.style.left = `${buttonRect.left - containerRect.left}px`;
    }
  }, [activeStep]);

  const renderActiveComponent = () => {
    switch (activeStep) {
      case "task":
        return (
          <div className="space-y-4">
            {MOCK_TEMPLATE.tasks.map((task) => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary">{task.title}</h4>
                <p className="text-gray-600 mt-2">{task.details}</p>
              </div>
            ))}
          </div>
        );
      case "document":
        return (
          <div className="space-y-4">
            {MOCK_TEMPLATE.documents.map((doc) => (
              <div key={doc.id} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary">{doc.title}</h4>
                <p className="text-gray-600 mt-2">{doc.details}</p>
              </div>
            ))}
          </div>
        );
      case "training-module":
        return (
          <div className="space-y-4">
            {MOCK_TEMPLATE.trainingModules.map((module) => (
              <div key={module.id} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary">{module.title}</h4>
                <p className="text-gray-600 mt-2">{module.details}</p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className='mb-12'>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold mb-6">Template Details</h3>
        <Appbutton
          buttonText='Edit Template details'
          className='bg-primary hidden md:block'
          onClick={() => router.push(`/hr-admin/onboarding/template/new-template`)}
        />
      </div>

      <CardLayout className='mt-6 space-y-6'>
        <div className='flex flex-col'>
          <label className='text-sm font-semibold mb-1'>
            Template Name
          </label>
          <div className="border rounded-lg p-2 bg-gray-50">
            {MOCK_TEMPLATE.name}
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-semibold mb-1'>
            Description
          </label>
          <div className="border rounded-lg p-2 bg-gray-50">
            {MOCK_TEMPLATE.description}
          </div>
        </div>
      </CardLayout>

      <CardLayout className='mt-8 space-y-6 lg:p-6' bg='bg-none lg:bg-white border-none p-0'>
        <div ref={containerRef} className='flex gap-4 text-sm mb-4 pl-4 relative w-max'>
          <div className='absolute bottom-0 w-full h-[1px] bg-gray-200' />
          <div
            ref={sliderRef}
            className={`absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out`}
          />
          <button
            ref={taskRef}
            type='button'
            data-step="task"
            className={`p-4 ${activeStep === "task" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveStep("task")}
          >
            Tasks
          </button>
          <button
            ref={documentRef}
            type='button'
            data-step="document"
            className={`p-4 ${activeStep === "document" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveStep("document")}
          >
            Documents
          </button>
          <button
            ref={trainingModuleRef}
            type='button'
            data-step="training-module"
            className={`p-4 ${activeStep === "training-module" ? "text-primary" : "text-gray-500"}`}
            onClick={() => setActiveStep("training-module")}
          >
            Training Modules
          </button>
        </div>

        <div className='mt-6'>
          {renderActiveComponent()}
        </div>
      </CardLayout>
    </div>
  );
};

export default TemplateDetailsPage; 