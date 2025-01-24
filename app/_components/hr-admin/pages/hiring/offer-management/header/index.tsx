import React from "react";

const HiringCandidateOfferHeader = () => {

  // const handleCreateJobOfferClick = () => {
  //   router.push("/hr-admin/hiring/offer-management/create-job-offer");
  // };

  return (
    <>
      {/* Header Section */}
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 md:mb-4">
          Offer Management
        </h1>
        {/* <div className="flex flex-row items-center">
          <button
            className="px-2 md:px-6 py-2 text-sm md:text-base font-semibold bg-[#0035C3] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleCreateJobOfferClick}
          >
            Create job offer
          </button>
        </div> */}
      </header>
    </>
  );
};

export default HiringCandidateOfferHeader;
