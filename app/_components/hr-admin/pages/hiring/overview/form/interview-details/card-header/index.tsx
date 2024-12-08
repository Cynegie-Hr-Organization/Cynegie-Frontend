import React from "react";

const InterviewDetailsHeader = () => {
  return (
    <div className="bg-white  rounded-lg p-4">
      <h1 className="text-xl font-semibold mb-4">Interview Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Interviewer Name */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">
            Interviewer Name
          </h2>
          <p className="text-sm font-medium text-gray-900">Emmanuel Jacob</p>
        </div>

        {/* Applied Position */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">
            Applied Position
          </h2>
          <p className="text-sm font-medium text-gray-900">Senior Manager</p>
        </div>

        {/* Interview Date */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Interview Date</h2>
          <p className="text-sm font-medium text-gray-900">November 15, 2024</p>
        </div>

        {/* Interview Time */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Interview Time</h2>
          <p className="text-sm font-medium text-gray-900">10:00 AM</p>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Status</h2>
          <span className="inline-block w-fit px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
            Completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Candidate Name */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Candidate Name</h2>
          <p className="text-sm font-medium text-gray-900">Emmanuel Jacob</p>
        </div>

        {/* Resume */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Resume</h2>
          <a
            href="#"
            className="text-blue-600 inline-block w-fit px-3  rounded-full bg-[#E6EBF9] hover:underline inline-flex items-center"
          >
            Resume .PDF
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Email</h2>
          <p className="text-sm font-medium text-gray-900">
            Emmanuel@gmail.com
          </p>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Phone Number</h2>
          <p className="text-sm font-medium text-gray-900">0904567890</p>
        </div>
      </div>

      {/* Interviewer Feedback */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-gray-500 mb-1">
          Interviewer Feedback
        </h2>
        <p className="text-sm font-medium text-gray-900">
          Candidate showed strong communication and collaboration skills
        </p>
      </div>
    </div>
  );
};

export default InterviewDetailsHeader;
