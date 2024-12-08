/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { deleteSoftware } from "@/app/api/services/it-admin";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: Record<string, any> | null;
  onRemoveSuccess?: () => void;
}

const RemoveSoftwareModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  rowData,
  onRemoveSuccess,
}) => {
  if (!isOpen) return null;

  const handleRemove = async () => {
    if (!rowData?.id) return;

    try {
      await deleteSoftware(rowData.id);
      onClose();
      if (onRemoveSuccess) {
        onRemoveSuccess(); // Trigger refresh
      }
    } catch (error) {
      console.error("Error deleting software:", error);
      toast("Failed to remove software. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
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
            alt="delete"
          />
        </div>

        {/* Confirmation Message */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Are you sure you want to remove this software?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Removing this software will delete it permanently for all users.
        </p>

        {/* Buttons */}
        <div className="mt-6 w-full flex flex-col md:flex-row gap-2 items-center justify-center">
          <button
            className="w-full flex justify-center items-center px-4 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-gray-600 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full px-4 py-2 text-white bg-red-700 rounded-lg hover:opacity-85"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSoftwareModal;
