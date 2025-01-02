import { candidateUpdateStatus } from "@/app/api/services/candidate";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface RejectCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: { id: string; firstName: string; lastName: string } | null;
  refetch: () => void; // This can be used to refresh the list after rejection
}

const RejectCandidateModal: React.FC<RejectCandidateModalProps> = ({
  isOpen,
  onClose,
  rowData,
  refetch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");

  // Function to handle rejection
  const handleRejectCandidate = async () => {
    if (!rejectionReason) {
      setError("Rejection reason is required.");
      return;
    }

    if (!rowData) {
      setError("No candidate data available.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      status: "Rejected",
    };

    try {
      const response = await candidateUpdateStatus(rowData.id, payload); // API call for rejection
      console.log(response);
      if (response.status === 200) {
        toast.success("Candidate has been successfully rejected.");
        refetch();
        onClose();
      } else {
        toast.error(response.message || "Failed to reject candidate.");
      }
    } catch (error) {
      toast.error("Failed to reject the candidate.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !rowData) return null;

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
          Are you sure you want to reject this candidate? This action cannot be
          undone.
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="rejectionReason"
              className="block text-sm font-medium text-black"
            >
              Reason for Rejection
            </label>
            <textarea
              id="rejectionReason"
              placeholder="Enter reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 w-full md:w-[90%] md:mx-auto flex flex-col md:flex-row gap-2 items-center justify-center ">
          <button
            className="w-full flex flex-row justify-center items-center gap-2  px-4 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleRejectCandidate}
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#0035C3] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Confirm Rejection"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RejectCandidateModal;
