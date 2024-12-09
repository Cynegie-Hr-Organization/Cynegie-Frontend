/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/multi-select-dropdown";
import { useRouter } from "next/navigation";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CreateJobProps } from "@/types";
import dynamic from "next/dynamic";
import useJobStore from "@/utils/zustand/jobstore";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

interface CreateJobFormProps {
  setScreenInView: Dispatch<SetStateAction<number>>;
}

export default function CreateJobForm({ setScreenInView }: CreateJobFormProps) {
  const router = useRouter();

  const { setJobData } = useJobStore();

  const initialState = {
    requisitorName: "",
    title: "",
    department: "",
    jobLocation: "",
    benefits: "",
    description: "",
    experience: "",
    qualification: "",
    requiredSkills: [],
    type: "",
  };

  const [formData, setFormData] = useState<CreateJobProps>(initialState);

  const [editorState, setEditorState] = useState({
    description: EditorState.createEmpty(),
    benefits: EditorState.createEmpty(),
    requiredSkills: EditorState.createEmpty(),
    experience: EditorState.createEmpty(),
    qualification: EditorState.createEmpty(),
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
    { value: "Full-time", label: "Full-Time" },
    { value: "Part-time", label: "Part-Time" },
    { value: "Contract", label: "Contract" },
  ];

  // Update state for input fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Update dropdown handler
  const handleDropdownChange = (
    key: string,
    value:
      | string
      | { value: string; label: string }
      | Array<string | { value: string; label: string }>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: Array.isArray(value)
        ? value.map((v) => (typeof v === "string" ? v : v.value))
        : typeof value === "string"
          ? value
          : value.value,
    }));
  };

  const handleEditorChange = (key: string, state: EditorState) => {
    setEditorState((prev) => ({ ...prev, [key]: state }));
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));

    // For requiredSkills, split by commas and trim extra spaces
    if (key === "requiredSkills") {
      const skillsArray = html
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
      setFormData((prev) => ({ ...prev, [key]: skillsArray }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: html }));
    }
  };

  // Save form data to the store and navigate to the preview screen
  const handleContinueClick = () => {
    setJobData(formData);
    setScreenInView(2); // Move to the preview screen
  };

  return (
    <div>
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
          <label
            htmlFor="requisitorName"
            className="block text-sm font-medium text-gray-700"
          >
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
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="mt-1 block px-2 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Department Dropdown */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <DropdownWithSearchAndMultiSelect
              id="department"
              options={departmentOptions}
              isMulti={false}
              onChange={(value) =>
                handleDropdownChange("department", value as unknown as string)
              }
            />
          </div>

          {/* Location Dropdown */}
          <div>
            <label
              htmlFor="jobLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Location (Optional)
            </label>
            <DropdownWithSearchAndMultiSelect
              id="jobLocation"
              options={locationOptions}
              isMulti={false}
              onChange={(value) =>
                handleDropdownChange("jobLocation", value as unknown as string)
              }
            />
          </div>

          {/* Job Type Dropdown */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Job Type
            </label>
            <DropdownWithSearchAndMultiSelect
              id="type"
              options={jobTypeOptions}
              isMulti={false}
              onChange={(value) =>
                handleDropdownChange("type", value as unknown as string)
              }
            />
          </div>
        </div>

        {/* Rich Text Editors */}
        {[
          { label: "Job Description", key: "description" },
          { label: "Benefits", key: "benefits" },
          { label: "Required Skills", key: "requiredSkills" },
          { label: "Experience", key: "experience" },
          { label: "Qualifications", key: "qualification" },
        ].map((item) => (
          <div key={item.key}>
            <p className="mb-1 font-sans text-sm font-semibold">{item.label}</p>
            <Editor
              editorState={editorState[item.key as keyof typeof editorState]}
              onEditorStateChange={(state) =>
                handleEditorChange(item.key, state)
              }
              toolbarClassName="rounded-md"
              wrapperClassName="border border-gray-300 rounded-md p-2"
              editorClassName="min-h-[200px]"
            />
          </div>
        ))}

        {/* Continue Button */}
        <div className="flex w-full flex-col md:flex-row mt-4 justify-end items-center gap-2">
          <button className="w-full md:w-auto px-4 md:px-20 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600">
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
