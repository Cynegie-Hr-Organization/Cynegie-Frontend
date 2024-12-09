import React, { useState } from "react";
import JobsTab from "./jobs";
import InterviewTab from "./interviews";

const OverviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState<"jobs" | "interview">("jobs");

  return (
    <div className="h-full w-full flex flex-col">
      {/* Tab buttons */}
      <div className="flex">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "jobs"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "border-b-2 border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedTab("jobs")}
        >
          Jobs
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "interview"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "border-b-2 border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedTab("interview")}
        >
          Interviews
        </button>
      </div>

      {/* Tab content */}
      <div className=" w-full mt-4">
        {selectedTab === "jobs" ? <JobsTab /> : <InterviewTab />}
      </div>
    </div>
  );
};

export default OverviewTabs;
