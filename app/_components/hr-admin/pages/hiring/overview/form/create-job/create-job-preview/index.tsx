"use client";
import React from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/dropdown";
import { useRouter } from "next/navigation";

export default function JobPreview() {
 
    const router = useRouter();

    const departmentOptions = [
    { value: "HR", label: "HR" },
    { value: "Engineering", label: "Engineering" },
    { value: "Marketing", label: "Marketing" },
  ];

  const locationOptions = [
    { value: "Abuja", label: "Abuja" },
    { value: "Kano", label: "Kano" },
    { value: "Lagos", label: "Lagos" },
    { value: "Enugu", label: "Enugu" },
  ];

  const jobTypeOptions = [
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
    { value: "Contract", label: "Contract" },
  ];

  return (
    <div className="p-[15px] md:p-[30px]">
      <div className="flex mb-4 justify-start items-center gap-2">
        <Image
          src="/button-icon.svg"
          alt="Job Preview"
          width={24}
          height={24}
          className="object-contain"
          onClick={() => router.back()}
        />
        <h1 className="text-lg text-black font-semibold">Job Preview</h1>
      </div>
      <form className="space-y-6 bg-white p-4 md:p-10 rounded-md shadow-md">
        <div>
          <label htmlFor="requisitorName" className="block text-sm font-medium text-gray-700">
            Requisitor Name
          </label>
          <input
            type="text"
            id="requisitorName"
            value="John Doe" // Set value as placeholder for preview
            disabled
            className="mt-1 block px-2 py-2 border w-full rounded-md bg-gray-200 border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value="Software Developer" // Set value as placeholder for preview
              disabled
              className="mt-1 block px-2 py-2 border w-full rounded-md bg-gray-200 border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <DropdownWithSearchAndMultiSelect
              id="department"
              options={departmentOptions}
                          isMulti={true}
                          isDisabled={true}
                                                    placeholder="Product"

              // Disable the dropdown for preview
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location (Optional)
            </label>
            <DropdownWithSearchAndMultiSelect
              id="location"
              options={locationOptions}
              isMulti={true}
                          isDisabled={true}
                                                    placeholder="Lagos"

            />
          </div>

          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <DropdownWithSearchAndMultiSelect
              id="jobType"
              options={jobTypeOptions}
              isMulti={false} // Single select
                          isDisabled={true}
                          placeholder="Part Time"
            />
          </div>
        </div>

         <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
                  <p className="mt-1 text-xs block  py-2 text-gray-900 ">We are seeking a highly skilled and experience marketing manager to lead our marketing team. <br />
                      The successful candidate will be responsible for developing and implementing comprehensive marketing strategies to drive business growth, increase brand awareness, and generate leads.</p>
        </div>

        <div>
          <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
            Benefits
          </label>
                  <p className="mt-1 text-xs block  py-2 text-gray-900  ">
                      <span className="font-semibold">Competitive salary:</span> A salary range that reflects industry standards and experience. <br />
<span className="font-semibold">Performance bonuses:</span> Incentives tied to individual or team performance, such as sales targets or campaign results. <br />
<span className="font-semibold">Health insurance:</span> Medical, dental, and vision coverage for employees and their families.</p>
        </div>

        <div>
          <label htmlFor="requiredSkill" className="block text-sm font-medium text-gray-700">
            Required Skill
          </label>
          <p className="mt-1 text-xs block  py-2 text-gray-900 ">Proficient in: Search Engine Optimization (SEO), Pay-Per-Click (PPC) Advertising, Social Media Marketing, Email Marketing, Content Marketing.</p>
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <p className="mt-1 text-xs block  py-2 text-gray-900 ">Managed social media campaigns across Facebook, Twitter, and Instagram, resulting in 25% increase in followers. <br />
Created and executed emails marketing campaigns with open rates of 20% and conversion rates of 15%. <br />
Developed and implemented SEO strategies, resulting in 50% increase in organic websites traffic.</p>
        </div>

        <div>
          <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
            Qualification
          </label>
          <p className="mt-1 text-xs block  py-2 text-gray-900 ">Bachelor’s degree in Marketing: A degree in marketing or related field, such as business, communications, or advertising.
Certified Marketing Professional (CMP): <br />A certification offered by the American Marketing Association (AMA) that demonstrates expertise in marketing principles and practices.<br />Google Analytics Certification: A certification offered by Google that demonstrates expertise in web analytics and data analysis.</p>
        </div>
      </form>

      <div className="flex w-full flex-col md:flex-row mt-4 justify-end items-center gap-2">
        <button
          className="w-full md:w-auto px-4 md:px-20 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600"
        >
          Save & Continue Later
        </button>
        <button
          className="w-full md:w-auto px-4 md:px-20 py-2 text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
