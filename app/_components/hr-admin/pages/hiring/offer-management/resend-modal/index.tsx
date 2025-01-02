import React, { useState } from "react";
import { toast } from "react-toastify";
import { resendJobOffer } from "@/app/api/services/job-offer";

interface ModalProps<T extends { id: string }> {
  isOpen: boolean;
  rowData: T | null;
  onClose: () => void;
  refetch: () => void;
}

const ResendModal = <T extends { id: string }>({
  isOpen,
  rowData,
  onClose,
  refetch,
}: ModalProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    if (!rowData) return;

    setIsLoading(true);

    try {
      const response = await resendJobOffer(rowData.id);

      if (response.status === 200) {
        toast.success("Offer has been successfully resent.");
        refetch();
        onClose();
      } else {
        toast.error(response.message || "Unexpected error occurred.");
      }
    } catch (error) {
      toast.error("Failed to resend the job offer.");
      console.error("Resend error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Resend Offer
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to resend the offer? Resending will notify the
          candidate with the same offer details.
        </p>
        <div className="mt-6 w-full md:w-[90%] md:mx-auto flex flex-col md:flex-row gap-2 items-center justify-center">
          <button
            className="w-full flex flex-row justify-center items-center gap-2 px-4 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-gray-600 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#0035C3] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendModal;
