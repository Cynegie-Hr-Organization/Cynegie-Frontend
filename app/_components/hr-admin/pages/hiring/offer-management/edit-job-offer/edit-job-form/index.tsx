"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomDatePicker from "../../../../../../ui/date-picker";
import EditJobOfferSuccessModal from "../modal";
import { fetchJobOfferById, editJobOffer } from "@/app/api/services/job-offer";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const stripHTMLTags = (htmlString: string) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

const EditJobOfferForm: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const jobOfferId = typeof id === "string" ? id : "";

  const [candidateId, setCandidateId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [offerDate, setOfferDate] = useState<Dayjs | null>(null);
  const [expirationDate, setExpirationDate] = useState<Dayjs | null>(null);
  const [jobStartDate, setJobStartDate] = useState<Dayjs | null>(null);
  const [baseSalary, setBaseSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [benefits, setBenefits] = useState(EditorState.createEmpty());
  const [documents, setDocuments] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobOfferId) {
      const fetchData = async () => {
        try {
          const response = await fetchJobOfferById(jobOfferId);
          if (response.data) {
            const jobOffer = response.data;
            setCandidateId(jobOffer.candidate.id || "");
            setCandidateName(
              `${jobOffer.candidate.firstName} ${jobOffer.candidate.lastName}` ||
                "",
            );
            setJobTitle(jobOffer.jobTitle || "");
            setDepartment(jobOffer.department || "");
            setOfferDate(jobOffer.offerDate ? dayjs(jobOffer.offerDate) : null);
            setExpirationDate(
              jobOffer.expirationDate ? dayjs(jobOffer.expirationDate) : null,
            );
            setJobStartDate(
              jobOffer.jobStartDate ? dayjs(jobOffer.jobStartDate) : null,
            );
            setBaseSalary(jobOffer.baseSalary || "");
            setBonus(jobOffer.bonus || "");

            // Initialize editor states with stripped HTML content
            const contentState = ContentState.createFromText(
              stripHTMLTags(jobOffer.benefits || ""),
            );
            setBenefits(EditorState.createWithContent(contentState));
          } else {
            setError("Failed to fetch job offer details.");
          }
        } catch (error) {
          console.error("Error fetching job offer data.", error);
          setError("Error fetching job offer data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [jobOfferId]);

  const handleBenefitsChange = (editorState: EditorState) => {
    setBenefits(editorState);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const benefitsHTML = draftToHtml(
      convertToRaw(benefits.getCurrentContent()),
    );

    const updatedData = {
      candidate: candidateId,
      jobTitle,
      department,
      offerDate,
      expirationDate,
      jobStartDate,
      baseSalary,
      bonus,
      benefits: benefitsHTML,
      documents,
    };

    try {
      const response = await editJobOffer(jobOfferId, updatedData);
      console.log(response);
      if (response) {
        toast.success("Job offer updated successfully:");
        setIsModalOpen(true);
      } else {
        toast.error(response);
      }
    } catch (err) {
      console.error("Error updating job offer:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/hr-admin/hiring/offer-management");
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <Skeleton height={30} className="mb-4" />
        <Skeleton height={30} className="mb-4" />
        <Skeleton height={150} className="mb-4" />
        <Skeleton height={30} width="50%" className="mb-4" />
        <Skeleton height={40} />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

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
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
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
              onEditorStateChange={handleBenefitsChange}
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
              {documents ? (
                <label
                  htmlFor="document-upload"
                  className="flex-grow text-gray-500 cursor-pointer"
                >
                  {documents.name}
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
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <EditJobOfferSuccessModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default EditJobOfferForm;
