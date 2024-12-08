import React, { useState, useRef, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";

const ItAdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown toggle
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Ref for button

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header Section */}
      <header className="flex flex-col font-sans gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              IT Administration
            </h1>
            <p className="text-gray-500 text-[10px] md:text-sm font-normal">
              Manage all IT services in your organization
            </p>
          </div>

          {/* Button to Create Device */}
          <div className="flex flex-row items-center">
            <button
              className="px-6 py-2 text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none hidden md:block"
              // onClick={handleCreateJobClick}
            >
              Create Device
            </button>
          </div>

          {/* Dropdown for smaller screens */}
          <div className="md:hidden relative">
            <button
              ref={buttonRef}
              className="w-fit gap-4 flex items-center justify-between px-2 py-1 text-sm font-semibold bg-white text-gray-400 border border-gray-300 rounded-md"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            >
              Action
              <SlArrowDown />
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-50 right-0 w-32 bg-white shadow-lg border border-gray-300 rounded-lg mt-2"
              >
                <button
                  className="w-32 text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    alert("Create Device clicked");
                    setIsDropdownOpen(false);
                  }}
                >
                  Create Device
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Overview
          </h1>
        </div>
      </header>
    </>
  );
};

export default ItAdminHeader;
