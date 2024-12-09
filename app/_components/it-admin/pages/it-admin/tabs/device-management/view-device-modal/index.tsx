/* eslint-disable @typescript-eslint/no-explicit-any */
import SuccessModal from "../sucess-modal";
import { useState } from "react";
import RemoveDeviceModal from "../remove-device-modal";
import { updateDevice } from "@/app/api/services/it-admin"; // Assuming this is the API call to update device details.
import { formatDate } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: Record<string, any> | null;
  isEdit?: boolean;
  refetch: () => void;
}

const ViewDetailsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  rowData,
  isEdit = false,
  refetch,
}) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editableData, setEditableData] = useState({
    deviceName: rowData?.deviceName || "",
    location: rowData?.location || "",
    description: rowData?.description || "",
  });

  console.log(rowData?.id);
  if (!isOpen || !rowData) return null;

  const handleInputChange = (field: string, value: string) => {
    setEditableData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveDevice = () => {
    setIsRemoveModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Send the updated data to the API
      await updateDevice(rowData?.id, editableData);

      // Show success modal and exit editing mode
      refetch();
      setIsSuccessModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating device:", error);
      alert("Failed to update the device. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-[765px] p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Device Details</h2>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            &#x2715;
          </button>
        </div>

        {/* Device Details Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Device Name</p>
            {isEditing ? (
              <input
                type="text"
                value={editableData.deviceName}
                onChange={(e) =>
                  handleInputChange("deviceName", e.target.value)
                }
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
              <p className="font-medium">{editableData.deviceName}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Location</p>
            {isEditing ? (
              <input
                type="text"
                value={editableData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
              <p className="font-medium">{editableData.location || "N/A"}</p>
            )}
          </div>
          <div className="flex flex-col  gap-2">
            <p className="text-sm text-gray-400">Date Added</p>
            <div className="flex w-fit items-center space-x-2 bg-gray-100 rounded-md px-2 p-[1px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10m-6 4h6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-900 font-semibold text-xs">
                {rowData.createdAt ? formatDate(rowData.createdAt) : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">Description</p>
          {isEditing ? (
            <textarea
              value={editableData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
          ) : (
            <p className="text-sm text-gray-700 mt-2">
              {editableData.description}
            </p>
          )}
        </div>

        {isEdit && (
          <div className="mb-6 space-y-4">
            <h2 className="text-lg font-semibold">Activity</h2>
            <div className="flex items-start space-x-3">
              <img
                src="/image/persons/person-1.png"
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Pro tip:{" "}
              <span className="font-medium text-gray-900">press M</span> to
              comment
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between w-full gap-4">
          {isEditing ? (
            <button
              className="px-4 w-full py-2 bg-primary text-white rounded-md hover:bg-blue-500"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="px-4 w-full py-2 bg-primary text-white rounded-md hover:bg-blue-500"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}

          <button
            className="px-4 w-full py-2 bg-white text-[#800501] border-[1.5px] border-gray-400 rounded-md hover:border-gray-700"
            onClick={handleRemoveDevice}
          >
            Remove
          </button>
        </div>
      </div>

      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            onClose();
          }}
        />
      )}

      {isRemoveModalOpen && (
        <RemoveDeviceModal
          isOpen={isRemoveModalOpen}
          rowData={rowData.id}
          onClose={() => {
            setIsRemoveModalOpen(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default ViewDetailsModal;
