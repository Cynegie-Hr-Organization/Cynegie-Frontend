/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { deleteDevice } from "@/app/api/services/it-admin";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: string;
  onRemoveSuccess?: () => void;
}

const RemoveDeviceModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  rowData,
  onRemoveSuccess,
}) => {
  if (!isOpen) return null;

  const handleRemove = async () => {
    if (!rowData) {
      console.log("No device ID available");
      return; // Ensure there is a valid ID before trying to remove
    }

    try {
      console.log("Attempting to remove device with ID:", rowData);
      const res = await deleteDevice(rowData);
      console.log(res);
      toast.success("Device removed successfully!"); // Success feedback
      onClose(); // Close the modal

      if (onRemoveSuccess) {
        onRemoveSuccess(); // Trigger any success actions like refreshing data
      }
    } catch (error) {
      console.error("Error deleting device:", error);
      toast.error("Failed to remove device. Please try again."); // Show an error toast
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
          Are you sure you want to remove this device?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Removing this device will delete it permanently for all users.
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

export default RemoveDeviceModal;
