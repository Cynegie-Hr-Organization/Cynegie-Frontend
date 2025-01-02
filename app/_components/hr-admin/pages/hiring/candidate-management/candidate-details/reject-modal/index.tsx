import { candidateUpdateStatus } from "@/app/api/services/candidate";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: string;
}

const RejectModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  candidateId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reasons, setReasons] = useState<string>("");

  const handleReject = async () => {
    if (!reasons) {
      setError("Reasons for rejection are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      status: "Rejected",
    };

    try {
      const response = await candidateUpdateStatus(candidateId, payload);

      if (response.status === 200) {
        toast.success("Candidate successfully rejected.");
        onClose();
      } else {
        setError(response.message || "Failed to reject the candidate.");
        toast.error(response.message || "Failed to reject the candidate.");
      }
    } catch (err) {
      setError("An error occurred while rejecting the candidate.");
      toast.error("Failed to reject the candidate.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md md:max-w-xl p-6 rounded-lg shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-semibold text-gray-900">
            Reject Candidate
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 bg-gray-100 rounded-full p-1 hover:text-gray-800"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <p className="text-sm mt-4 md:mt-0 text-center md:text-start md:max-w-96 text-gray-600 mb-6">
          Are you sure you want to reject this candidate? This action will
          notify the candidate about their application status and can&apos;t be
          undone.
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="reasons"
              className="block text-sm font-medium text-black"
            >
              Reasons for rejection
            </label>
            <textarea
              id="reasons"
              placeholder=""
              value={reasons}
              onChange={(e) => setReasons(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 w-full md:w-[90%] md:mx-auto flex flex-col md:flex-row gap-2 items-center justify-center ">
          <button
            className="w-full flex flex-row justify-center items-center gap-2  px-4  py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#0035C3] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Reject"}
          </button>
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RejectModal;
