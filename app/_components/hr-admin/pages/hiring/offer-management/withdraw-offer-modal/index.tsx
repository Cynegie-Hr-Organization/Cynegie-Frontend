import { withdrawJobOffer } from "@/app/api/services/job-offer";
import React, { useState } from "react";
import { toast } from "react-toastify";

// Make the modal component generic
interface ModalProps<T extends { id: string }> {
  isOpen: boolean;
  rowData: T | null;
  onClose: () => void;
  refetch: () => void;
}

const WithdrawModal = <T extends { id: string }>({
  isOpen,
  rowData,
  onClose,
  refetch,
}: ModalProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");

  // Function to handle the withdrawal request
  const handleWithdraw = async () => {
    if (!rowData || !reason) {
      setError("Reason for withdrawal is required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      reason: reason,
    };

    try {
      const response = await withdrawJobOffer(rowData.id, payload);
      console.log(response);

      if (response.status === 200) {
        toast.success("Offer has been successfully withdrawn.");
        refetch();
        onClose();
      } else if (response.statusCode === 400) {
        toast.error(response.message);
      } else {
        toast.error("Unexpected error withdrawing the job.");
      }
    } catch (error) {
      toast.error("Failed to withdraw the job offer");
      console.error("Failed to withdraw the job offer:", error);
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
            Withdraw Offer
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
          Withdrawing an offer will notify the candidate and close this offer.
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-black"
            >
              Reason for Withdrawal
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 w-full md:w-[90%] md:mx-auto flex flex-col md:flex-row gap-2 items-center justify-center ">
          <button
            className="w-full flex flex-row justify-center items-center gap-2 px-4 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleWithdraw}
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#0035C3] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Reject"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;
