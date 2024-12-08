import React, { useState, useRef, useEffect } from "react";
import DeviceManagementTab from "./device-management";
import DeviceRequestsTab from "./device-requests";
import SoftwareManagementTab from "./software-management";
import SecurityManagementTab from "./security-settings";
import { SlArrowDown } from "react-icons/sl";

const OverviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState<
    | "device-request"
    | "device-management"
    | "software-management"
    | "security-settings"
  >("device-request");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown toggle

  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Ref for button

  const getSelectedTabLabel = () => {
    switch (selectedTab) {
      case "device-request":
        return "Device Requests";
      case "device-management":
        return "Device Management";
      case "software-management":
        return "Software Management";
      case "security-settings":
        return "Security Settings";
      default:
        return "Select Tab";
    }
  };

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
    <div className="h-full w-full flex flex-col">
      {/* Tab buttons for larger screens */}
      <div className="border-b w-fit border-gray-300 hidden md:flex">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "device-request"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setSelectedTab("device-request")}
        >
          Device Requests
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "device-management"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setSelectedTab("device-management")}
        >
          Device Management
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "software-management"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setSelectedTab("software-management")}
        >
          Software Management
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "security-settings"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setSelectedTab("security-settings")}
        >
          Security Settings
        </button>
      </div>

      {/* Dropdown for smaller screens */}
      <div className="md:hidden relative">
        <button
          ref={buttonRef}
          className="w-fit gap-4 flex items-center justify-between px-2 py-1 text-sm font-semibold bg-white text-gray-400 border border-gray-300 rounded-md"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
        >
          {getSelectedTabLabel()}
          <SlArrowDown />
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full bg-white shadow-lg border border-gray-300 rounded-lg mt-2"
          >
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedTab("device-request");
                setIsDropdownOpen(false); // Close dropdown after selecting
              }}
            >
              Device Requests
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedTab("device-management");
                setIsDropdownOpen(false);
              }}
            >
              Device Management
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedTab("software-management");
                setIsDropdownOpen(false);
              }}
            >
              Software Management
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedTab("security-settings");
                setIsDropdownOpen(false);
              }}
            >
              Security Settings
            </button>
          </div>
        )}
      </div>

      {/* Tab content */}
      <div className="w-full mt-4">
        {selectedTab === "device-request" && <DeviceRequestsTab />}
        {selectedTab === "device-management" && <DeviceManagementTab />}
        {selectedTab === "software-management" && <SoftwareManagementTab />}
        {selectedTab === "security-settings" && <SecurityManagementTab />}
      </div>
    </div>
  );
};

export default OverviewTabs;
