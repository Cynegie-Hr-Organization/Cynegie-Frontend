import React, { useEffect, useState } from "react";
import { fetchInterviewById } from "@/app/api/services/interview";

// Define the types for the interview response and data
interface InterviewDetailsProps {
  interviewId: string; // Expect the interviewId to be passed to the component
}

const InterviewDetailsHeader: React.FC<InterviewDetailsProps> = ({
  interviewId,
}) => {
  const [interviewData, setInterviewData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the interview details when the component mounts
  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const response = await fetchInterviewById(interviewId);
        console.log(response.data);
        setInterviewData(response.data); // Populate interview data from the API response
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch interview details", error);
        setLoading(false);
      }
    };

    getInterviewDetails();
  }, [interviewId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  // Return the interview details UI with dynamic data
  return (
    <div className="bg-white rounded-lg p-0 md:p-4">
      <h1 className="text-xl font-semibold mb-4">Interview Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Interviewer Name */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">
            Interviewer Name
          </h2>
          <p className="text-sm font-medium text-gray-900">
            {`${interviewData?.interviewer?.personalInfo?.firstName || "N/A"} ${interviewData?.interviewer?.personalInfo?.lastName || ""}`}
          </p>
        </div>

        {/* Applied Position */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">
            Applied Position
          </h2>
          <p className="text-sm font-medium text-gray-900">
            {typeof interviewData?.candidate.job === "string"
              ? interviewData.candidate.job
              : "N/A"}
          </p>
        </div>

        {/* Interview Date */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Interview Date</h2>
          <p className="text-sm font-medium text-gray-900">
            {interviewData?.startDate
              ? new Date(interviewData.startDate).toLocaleDateString()
              : "Date not available"}
          </p>
        </div>

        {/* Interview Time */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Interview Time</h2>
          <p className="text-sm font-medium text-gray-900">
            {interviewData?.startTime}
          </p>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Status</h2>
          <span className="inline-block w-fit px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
            {interviewData?.status || "Pending"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Candidate Name */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Candidate Name</h2>
          <p className="text-sm font-medium text-gray-900">
            {interviewData?.candidate.firstName}{" "}
            {interviewData?.candidate.lastName}
          </p>
        </div>

        {/* Resume */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Resume</h2>
          <a
            href="#"
            className="text-blue-600 inline-block w-fit px-2 rounded-full bg-[#E6EBF9] hover:underline items-center"
          >
            Resume .PDF
          </a>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Email</h2>
          <p className="text-sm font-medium text-gray-900">{""}</p>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-gray-500">Phone Number</h2>
          <p className="text-sm font-medium text-gray-900">{""}</p>
        </div>
      </div>

      {/* Interviewer Feedback */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-gray-500 mb-1">
          Interviewer Feedback
        </h2>
        <p className="text-sm font-medium text-gray-900">
          {"No feedback provided."}
        </p>
      </div>
    </div>
  );
};

export default InterviewDetailsHeader;
