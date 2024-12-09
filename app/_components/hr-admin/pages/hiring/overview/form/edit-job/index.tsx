"use client";

import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import DropdownWithSearchAndMultiSelect from "@/app/_components/ui/multi-select-dropdown";
import { useParams, useRouter } from "next/navigation";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CreateJobProps, Job } from "@/types";
import dynamic from "next/dynamic";
import { editJob, fetchJobById } from "@/app/api/services/job";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

interface EditJobFormProps {
  setScreenInView: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<any>>;
}

const stripHTMLTags = (htmlString: string) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

export default function EditJobForm({
  setScreenInView,
  setFormData,
}: EditJobFormProps) {
  const router = useRouter();
  const { id } = useParams();
  const jobId = typeof id === "string" ? id : "";

  const [job, setJob] = useState<Job | null>(null);
  const [formData, setFormDataState] = useState<Partial<CreateJobProps>>({});
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
  const [editorStates, setEditorStates] = useState<Record<string, EditorState>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (jobId) {
      const fetchData = async () => {
        try {
          const response = await fetchJobById(jobId);
          if (response.data) {
            setJob(response.data);
            setFormDataState(response.data); // Populate form with initial data

            // Convert HTML to plain text and initialize editor states explicitly
            const initEditorState = (key: keyof Job) => {
              // Check if the value is an array, and join it into a string if necessary
              const content = Array.isArray(response.data[key])
                ? response.data[key].join(", ") // Join the array of strings into a single string
                : response.data[key] || ""; // If it's not an array, use the value directly

              return EditorState.createWithContent(
                ContentState.createFromText(stripHTMLTags(content)),
              );
            };
            setEditorStates({
              description: initEditorState("description"),
              benefits: initEditorState("benefits"),
              requiredSkills: initEditorState("requiredSkills"),
              experience: initEditorState("experience"),
              qualification: initEditorState("qualification"),
            });
          } else {
            setError("Failed to fetch job details.");
          }
        } catch {
          setError("Error fetching job data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [jobId]);

  const handleInputChange = (key: string, value: any) => {
    setFormDataState((prev) => ({ ...prev, [key]: value }));
    setModifiedFields((prev) => new Set([...prev, key]));
  };

  const handleDropdownChange = (key: string, value: any) => {
    const formattedValue = Array.isArray(value)
      ? value.map((item) => (typeof item === "string" ? item : item.value))
      : typeof value === "object"
        ? value.value
        : value;

    handleInputChange(key, formattedValue);
  };

  const handleEditorChange = (key: string, state: EditorState) => {
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    handleInputChange(key, html);
    setEditorStates((prev) => ({ ...prev, [key]: state }));
  };

  const handleSaveChanges = async () => {
    try {
      // Ensure 'requiredSkills' is always an array before submitting
      if (typeof formData.requiredSkills === "string") {
        formData.requiredSkills = formData.requiredSkills
          .split(",")
          .map((item) => item.trim());
      }

      const updatedData = Array.from(modifiedFields).reduce((acc, key) => {
        const value = formData[key as keyof CreateJobProps];
        
        // Normalize array fields to ensure type consistency
        if (Array.isArray(value)) {
          acc[key as keyof CreateJobProps] = value as any;
        } else if (value !== undefined) {
          acc[key as keyof CreateJobProps] = value as any;
        }
        
        return acc;
      }, {} as Partial<CreateJobProps>);

      if (Object.keys(updatedData).length) {
        console.log(updatedData);
        const response = await editJob(jobId, updatedData);
        console.log(response);
        const updatedJob = await fetchJobById(jobId);
        if (updatedJob.data) {
          setFormData(updatedJob.data);
          setScreenInView(2);
        }
      }
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <h1 className="text-lg text-black font-semibold">Edit Job</h1>
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
            value={formData.requisitorName || ""}
            onChange={(e) =>
              handleInputChange("requisitorName", e.target.value)
            }
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
              value={formData.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
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
              value={
                formData.department
                  ? { value: formData.department, label: formData.department }
                  : null
              }
              onChange={(value) =>
                handleDropdownChange("department", value as unknown as string)
              }
            />
          </div>
        </div>

        {/* Location and Job Type */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              value={
                formData.department
                  ? { value: formData.jobLocation, label: formData.jobLocation }
                  : null
              }
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
              value={
                formData.department
                  ? { value: formData.type, label: formData.type }
                  : null
              }
              onChange={(value) =>
                handleDropdownChange("type", value as unknown as string)
              }
            />
          </div>
        </div>

        {/* Rich Text Editors */}
        {[
          {
            label: "Job Description",
            key: "description",
            placeholder: job?.description || "Enter job description here...",
          },
          {
            label: "Benefits",
            key: "benefits",
            placeholder: job?.benefits || "Enter job benefits here...",
          },
          {
            label: "Required Skills",
            key: "requiredSkills",
            placeholder:
              Array.isArray(job?.requiredSkills) ? job?.requiredSkills.join(", ") : job?.requiredSkills || "Enter required skills here...",
          },
          {
            label: "Experience",
            key: "experience",
            placeholder:
              job?.experience || "Enter experience requirements here...",
          },
          {
            label: "Qualifications",
            key: "qualification",
            placeholder: job?.qualification || "Enter qualifications here...",
          },
        ].map((item) => (
          <div key={item.key}>
            <p className="mb-1 font-sans text-sm font-semibold">{item.label}</p>
            <Editor
              editorState={editorStates[item.key] || EditorState.createEmpty()}
              onEditorStateChange={(state) =>
                handleEditorChange(item.key, state)
              }
              toolbarClassName="rounded-md"
              wrapperClassName="border border-gray-300 rounded-md p-2"
              editorClassName="min-h-[200px]"
              placeholder={item.placeholder}
            />
          </div>
        ))}

        {/* Continue Button */}
        <div className="flex w-full flex-col md:flex-row mt-4 justify-end items-center gap-2">
          <button className="w-full md:w-auto px-4 md:px-20 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600">
            Save & Continue Later
          </button>
          <button
            type="button"
            className="w-full md:w-auto px-4 md:px-20 py-2 text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleSaveChanges}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
