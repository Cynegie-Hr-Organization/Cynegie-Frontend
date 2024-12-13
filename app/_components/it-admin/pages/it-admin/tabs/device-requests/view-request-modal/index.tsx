/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateDeviceRequestStatus } from "@/app/api/services/it-admin";
import RemoveRequestModal from "../remove-request-modal";
import SuccessModal from "../sucess-modal";
import { useState } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: Record<string, any> | null;
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

const ViewRequestsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  request,
  isEdit = true,
  refetch,
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [denyReason, setDenyReason] = useState("");

  if (!isOpen || !request) return null;

  const handleApproveRequest = () => {
    updateDeviceRequestStatus(request.id, "APPROVED")
      .then(() => {
        refetch();
        setIsSuccessModalOpen(true); // Open the success modal upon successful status update
      })
      .catch((error) => {
        console.error("Error updating request status:", error);
        // Handle error appropriately
      });
  };

  const handleDenyRequest = () => {
    if (!denyReason) {
      return; // Don't proceed if no reason is provided
    }
    setIsRemoveModalOpen(true); // Open remove modal for confirmation
  };

  const handleConfirmDeny = () => {
    // Proceed with denial after confirmation
    updateDeviceRequestStatus(request.id, "REJECTED", denyReason)
      .then(() => {
        refetch();
        toast("Request has been denied.");
        setIsSuccessModalOpen(true);
      })
      .catch((error) => {
        toast.error("Error updating request status:", error);
      });
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
          <h2 className="text-lg font-bold">Device Request Details</h2>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            &#x2715;
          </button>
        </div>

        {/* Details Section */}
        <div className="grid  md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center space-x-4">
              {/* Profile Image */}
              <img
                src="/image/persons/person-1.png" // Replace with the path to your image
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              {/* Profile Details */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">{`${request.userId.firstName} ${request.userId.lastName}`}</h2>
                <p className="text-sm text-gray-500">Designer</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm mb-1 text-gray-400">Requested date</p>
            <div className="flex w-fit items-center space-x-2 bg-gray-100 rounded-md px-2 p-[1px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10m-6 4h6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-900 font-semibold text-xs">
                {request.requestedDate ? formatDate(request.createdAt) : "N/A"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Device Requested</p>
            <p className="font-medium text-blue-700">
              {request.deviceId.deviceName}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm text-gray-900">Description</p>
          <p className="text-sm text-gray-700 mt-2">
            {request.deviceId.description}
          </p>
        </div>

        {isEdit && (
          <div className="mb-6 space-y-4">
            <h2 className="text-lg font-semibold">Reason</h2>
            <div className="flex items-start space-x-3">
              <img
                src="/image/persons/person-1.png"
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a reason..."
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-[1px] focus:ring-blue-100"
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
          <button
            className="px-4 w-full py-2 bg-white text-[#800501] border-[1.5px] border-gray-400 rounded-md hover:border-gray-700"
            onClick={handleDenyRequest}
            disabled={!denyReason}
          >
            Deny Request
          </button>
          <button
            className="px-4 w-full py-2 bg-primary text-white rounded-md hover:bg-blue-500"
            onClick={handleApproveRequest}
          >
            Approve Request
          </button>
        </div>
      </div>

      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            refetch();
            setIsSuccessModalOpen(false);
            onClose();
          }}
        />
      )}

      {isRemoveModalOpen && (
        <RemoveRequestModal
          isOpen={isRemoveModalOpen}
          onClose={() => {
            refetch();
            setIsRemoveModalOpen(false);
            onClose();
          }}
          onDeny={handleConfirmDeny}
        />
      )}
    </div>
  );
};

export default ViewRequestsModal;
