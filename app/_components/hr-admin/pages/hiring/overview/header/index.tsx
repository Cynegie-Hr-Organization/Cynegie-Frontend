import React from "react";

const HiringOverviewHeader = () => {

  return (
    <header className="flex flex-row justify-between items-center  ">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 md:mb-4 ">Overview</h1>
      <div className="flex flex-row   items-center">
        

        <button className="px-6 py-2 text-base font-semibold bg-primary500 text-white rounded-lg hover:bg-blue-600 focus:outline-none ">
          Create new job
        </button>

       
      </div>
    </header>
  );
};

export default HiringOverviewHeader;
