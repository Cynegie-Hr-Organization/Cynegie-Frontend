"use client";
import React, { useState } from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/multi-select-dropdown";
import EditJobSuccessModal from "../modal";
import { Job } from "@/types";

interface EditJobPreviewProps {
  setScreenInView: React.Dispatch<React.SetStateAction<number>>;
  formData: Job | null;
}

export default function EditJobPreview({
  setScreenInView,
  formData,
}: EditJobPreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublishClick = () => {
    // Simulate publish logic here
    setIsModalOpen(true); // Open the modal
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(formData);

  const handleBackScreenSlideClick = () => {
    setScreenInView((prev) => prev - 1);
  };

  return (
    <div className="w-full ">
      <div className="flex flex-col mb-4 justify-start  gap-2">
        <div className="flex items-center gap-2">
          <Image
            src="/button-icon.svg"
            alt="Job Preview"
            width={24}
            height={24}
            className="object-contain"
            onClick={handleBackScreenSlideClick}
          />

          <h1 className="text-base  text-gray-500 font-normal">
            Back to Edit Details
          </h1>
        </div>
        <h1 className="text-lg mx-2 text-black font-semibold">Job Preview</h1>
      </div>
      <form
        className="space-y-6 bg-white p-4 md:p-10 rounded-md shadow-md"
        onSubmit={handleFormSubmit}
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
            value={formData?.requisitorName}
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
            value={formData?.title}
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
            placeholder={formData?.department}

            // Disable the dropdown for preview
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
            placeholder={formData?.jobLocation}
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
            isMulti={false} // Single select
            isDisabled={true}
            placeholder={formData?.type}
          />
        </div>

        {/* Add other fields similarly */}
        {/* Job Description */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">
            Job Description
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: formData?.description || "" }}
            className="mt-1 text-xs block  py-2"
          />
        </div>

        {/* Benefits */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">Benefits</p>
          <div
            dangerouslySetInnerHTML={{ __html: formData?.benefits || "" }}
            className="mt-1 text-xs block  py-2"
          />
        </div>

        {/* Required Skilss */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">
            Required Skills
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: formData?.requiredSkills.join(", ") || "",
            }}
            className="mt-1 text-xs block  py-2"
          />
        </div>

        {/* Qualification */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">Qualification</p>
          <div
            dangerouslySetInnerHTML={{ __html: formData?.qualification || "" }}
            className="mt-1 text-xs block  py-2"
          />
        </div>
        <div className="flex w-full flex-col md:flex-row mt-4 justify-end items-center gap-2">
          <button className="w-full md:w-auto px-4 md:px-20 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600">
            Save & Continue Later
          </button>
          <button
            className="w-full md:w-auto px-4 md:px-20 py-2 text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handlePublishClick}
          >
            Save Changes
          </button>
        </div>
      </form>

      <EditJobSuccessModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
