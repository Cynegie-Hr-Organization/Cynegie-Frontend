import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchInterviewById } from "@/app/api/services/interview";
import RejectCandidateModal from "../../../../candidate-management/reject-candidate-modal";

interface InterviewDetailsTopHeaderProps {
  interviewId: string;
}

const InterviewDetailsTopHeader: React.FC<InterviewDetailsTopHeaderProps> = ({
  interviewId,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateData, setCandidateData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleRejectClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const getInterviewDetails = useCallback(async () => {
    try {
      const response = await fetchInterviewById(interviewId);
      console.log(response);
      setCandidateData(response.data?.candidate);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch interview details", error);
      setLoading(false);
    }
  }, [interviewId]);

  useEffect(() => {
    getInterviewDetails();
  }, [getInterviewDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Header Section */}
      <header className="flex flex-row justify-between items-center">
        <h1 className="ml-2 text-xl md:text-2xl font-bold text-gray-900 md:mb-4">
          Interview Details
        </h1>
        <div
          className="relative flex flex-row gap-2 items-center"
          ref={dropdownRef}
        >
          {/* Actions Button */}
          <button
            className="w-full flex flex-row items-center gap-2 md:w-auto px-4 md:px-6 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600 cursor-pointer"
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
            <div className="absolute right-0 top-9 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => alert("Schedule follow up interview")}
              >
                Schedule follow up interview
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => alert("Move to next stage")}
              >
                Move to next stage
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 focus:outline-none"
                onClick={handleRejectClick}
              >
                Reject Candidate
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Reject Candidate Modal */}
      {isModalOpen && candidateData && (
        <RejectCandidateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          rowData={candidateData}
          refetch={getInterviewDetails}
        />
      )}
    </>
  );
};

export default InterviewDetailsTopHeader;
