import React, { useState } from "react";
import CreateDeviceModal from "../create-device-modal";

const ItAdminHeader = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Device
            </button>
          </div>

          {/* Dropdown for smaller screens */}
          <div className="md:hidden relative">
            <button
              className="w-fit gap-4 flex items-center justify-between px-2 py-1 text-sm font-semibold bg-white text-gray-400 border border-gray-300 rounded-md"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Action
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Overview
          </h1>
        </div>
      </header>

      {isCreateModalOpen && (
        <CreateDeviceModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </>
  );
};

export default ItAdminHeader;
