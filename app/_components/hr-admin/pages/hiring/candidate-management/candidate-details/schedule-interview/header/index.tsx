import React from "react";

const InterviewSchedulesHeader: React.FC = () => {
  return (
    <>
      {/* Header Section */}
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-[18px] font-bold text-gray-800 md:mb-4">
          Scheduling Interview
        </h1>
      </header>
    </>
  );
};

export default InterviewSchedulesHeader;
