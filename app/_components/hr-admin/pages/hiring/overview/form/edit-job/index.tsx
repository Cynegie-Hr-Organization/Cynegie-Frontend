"use client";
import React, { useState } from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/dropdown";
import { useRouter } from "next/navigation"; 


export default function EditJobForm() {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [requiredSkill, setRequiredSkill] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
    const [qualification, setQualification] = useState<string>("");
    
    const router = useRouter();

  const handleCreateJobClick = () => {
    router.push("/hr-admin/hiring/edit-job/preview");
  };

  // Dropdown options for departments, locations, and job types
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
          alt="Create New Job"
          width={24}
          height={24}
                  className="object-contain"
                  onClick={() => router.back()}
        />
        <h1 className="text-lg text-black font-semibold">Edit Job</h1>
      </div>
      <form className="space-y-6 bg-white p-4 md:p-10 rounded-md shadow-md">
        <div>
          <label htmlFor="requisitorName" className="block text-sm font-medium text-gray-700">
            Requisitor Name
          </label>
          <input
            type="text"
            id="requisitorName"
            placeholder="Gabby Henry"
            className="mt-1 block px-2 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              placeholder="Marketing"
              className="mt-1 block px-2 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Replacing department dropdown with custom dropdown component */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <DropdownWithSearchAndMultiSelect
              id="department"
              options={departmentOptions}
                          isMulti={true}
                          placeholder="Product"
            />
          </div>

          {/* Replacing location dropdown with custom dropdown component */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location (Optional)
            </label>
            <DropdownWithSearchAndMultiSelect
              id="location"
              options={locationOptions}
                          isMulti={true}
                          placeholder="Lagos"
            />
          </div>

          {/* Replacing job type dropdown with custom dropdown component */}
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <DropdownWithSearchAndMultiSelect
              id="jobType"
              options={jobTypeOptions}
                          isMulti={false} // Single select
                          placeholder="Part-Time"
            />
          </div>
        </div>

        {/* Multiline Inputs */}
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-2 block w-full px-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Competitive salary: A salary range that reflects industry standards and experience.
Performance bonuses: Incentives tied to individual or team performance, such as sales targets or campaign results.
Health insurance: Medical, dental, and vision coverage for employees and their families."
          />
        </div>
        <div>
          <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
            Benefits
          </label>
          <textarea
            id="benefits"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            className="mt-2 block w-full px-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Enter benefits"
          />
        </div>
        <div>
          <label htmlFor="requiredSkill" className="block text-sm font-medium text-gray-700">
            Required Skill
          </label>
          <textarea
            id="requiredSkill"
            value={requiredSkill}
            onChange={(e) => setRequiredSkill(e.target.value)}
            className="mt-2 block w-full px-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Proficient in: Search Engine Optimization (SEO), Pay-Per-Click (PPC) Advertising, Social Media Marketing, Email Marketing, Content Marketing."
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <textarea
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-2 block w-full px-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Managed social media campaigns across Facebook, Twitter, and Instagram, resulting in 25% increase in followers.
Created and executed emails marketing campaigns with open rates of 20% and conversion rates of 15%.
Developed and implemented SEO strategies, resulting in 50% increase in organic websites traffic."
          />
        </div>
        <div>
          <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
            Qualification
          </label>
          <textarea
            id="qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="mt-2 block w-full px-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Bachelor’s degree in Marketing: A degree in marketing or related field, such as business, communications, or advertising.
Certified Marketing Professional (CMP): A certification offered by the American Marketing Association (AMA) that demonstrates expertise in 
marketing principles and practices.
Google Analytics Certification: A certification offered by Google that demonstrates expertise in web analytics and data analysis."
          />
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
              onClick={handleCreateJobClick}

              >
    Continue
  </button>
</div>

    </div>
  );
}
