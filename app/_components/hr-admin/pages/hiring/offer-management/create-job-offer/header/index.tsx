import React from "react";

const CreateJobHeader: React.FC = () => {
  return (
    <>
      {/* Header Section */}
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-[18px] font-bold text-gray-800 md:mb-4">
          Create Job Offer
        </h1>
      </header>
    </>
  );
};

export default CreateJobHeader;
