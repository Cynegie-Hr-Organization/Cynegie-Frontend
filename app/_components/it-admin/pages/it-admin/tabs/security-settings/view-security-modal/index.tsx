/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateSecurityAlerts } from "@/app/api/services/it-admin";
import RemoveSecurityModal from "../remove-security-modal";
import SuccessModal from "../sucess-modal";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: Record<string, any> | null;
  isEdit?: boolean;
  refetch: () => void;
}

const ViewSecurityModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  rowData,
  refetch,
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editableData, setEditableData] = useState({
    alertTitle: rowData?.alertTitle || "",
    severity: rowData?.severity || "",
    description: rowData?.description || "",
  });

  if (!isOpen || !rowData) return null;

  const handleInputChange = (field: string, value: string) => {
    setEditableData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveDevice = () => {
    setIsRemoveModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Update the security alert
      await updateSecurityAlerts(rowData.id, editableData);
      refetch();

      // Show success modal and exit editing mode
      setIsSuccessModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating security alert:", error);
      alert("Failed to update the alert. Please try again.");
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
          <h2 className="text-lg font-bold">Security Settings</h2>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            &#x2715;
          </button>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Alerts Type</p>
            {isEditing ? (
              <input
                type="text"
                value={editableData.alertTitle}
                onChange={(e) =>
                  handleInputChange("alertTitle", e.target.value)
                }
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
              <p className="font-medium">{editableData.alertTitle}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Date Added</p>
            <div className="flex w-fit items-center space-x-2 bg-gray-100 rounded-md px-2 p-[1px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-700"
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
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Severity</p>
            {isEditing ? (
              <input
                type="text"
                value={editableData.severity}
                onChange={(e) => handleInputChange("severity", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
              <p className="font-medium">{editableData.severity}</p>
            )}
          </div>
        </div>

        {/* Description Section */}
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
              Edit Alert
            </button>
          )}

          <button
            className="px-4 w-full py-2 bg-white text-[#800501] border-[1.5px] border-gray-400 rounded-md hover:border-gray-700"
            onClick={handleRemoveDevice}
          >
            Delete Settings
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
        <RemoveSecurityModal
          rowData={rowData.id}
          isOpen={isRemoveModalOpen}
          onClose={() => {
            refetch();

            setIsRemoveModalOpen(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default ViewSecurityModal;
