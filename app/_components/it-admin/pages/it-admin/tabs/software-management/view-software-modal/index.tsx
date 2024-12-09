/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateSoftware } from "@/app/api/services/it-admin";
import RemoveSoftwareModal from "../remove-software-modal";
import SuccessModal from "../sucess-modal";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: Record<string, any> | null;
  isEdit?: boolean;
  refetch: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const ViewDetailsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  rowData,
  isEdit = true,
  refetch,
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editableData, setEditableData] = useState({
    softwareName: rowData?.softwareName || "",
    licenseExpiryDate: rowData?.licenseExpiryDate || "",
    version: rowData?.version || "",
    licenseCount: rowData?.licenseCount || "",
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
      // Send the updated data to the API
      await updateSoftware(rowData?.id, editableData);

      refetch();
      // Show success modal and exit editing mode
      setIsSuccessModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating software:", error);
      alert("Failed to update the software. Please try again.");
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
          <h2 className="text-lg font-bold">Software Management</h2>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            &#x2715;
          </button>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Software Name</p>
            {isEditing ? (
              <input
                type="text"
                value={editableData.softwareName}
                onChange={(e) =>
                  handleInputChange("softwareName", e.target.value)
                }
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
              <p className="font-medium">{editableData.softwareName}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">License Expiry Date</p>
            {isEditing ? (
              <input
                type="date"
                value={editableData.licenseExpiryDate}
                onChange={(e) =>
                  handleInputChange("licenseExpiryDate", e.target.value)
                }
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
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
                  {rowData.licenseExpiryDate
                    ? formatDate(rowData.licenseExpiryDate)
                    : "N/A"}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Version</p>
            {isEditing ? (
              <input
                type="text"
                value={editableData.version}
                onChange={(e) => handleInputChange("version", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
              <p className="font-medium">{editableData.version}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">License Count</p>
            {isEditing ? (
              <input
                type="number"
                value={editableData.licenseCount}
                onChange={(e) =>
                  handleInputChange("licenseCount", e.target.value)
                }
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            ) : (
              <p className="font-medium">
                {editableData.licenseCount || "N/A"}
              </p>
            )}
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
              Update Software
            </button>
          )}
          <button
            className="px-4 w-full py-2 bg-white text-[#800501] border-[1.5px] border-gray-400 rounded-md hover:border-gray-700"
            onClick={handleRemoveDevice}
          >
            Remove Software
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
        <RemoveSoftwareModal
          isOpen={isRemoveModalOpen}
          rowData={rowData.id}
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

export default ViewDetailsModal;
