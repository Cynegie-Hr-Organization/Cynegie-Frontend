"use client";


import { ReusableSelect } from "@/app/(pages)/hr-admin/(pages)/onboarding/template/[templateId]/edit/components/ReusableSelect";
import Appbutton, { Spinner } from "@/app/_components/shared/buttons";
import CardLayout from "@/app/_components/shared/cards";
import { useTemplates } from "@/app/_core/use-cases/hr-admin/useOnboarding";
import { Avatar } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { LuClock } from "react-icons/lu";

type TemplateDetailsStep = "task" | "document" | "training-module";



const TemplateDetailsPage = () => {
  const { data, isLoading } = useTemplates();
  const { data: templates } = data ?? {}
  const { templateId } = useParams();
  const router = useRouter();

  const templateDetails = useMemo(() => templates?.find((template) => template.id === templateId), [templates, templateId])
  console.log(templateDetails)

  const MOCK_TEMPLATE = {
    name: "New Employee Onboarding Template",
    description: "Comprehensive onboarding process for new employees",
    tasks: [
      {
        id: 1,
        title: "Complete HR Paperwork",
        details:
          "Analytics delivers actionable, industry-ready initiatives each time a business complete their full account. Phasellus vitae amet amet, mauris faucibus at sit. Pellentesque rhoncus adipiscing a enim, quis tortor, non etiam. Eget faucibus mattis consequat dui imperdiet scelerisque. Lorem placerat blandit ut lobortis volutpat convallis libero. Sed imperdiet dignissim ipsum quam.",
      },
      {
        id: 2,
        title: "IT Equipment Setup",
        details: "Receive and set up company laptop and accessories",
      },
    ],
    documents: [
      {
        id: 1,
        title: "Employee Handbook",
        details: "Review company policies and procedures",
      },
      {
        id: 2,
        title: "Benefits Guide",
        details: "Understand company benefits and enrollment process",
      },
    ],
    trainingModules: [
      {
        id: 1,
        title: "Company Culture",
        details: "Introduction to company values and culture",
      },
      {
        id: 2,
        title: "Role-Specific Training",
        details: "Detailed training for specific job responsibilities",
      },
    ],
  };

  const [activeStep, setActiveStep] = useState<TemplateDetailsStep>("task");

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
      case "task":
        return <ViewTask />;
      case "document":
        return <ViewDocument />;
      case "training-module":
        return <ViewTrainingModule />;
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold mb-6">Template Details</h3>
        <Appbutton
          buttonText="Edit Template details"
          className="bg-primary hidden md:block"
          onClick={() => router.push(`/hr-admin/onboarding/template/${templateId}/edit`)}
        />
      </div>

      {isLoading ? (
        <div className="common-card flex items-center justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <>
          <CardLayout className="mt-6 space-y-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Template Name</label>
              <div className="border rounded-lg p-2 bg-gray-50">
                {MOCK_TEMPLATE.name}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Description</label>
              <div className="border rounded-lg p-2 bg-gray-50">
                {MOCK_TEMPLATE.description}
              </div>
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
        </>)}
    </div>
  );
};

