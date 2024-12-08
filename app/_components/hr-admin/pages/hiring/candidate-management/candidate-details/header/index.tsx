import React, { useState, useEffect, useRef } from "react";
// import MoveStageModal from "../move-stage-modal";
import MoveStageModal from "../move-stage-modal";
import { useRouter } from "next/navigation";

const HiringCandidateDetailsHeader: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  // Toggle popup visibility
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Toggle modal visibility
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close the popup if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <>
      {/* Header Section */}
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 md:mb-4">
          Candidate Details
        </h1>

        {/* Desktop Actions */}
        <div className="hidden md:flex flex-row gap-2 items-center">
          {/* Move Stage Button */}
          <button
            onClick={handleModalToggle} // Toggle modal on click
            className="w-full flex flex-row items-center gap-2 md:w-auto px-4 md:px-6 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600 cursor-pointer"
          >
            Move Stage
          </button>

          {/* Schedule Interview Button */}
          <button
            className="px-6 py-2 text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={() =>
              router.push(
                "/hr-admin/hiring/candidate-management/interviews-schedule",
              )
            }
          >
            Schedule Interview
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden relative">
          <button
            onClick={handlePopupToggle}
            className="w-full flex flex-row items-center gap-2 md:w-auto px-4 md:px-6 py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-blue-600 cursor-pointer"
          >
            Actions
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.34521 7.27318L8.8574 13.4023C9.49915 14.0063 10.5002 14.0063 11.142 13.4023L17.6541 7.27318C17.9893 6.95775 18.0053 6.43035 17.6898 6.09521C17.3744 5.76006 16.847 5.74408 16.5119 6.05951L9.99968 12.1886L3.48748 6.05951C3.15234 5.74408 2.62494 5.76006 2.30951 6.09521C1.99408 6.43035 2.01006 6.95775 2.34521 7.27318Z"
                fill="#98A2B3"
              />
            </svg>
          </button>

          {/* Pop-up for Mobile Actions */}
          {isPopupOpen && (
            <div
              ref={popupRef} // Reference to the popup for outside click detection
              className="absolute right-0 mt-1 bg-white w-44 rounded-lg shadow-lg z-50 flex flex-col gap-2 p-2 border border-gray-300"
              onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
            >
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left text-base font-semibold text-gray-700 hover:text-blue-600">
                    Schedule Interview
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleModalToggle} // Toggle modal on click
                    className="w-full text-left text-base font-semibold text-gray-700 hover:text-blue-600"
                  >
                    Move Stage
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Move Stage Modal */}
      {/* <RejectModal isOpen={isModalOpen} onClose={handleModalToggle} /> */}
      <MoveStageModal isOpen={isModalOpen} onClose={handleModalToggle} />
    </>
  );
};

export default HiringCandidateDetailsHeader;
