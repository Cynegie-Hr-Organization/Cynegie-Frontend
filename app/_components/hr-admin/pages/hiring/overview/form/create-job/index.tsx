/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/multi-select-dropdown";
import { useRouter } from "next/navigation";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
  Editor,
  EditorProvider,
} from "react-simple-wysiwyg";

interface CreateJobFormProps {
  setScreenInView: Dispatch<SetStateAction<number>>;
}

export default function CreateJobForm({ setScreenInView }: CreateJobFormProps) {
  
  
  const router = useRouter();

  // State to store all form inputs
  const [formData, setFormData] = useState({
    requisitorName: "",
    jobTitle: "",
    department: [] as string[],
    location: [] as string[],
    jobType: "",
    jobDescription: "",
    benefits: "",
    requiredSkill: "",
    experience: "",
    qualification: "",
  });

  // Dropdown options
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
  

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("jobData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);
  
  // Update state for input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Update the dropdown handler
  const handleDropdownChange = (
    key: string,
    value: string | { value: string; label: string } | Array<string | { value: string; label: string }>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: Array.isArray(value)
        ? value.map((v) => (typeof v === "string" ? v : v.value)) // Handle multi-select
        : typeof value === "string"
        ? value // Handle simple string value
        : value.value, // Handle object with `value` property
    }));
  };

  // Save form data and navigate to the next screen
  const handleContinueClick = () => {
  console.log(formData);

  localStorage.setItem("jobData", JSON.stringify(formData)); // Save form data
  setScreenInView(2); // Move to the preview screen
};


  // Handle change for rich text editor fields
  const handleRichTextChange = (key: string, event: any) => {
  const value = event.target.value; // Get the value from the event
  setFormData((prev) => ({
    ...prev,
    [key]: value,
  }));
};

 
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
        <h1 className="text-lg text-black font-semibold">Create New Job</h1>
      </div>
      <form className="space-y-6 bg-white p-4 md:p-10 rounded-md shadow-md">
        {/* Requisitor Name */}
        <div>
          <label htmlFor="requisitorName" className="block text-sm font-medium text-gray-700">
            Requisitor Name
          </label>
          <input
            type="text"
            id="requisitorName"
            value={formData.requisitorName}
            onChange={handleInputChange}
            placeholder="Requisitor Name"
            className="mt-1 block px-2 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="mt-1 block px-2 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Department Dropdown */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <DropdownWithSearchAndMultiSelect
            id="department"
            options={departmentOptions}
            isMulti={true}
            onChange={(value) => handleDropdownChange("department", value as unknown as string[])}
          />
        </div>

        {/* Location Dropdown */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location (Optional)
          </label>
          <DropdownWithSearchAndMultiSelect
            id="location"
            options={locationOptions}
            isMulti={true}
            onChange={(value) => handleDropdownChange("location", value as unknown as string[])}
          />
        </div>

        {/* Job Type Dropdown */}
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <DropdownWithSearchAndMultiSelect
            id="jobType"
            options={jobTypeOptions}
            isMulti={false}
            onChange={(value) => handleDropdownChange("jobType", value as unknown as string[])}
          />
        </div>
</div>
        {/* Job Description */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">Job Description</p>
          <EditorProvider>
            <Editor
              value={formData.jobDescription}
              onChange={(value) => handleRichTextChange("jobDescription", value)}
              style={{ height: "200px" }}
            >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </EditorProvider>
        </div>

        {/* Benefits */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">Benefits</p>
          <EditorProvider>
            <Editor
              value={formData.benefits}
              onChange={(value) => handleRichTextChange("benefits", value)}
              style={{ height: "200px" }}
            >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </EditorProvider>
        </div>

        {/* Required Skills */}
        <div>
          <p className="mb-1 font-sans text-sm font-semibold">Required Skill</p>
          <EditorProvider>
            <Editor
              value={formData.requiredSkill}
              onChange={(value) => handleRichTextChange("requiredSkill", value)}
              style={{ height: "200px" }}
            >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </EditorProvider>
        </div>

       {/* Experience */}
<div>
  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
    Experience (in years)
          </label>
          <EditorProvider>
            
            <Editor
    value={formData.experience}
    onChange={(event) => handleRichTextChange("experience", event)}
    style={{ height: "200px" }}
  >
    <Toolbar>
      <BtnUndo />
      <BtnRedo />
      <Separator />
      <BtnBold />
      <BtnItalic />
      <BtnUnderline />
      <BtnStrikeThrough />
      <Separator />
      <BtnNumberedList />
      <BtnBulletList />
      <Separator />
      <BtnLink />
      <BtnClearFormatting />
      <HtmlButton />
      <Separator />
      <BtnStyles />
    </Toolbar>
  </Editor>
                                  </EditorProvider>

  
</div>

{/* Qualification */}
<div>
  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
    Qualification
          </label>
          <EditorProvider>
            <Editor
    value={formData.qualification}
    onChange={(event) => handleRichTextChange("qualification", event)}
    style={{ height: "200px" }}
  >
    <Toolbar>
      <BtnUndo />
      <BtnRedo />
      <Separator />
      <BtnBold />
      <BtnItalic />
      <BtnUnderline />
      <BtnStrikeThrough />
      <Separator />
      <BtnNumberedList />
      <BtnBulletList />
      <Separator />
      <BtnLink />
      <BtnClearFormatting />
      <HtmlButton />
      <Separator />
      <BtnStyles />
    </Toolbar>
  </Editor>
                        </EditorProvider>

  
</div>


        {/* Continue Button */}
        
         <div className="flex w-full flex-col md:flex-row mt-4 justify-end items-center gap-2">
        <button
          className="w-full md:w-auto px-4 md:px-20 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600"
        >
          Save & Continue Later
        </button>
        <button
          className="w-full md:w-auto px-4 md:px-20 py-2 text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleContinueClick} 
          >
          Save Changes
        </button>
      </div>
      </form>
    </div>
  );
}
