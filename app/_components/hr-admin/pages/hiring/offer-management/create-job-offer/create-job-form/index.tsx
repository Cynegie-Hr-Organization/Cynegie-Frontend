/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomDatePicker from "../../../../../../ui/date-picker";
import { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CreateJobOfferSuccessModal from "../modal";
import { createJobOffer } from "@/app/api/services/job-offer";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const CreateJobOfferForm: React.FC = () => {


  // const [candidateName] = useState("Precious Henry");
  // const [jobTitle] = useState("Front End Developer");
  // const [department] = useState("Engineering");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [candidateName] = useState("Precious Henry");
  const [jobTitle] = useState("Front End Developer");
  const [department] = useState<string>("Engineering");
  const [offerDate, setOfferDate] = useState<Dayjs | null>(null);
  const [expirationDate, setExpirationDate] = useState<Dayjs | null>(null);
  const [jobStartDate, setJobStartDate] = useState<Dayjs | null>(null);
  const [baseSalary, setBaseSalary] = useState("");
  const [bonusStructure, setBonusStructure] = useState("");
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [benefits, setBenefits] = useState(EditorState.createEmpty());

  const handleEditorChange = (editorState: EditorState) => {
    setBenefits(editorState);
  };



  // const handleSubmitClick = () => {
  //   setIsModalOpen(true);
  // };



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedDocument(e.target.files[0]);
    }
  };

  const isFormComplete = (): boolean => {
    const isBenefitsComplete = benefits.getCurrentContent().hasText(); // Check if benefits have text
    const isFileUploaded = uploadedDocument !== null;

    return isValid && isBenefitsComplete && isFileUploaded;
  };

  const onSubmit = async (data: any) => {
    const benefitsHTML = draftToHtml(
      convertToRaw(benefits.getCurrentContent()),
    );

    // Format the dates using dayjs
    const formattedOfferDate = offerDate?.format("YYYY-MM-DDTHH:mm:ssZ");
    const formattedExpirationDate = expirationDate?.format(
      "YYYY-MM-DDTHH:mm:ssZ",
    );
    const formattedJobStartDate = jobStartDate?.format("YYYY-MM-DDTHH:mm:ssZ");

    // Prepare the payload for the API
    const payload = {
      ...data,
      candidate: candidateName,
      department,
      bonus: parseFloat(bonusStructure),
      benefits: benefitsHTML,
      uploadedDocument: uploadedDocument
        ? uploadedDocument.name
        : "default-link.pdf",
      offerDate: formattedOfferDate,
      expiratioDate: formattedExpirationDate,
      jobStartDate: formattedJobStartDate,
      baseSalary,
      bonusStructure,
    };

    console.log(payload);

    try {
      // Call the createJobOffer API with the prepared payload
      const response = await createJobOffer(payload);
      console.log("Job offer created successfully", response);
      setIsModalOpen(true); // Open the modal on success
    } catch (error) {
      console.error("Error creating job offer", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-md h-auto">
          {/* Candidate Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Candidate Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={candidateName}
                disabled
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={jobTitle}
                disabled
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Job Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={department}
                disabled
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Offer Date <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="offerDate"
                rules={{ required: "Offer date is required" }}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    value={offerDate}
                    onChange={(date) => {
                      setOfferDate(date);
                      field.onChange(date);
                    }}
                  />
                )}
              />
              {errors.offerDate &&
                typeof errors.offerDate.message === "string" && (
                  <p className="text-xs text-red-500">
                    {errors.offerDate.message}
                  </p>
                )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiration Date <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="expirationDate"
                rules={{ required: "Expiration date is required" }}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    value={expirationDate}
                    onChange={(date) => {
                      setExpirationDate(date);
                      field.onChange(date);
                    }}
                  />
                )}
              />
              {errors.expirationDate &&
                typeof errors.expirationDate.message === "string" && (
                  <p className="text-xs text-red-500">
                    {errors.expirationDate.message}
                  </p>
                )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Start Date <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="jobStartDate"
                rules={{ required: "Job start date is required" }}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    value={jobStartDate}
                    onChange={(date) => {
                      setJobStartDate(date);
                      field.onChange(date);
                    }}
                  />
                )}
              />
              {errors.jobStartDate &&
                typeof errors.jobStartDate.message === "string" && (
                  <p className="text-xs text-red-500">
                    {errors.jobStartDate.message}
                  </p>
                )}
            </div>
          </div>

          {/* Salary Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Base Salary <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Salary"
                value={baseSalary}
                {...register("baseSalary", {
                  required: "This field is required",
                })}
                onChange={(e) => setBaseSalary(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              {errors.baseSalary &&
                typeof errors.baseSalary.message === "string" && (
                  <p className="text-xs text-red-500">
                    {errors.baseSalary.message}
                  </p>
                )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bonus Structure <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Bonus Structure"
                value={bonusStructure}
                {...register("bonusStructure", {
                  required: "This field is required",
                })}
                onChange={(e) => setBonusStructure(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              {errors.bonusStructure &&
                typeof errors.bonusStructure.message === "string" && (
                  <p className="text-xs text-red-500">
                    {errors.bonusStructure.message}
                  </p>
                )}
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Benefits <span className="text-red-500">*</span>
            </label>
            <Editor
              editorState={benefits}
              onEditorStateChange={handleEditorChange}
              toolbarClassName="rounded-md"
              wrapperClassName="border border-gray-300 rounded-md p-2"
              editorClassName="min-h-[200px] "
            />
          </div>

          {/* File Upload */}
          <div className="mt-4 w-full">
            <label className="block text-sm font-medium text-gray-700">
              Upload Document <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border-[1px] w-full border-dashed border-gray-300 rounded-lg mt-2 p-2 flex items-center"
            />
            <p className="text-xs mt-2">
              Supported file types: PDF. Max file size allowed is 3MB.
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={!isFormComplete()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      <CreateJobOfferSuccessModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CreateJobOfferForm;