const ViewTask = () => {
  return (
    <div className="p-0 md:py-12 md:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Set Up Workstation</p>
        <ReusableSelect
          plainSelect
          placeholder="To Do"
          items={["To do", "In progress", "Completed"]}
          triggerClassName="w-max gap-x-2 border-none bg-black text-white"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between text-xs text-[#94A3B8]">
        <div className="space-y-3">
          <p className="">ASSIGNEED TO</p>
          <div className="flex">
            {[
              "/image/persons/person-1.png",
              "/image/persons/person-2.png",
              "/image/persons/person-1.png",
            ].map((imageSrc, index) => (
              <Avatar
                key={index}
                src={imageSrc}
                className="first:ml-0 -ml-1 w-[24.71px] h-[24.71px]"
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p>CREATED</p>
          <div className="flex w-max items-center gap-x-2 bg-gray-300 text-[#0F172A] p-2 rounded-lg text-xs">
            <CiCalendarDate size={15} className="font-bold" />
            Nov 29, 2021
          </div>
        </div>
        <div className="space-y-3">
          <p>LABELS</p>
          <ReusableSelect
            plainSelect
            placeholder="IT Support"
            items={["IT Support", "HR Support", "Finance Support"]}
            triggerClassName="border-none p-0 text-cyan-400 flex items-center justify-start gap-x-2 w-max"
          />
        </div>
        <div className="space-y-3 text-sm">
          <p>DUE DATE</p>
          <div className="flex items-center gap-x-2 py-1 text-nowrap">
            <span className="border border-dashed rounded-full p-1 text-[#64748B] border-[#64748B]">
              <BsPerson />
            </span>
            No due date
          </div>
        </div>
      </div>

      <div className="text-sm space-y-2">
        <p className="block font-semibold">Description</p>
        <p className="text-[#64748B]">
          Analytics delivers actionable, industry-ready initiatives each time a
          business complete their full account. Phasellus vitae amet amet,
          mauris faucibus at sit. Pellentesque rhoncus adipiscing a enim, quis
          tortor, non etiam. Eget faucibus mattis consequat dui imperdiet
          scelerisque. Lorem placerat blandit ut lobortis volutpat convallis
          libero. Sed imperdiet dignissim ipsum quam.
        </p>
      </div>

      <div className="space-y-2 text-sm">
        <p className="font-semibold">Activity</p>

        <div className="flex gap-x-4">
          <Avatar src="/image/persons/person-1.png" />
          <label htmlFor="comment" className="hidden"></label>
          <div className="w-full space-y-2">
            <div className="flex items-center gap-x-2">
              <p className="font-semibold text-sm">Andre Voleavaou</p>
              <span className="flex items-center justify-center gap-x-1 text-gray-400">
                <LuClock />
                <p className="text-xs">10 hours ago</p>
              </span>
            </div>
            <p className="font-normal">
              Almost there <span className="text-primary">@Angela</span>, can
              you see the comments in Figma now!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewDocument = () => {
  return (
    <div className="p-6 mt-5 space-y-6">
      <div className="space-y-2">
        <p className="">Document Name</p>
        <p className="py-2 font-bold">Employee Handbook</p>
      </div>

      <div className="space-y-2">
        <p className="">Document Description</p>
        <p className="text-xs">
          Analytics delivers actionable, industry-ready initiatives each time a
          business complete their full account. Phasellus vitae amet amet,
          mauris faucibus at sit. Pellentesque rhoncus adipiscing a enim, quis
          tortor, non etiam. Eget faucibus mattis consequat dui imperdiet
          scelerisque. Lorem placerat blandit ut lobortis volutpat convallis
          libero. Sed imperdiet dignissim ipsum quam.
        </p>
      </div>

      <div className="space-y-2">
        <p className="">Document Uploaded</p>
        <p className="text-xs text-primary">employee-handbook.pdf</p>
      </div>

      <div className="space-y-2">
        <p className="">URL Link</p>
        <p className="text-xs text-cyan-500 underline">www.document.com</p>
      </div>
    </div>
  );
};

const ViewTrainingModule = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Cybersecurity Awareness Training</p>
        <ReusableSelect
          plainSelect
          placeholder="To Do"
          items={["To do", "In progress", "Completed"]}
          triggerClassName="w-max gap-x-2 border-none bg-black text-white"
        />
      </div>

      <div className="border border-[#F1F5F9] rounded-xl mt-8">
        <p className="px-4 py-2 font-bold">Details</p>
        <hr className="border-t border-[#F1F5F9]" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between px-4 py-6 text-xs text-[#94A3B8]">
          <div className="space-y-3">
            <p className="">ASSIGNEED TO</p>
            <div className="flex">
              {[
                "/image/persons/person-1.png",
                "/image/persons/person-2.png",
                "/image/persons/person-1.png",
              ].map((imageSrc, index) => (
                <Avatar
                  key={index}
                  src={imageSrc}
                  sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3 flex">
            <p>CREATED</p>
            <div className="flex text-nowrap items-center gap-x-2 bg-[#F8FAFC] text-[#0F172A] p-2 rounded-lg text-sm">
              <CiCalendarDate className="font-bold" />
              Nov 29, 2021
            </div>
          </div>
          <div className="space-y-3">
            <p>LABELS</p>
            <ReusableSelect
              plainSelect
              placeholder="IT Support"
              items={["IT Support", "HR Support", "Finance Support"]}
              triggerClassName="border-none p-0 text-cyan-400 flex items-center justify-start gap-x-2 w-max"
            />
          </div>
          <div className="space-y-3 text-sm">
            <p>DUE DATE</p>
            <div className="flex items-center justify-center gap-x-2 py-1 text-nowrap">
              <span className="border border-dashed rounded-full p-1 text-[#64748B] border-[#64748B]">
                <BsPerson />
              </span>
              No due date
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TemplateDetailsPage;
