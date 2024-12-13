import React, { useState } from "react";
import Image from "next/image";
import { deleteJob } from "@/app/api/services/job";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const DeleteJobModal: React.FC<ModalProps> = ({ isOpen, onClose, jobId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteJob(jobId);
      onClose();
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/icons/modal-delete.svg"
            width={100}
            height={100}
            alt="Delete"
          />
        </div>

        {/* Message */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Are you sure you want to delete this job post?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Deleting this job post will remove it from your job list permanently.
        </p>

        {/* Buttons */}
        <div className="mt-6 w-full md:w-[90%] md:mx-auto flex flex-col md:flex-row gap-2 items-center justify-center">
          <button
            className="w-full flex justify-center items-center px-4 py-2 border-2 border-gray-300 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-gray-600 cursor-pointer"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className={`w-full px-4 py-2 text-white bg-red-700 rounded-lg hover:opacity-85 ${
              isDeleting ? "cursor-not-allowed opacity-70" : ""
            }`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobModal;
