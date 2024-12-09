import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DeleteJobModal from "../../../tabs/jobs/delete-modal";
import { updateJobStatus } from "@/app/api/services/job";
import { toast } from "react-toastify";

interface JobDescriptionHeaderProps {
  jobId: string;
}

const JobDescriptionHeader: React.FC<JobDescriptionHeaderProps> = ({
  jobId,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isLoading, setIsLoading] = useState(false); // For handling loading state of actions

  const router = useRouter();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Function to update job status
  const handleUpdateJobStatus = async (status: string) => {
    try {
      setIsLoading(true);
      const response = await updateJobStatus(jobId, status);
      console.log(response);
      if (response.status === 200) {
        toast.success(`Job status updated to ${status}`);
      } else {
        throw new Error("Failed to update job status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the job status.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeJob = () => handleUpdateJobStatus("Closed");
  const openJob = () => handleUpdateJobStatus("Active");

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="flex flex-row justify-between items-center">
        <h1 className="ml-2 text-xl md:text-2xl font-bold text-gray-900 md:mb-4">
          Job Detail
        </h1>
        <div
          className="relative flex flex-row gap-2 items-center"
          ref={dropdownRef}
        >
          {/* Actions Button */}
          <button
            className="flex flex-row items-center gap-2 px-4 md:px-6 py-[7px] border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600 cursor-pointer"
            onClick={toggleDropdown}
          >
            Actions
            <span>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.83807 8.7282L10.6527 16.0832C11.4228 16.808 12.6241 16.808 13.3942 16.0832L21.2088 8.7282C21.611 8.34969 21.6302 7.71681 21.2516 7.31464C20.8731 6.91247 20.2402 6.89329 19.8381 7.2718L12.0234 14.6268L4.20881 7.2718C3.80663 6.89329 3.17376 6.91246 2.79524 7.31464C2.41672 7.71681 2.4359 8.34969 2.83807 8.7282Z"
                  fill="#98A2B3"
                />
              </svg>
            </span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={closeJob}
                disabled={isLoading}
              >
                Close Job
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={openJob}
                disabled={isLoading}
              >
                Open Job
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() =>
                  router.push(`/hr-admin/hiring/edit-job/${jobId}`)
                }
              >
                Edit Job
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={handleDeleteClick}
              >
                Delete Job
              </button>
            </div>
          )}

          {/* View Candidates Button */}
          <button className="px-6 py-2 text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none">
            View candidates
          </button>
        </div>
        <DeleteJobModal
          isOpen={isModalOpen}
          onClose={closeModal}
          jobId={jobId || ""} // Pass the jobId to the modal
        />
      </header>
    </>
  );
};

export default JobDescriptionHeader;
