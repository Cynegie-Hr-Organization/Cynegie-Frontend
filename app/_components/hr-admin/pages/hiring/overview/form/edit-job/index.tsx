/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/dropdown";
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

interface EditJobFormProps {
  setScreenInView: Dispatch<SetStateAction<number>>;
}

export default function EditJobForm({ setScreenInView }: EditJobFormProps) {
  // Dummy data for existing record (replace this with actual data from an API)
  const existingJob = {
    requisitorName: "Gabby Henry",
    jobTitle: "Marketing",
    department: ["Engineering", "Marketing"],
    location: ["Lagos"],
    jobType: "Part-Time",
    jobDescription: "<p>Develop marketing strategies and manage campaigns.</p>",
    benefits: "Health Insurance, Retirement Plan",
    requiredSkill: "<p>Expert in digital marketing and SEO.</p>",
    experience: "<p>3+ years of experience in marketing.</p>",
    qualification: "<p>Bachelor's Degree in Marketing or related field.</p>",
  };

  // State for form data
  const [jobDescription, setJobDescription] = useState<string>(existingJob.jobDescription);
  const [benefits, setBenefits] = useState<string>(existingJob.benefits);
  const [requiredSkill, setRequiredSkill] = useState<string>(existingJob.requiredSkill);
  const [experience, setExperience] = useState<string>(existingJob.experience);
  const [qualification, setQualification] = useState<string>(existingJob.qualification);

  const router = useRouter();

  

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

  // Handle change for rich text editor fields
  const handleRichTextChange = (key: string, value: any) => {
    switch (key) {
      case "jobDescription":
        setJobDescription(value);
        break;
      case "requiredSkill":
        setRequiredSkill(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "qualification":
        setQualification(value);
        break;
      default:
        break;
    }
  };
    
   const handleContinueClick = () => {
  const formData = {
    requisitorName: existingJob.requisitorName,  
    jobTitle: existingJob.jobTitle,
    department: existingJob.department,
    location: existingJob.location,
    jobType: existingJob.jobType,
    jobDescription,  
    benefits,
    requiredSkill, 
    experience,  
    qualification,  
  };

  localStorage.setItem("editFormData", JSON.stringify(formData));

  setScreenInView(2); 
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
            placeholder={existingJob.requisitorName}
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
              placeholder={existingJob.jobTitle}
              className="mt-1 block px-2 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              placeholder={existingJob.department.join(", ")}
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
              placeholder={existingJob.location.join(", ")}
            />
          </div>

          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <DropdownWithSearchAndMultiSelect
              id="jobType"
              options={jobTypeOptions}
              isMulti={false}
              placeholder={existingJob.jobType}
            />
          </div>
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <EditorProvider>
            <Editor
              value={jobDescription}
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
            placeholder={existingJob.benefits}
          />
        </div>

        <div>
          <label htmlFor="requiredSkill" className="block text-sm font-medium text-gray-700">
            Required Skill
          </label>
          <EditorProvider>
            <Editor
              value={requiredSkill}
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

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <EditorProvider>
            <Editor
              value={experience}
              onChange={(value) => handleRichTextChange("experience", value)}
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

        <div>
          <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
            Qualification
          </label>
          <EditorProvider>
            <Editor
              value={qualification}
              onChange={(value) => handleRichTextChange("qualification", value)}
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
          Continue
        </button>
      </div>
      </form>
    </div>
  );
}
