"use client";
import React, { useState } from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/multi-select-dropdown";
import CreateJobSuccessModal from "../modal";
import { createJob } from "@/app/api/services/job";
import useJobStore from "@/utils/zustand/jobstore";

interface JobPreviewProps {
  setScreenInView: React.Dispatch<React.SetStateAction<number>>;
}

export default function JobPreview({ setScreenInView }: JobPreviewProps) {
  const { jobData } = useJobStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleBackScreenSlideClick = () => {
    setScreenInView((prev) => prev - 1);
  };

  const handlePublishClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobData) return;

    console.log(jobData);

    setIsPublishing(true);
    try {
      const response = await createJob(jobData);
      console.log(response);

      if (response?.status === 201) {
        localStorage.removeItem("jobData");
        setIsModalOpen(true);
      } else {
        console.error(
          "Failed to create job:",
          response?.data || "Unknown error",
        );
      }
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle loading state
  if (!jobData) {
    return (
      <div className="p-[15px] md:p-[30px]">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex mb-4 justify-start items-center gap-2">
        <Image
          src="/button-icon.svg"
          alt="Job Preview"
          width={24}
          height={24}
          className="object-contain cursor-pointer"
          onClick={handleBackScreenSlideClick}
        />
        <h1 className="text-lg text-black font-semibold">Job Preview</h1>
      </div>
      <form
        className="space-y-6 bg-white p-4 md:p-10 rounded-md shadow-md"
        onSubmit={handlePublishClick}
      >
        <div>
          <label
            htmlFor="requisitorName"
            className="block text-sm font-medium text-gray-700"
          >
            Requisitor Name
          </label>
          <input
            type="text"
            id="requisitorName"
            value={jobData.requisitorName}
            disabled
            className="mt-1 block px-2 py-2 border w-full rounded-md bg-gray-200 border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobData.title}
            disabled
            className="mt-1 block px-2 py-2 border w-full rounded-md bg-gray-200 border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department
          </label>
          <DropdownWithSearchAndMultiSelect
            id="department"
            isMulti={true}
            isDisabled={true}
            placeholder={jobData.department}
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <DropdownWithSearchAndMultiSelect
            id="location"
            isMulti={true}
            isDisabled={true}
            placeholder={jobData.jobLocation}
          />
        </div>

        <div>
          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <DropdownWithSearchAndMultiSelect
            id="jobType"
            isMulti={false}
            isDisabled={true}
            placeholder={jobData.type}
          />
        </div>

        {/* Job Description */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">
            Job Description
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: jobData.description }}
            className="mt-1 text-xs block py-2"
          />
        </div>

        {/* Benefits */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">Benefits</p>
          <div
            dangerouslySetInnerHTML={{ __html: jobData.benefits }}
            className="mt-1 text-xs block py-2"
          />
        </div>

        {/* Required Skills */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">
            Required Skills
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: Array.isArray(jobData.requiredSkills)
                ? jobData.requiredSkills.join(", ")
                : jobData.requiredSkills || "",
            }}
            className="mt-1 text-xs block py-2"
          />
        </div>

        {/* Qualification */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">Qualification</p>
          <div
            dangerouslySetInnerHTML={{ __html: jobData.qualification }}
            className="mt-1 text-xs block py-2"
          />
        </div>

        <div className="flex w-full flex-col md:flex-row mt-4 justify-end items-center gap-2">
          <button className="w-full md:w-auto px-4 md:px-20 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600">
            Save & Continue Later
          </button>
          <button
            type="submit"
            className={`w-full md:w-auto px-4 md:px-20 py-2 text-base font-semibold rounded-lg ${
              isPublishing
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#0035C3] text-white hover:bg-blue-600 focus:outline-none"
            }`}
            disabled={isPublishing}
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <CreateJobSuccessModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
