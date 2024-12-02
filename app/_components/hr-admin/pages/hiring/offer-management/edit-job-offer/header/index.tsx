import React from "react";

const EditJobHeader: React.FC = () => {
  return (
    <>
      {/* Header Section */}
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-[18px] font-bold text-gray-800 md:mb-4">
          Edit Job Offer
        </h1>
      </header>
    </>
  );
};

export default EditJobHeader;
