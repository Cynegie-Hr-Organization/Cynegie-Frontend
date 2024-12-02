/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CustomDatePicker from "../../../../../../ui/date-picker";
import { useRouter } from "next/navigation";
import { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditJobOfferSuccessModal from "../modal";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const EditJobOfferForm: React.FC = () => {
  const [candidateName, setCandidateName] = useState("Precious Henry");
  const [jobTitle, setJobTitle] = useState("Front End Developer");
  const [department, setDepartment] = useState("Engineering");
  const [offerDate, setOfferDate] = useState<Dayjs | null>(null);
  const [expirationDate, setExpirationDate] = useState<Dayjs | null>(null);
  const [jobStartDate, setJobStartDate] = useState<Dayjs | null>(null);
  const [baseSalary, setBaseSalary] = useState("");
  const [bonusStructure, setBonusStructure] = useState("");
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const [benefits, setBenefits] = useState(EditorState.createEmpty());

  const handleEditorChange = (editorState: EditorState) => {
    setBenefits(editorState);
  };

  const router = useRouter();

  const handleSubmitClick = () => {
    // Simulate publish logic here
    setIsModalOpen(true); // Open the modal
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedDocument(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      candidateName,
      jobTitle,
      department,
      offerDate,
      expirationDate,
      jobStartDate,
      baseSalary,
      bonusStructure,
      benefits: benefitsHTML,
      uploadedDocument: uploadedDocument ? uploadedDocument.name : null,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const benefitsHTML = draftToHtml(convertToRaw(benefits.getCurrentContent()));

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          {/* Candidate Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Candidate Name
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
                Job Title
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
                Department
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
                Offer Date
              </label>
              <CustomDatePicker
                value={offerDate}
                onChange={(date) => setOfferDate(date)}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <CustomDatePicker
                value={expirationDate}
                onChange={(date) => setExpirationDate(date)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Start Date
              </label>
              <CustomDatePicker
                value={jobStartDate}
                onChange={(date) => setJobStartDate(date)}
              />
            </div>
          </div>

          {/* Salary Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Base Salary
              </label>
              <input
                type="number"
                placeholder="Enter Salary"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bonus Structure
              </label>
              <input
                type="number"
                placeholder="Enter Bonus Structure"
                value={bonusStructure}
                onChange={(e) => setBonusStructure(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits
            </label>
            <Editor
              editorState={benefits}
              wrapperClassName="demo-wrapper border border-gray-300 rounded-lg"
              editorClassName="demo-editor p-2 h-40 overflow-y-scroll"
              onEditorStateChange={handleEditorChange}
              placeholder="Enter benefits here..."
            />
          </div>

          {/* Document Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Document Upload
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg mt-2 p-2 flex items-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="document-upload"
              />
              {uploadedDocument ? (
                <label
                  htmlFor="document-upload"
                  className="flex-grow text-gray-500 cursor-pointer"
                >
                  {uploadedDocument.name}
                </label>
              ) : (
                <label
                  htmlFor="document-upload"
                  className="flex-grow text-gray-400 cursor-pointer"
                >
                  Select a file to upload
                </label>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Supported file types: PDF. Max file size allowed is 3MB.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-white border-2 border-gray-100 text-black font-semibold rounded-lg  focus:outline-none"
              onClick={() => router.push("/hr-admin/hiring/offer-management")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
              onClick={handleSubmitClick}
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
      <EditJobOfferSuccessModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default EditJobOfferForm;
