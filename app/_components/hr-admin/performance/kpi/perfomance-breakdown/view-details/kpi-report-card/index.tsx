import React from "react";

const KPIReportCard = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 md:mb-8">
        Sarah Williams - Detailed KPI Report
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-gray-500 text-sm font-medium md:mb-8">
        <div>
          <p>Employee Name</p>
          <p className="text-black font-normal">Sarah Williams</p>
        </div>
        <div>
          <p>Department</p>
          <p className="text-black font-normal">Marketing</p>
        </div>
        <div>
          <p>Job Title</p>
          <p className="text-black font-normal">Senior Marketing Manager</p>
        </div>
        <div>
          <p>Manager</p>
          <p className="text-black font-normal">James Williams</p>
        </div>
        <div>
          <p>Assessment Period</p>
          <p className="text-black font-normal">Q1 2024</p>
        </div>
      </div>
    </div>
  );
};

export default KPIReportCard;
