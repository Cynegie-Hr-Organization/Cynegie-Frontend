"use client";

import React, { useCallback, useEffect, useState } from "react";
import HiringCandidateDetailsHeader from "./header";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ProfileDetails from "./profile-details";
import CandidateCard from "./candidate-card";
import { fetchCandidateById } from "@/app/api/services/candidate";
import { CandidateResponse } from "@/types";

// Skeleton Loader component
const SkeletonLoader = () => (
  <div className="space-y-4">
    <div className="w-full h-8 bg-gray-200 rounded-md animate-pulse"></div>
    <div className="w-full h-12 bg-gray-200 md:mb-12 rounded-md animate-pulse"></div>
    <div className="w-full h-56 bg-gray-200 rounded-md animate-pulse"></div>
    <div className="w-full h-60 bg-gray-200 rounded-md animate-pulse"></div>
  </div>
);

const HrAdminHiringCandidateDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const candidateId = typeof id === "string" ? id : "";

  const [candidate, setCandidate] = useState<CandidateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = useCallback(async () => {
    if (!candidateId) return;
    setIsLoading(true);
    try {
      const response = await fetchCandidateById(candidateId);
      setCandidate(response.data);
    } catch (err) {
      console.error("Error fetching candidate data:", err);
      setError("Failed to load candidate details.");
    } finally {
      setIsLoading(false);
    }
  }, [candidateId]);

  useEffect(() => {
    fetchCandidate();
  }, [candidateId, fetchCandidate]);

  const refetch = () => {
    fetchCandidate(); // Refetch the candidate data
  };

  if (isLoading) {
    return (
      <div className="p-[15px] flex gap-4 flex-col md:p-[30px]">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!candidate) {
    return <div className="p-4 text-center">No candidate data found.</div>;
  }

  return (
    <div className="p-[15px] flex gap-4 flex-col md:p-[30px]">
      <div className="flex justify-start items-center gap-2">
        <Image
          src="/button-icon.svg"
          alt="Create New Job"
          width={24}
          height={24}
          className="object-contain"
          onClick={() => router.back()}
        />
        <h1 className="text-base text-gray-500 font-semibold">
          Back to Candidate Management
        </h1>
      </div>
      <HiringCandidateDetailsHeader
        candidate={candidate?.id}
        refetch={refetch}
      />
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md">
        <CandidateCard candidate={candidate} />
      </div>
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md">
        <ProfileDetails
          about={candidate?.firstName + " " + candidate?.lastName}
          experiences={candidate?.job?.experience}
          attachedFile="file.pdf"
        />
      </div>
    </div>
  );
};

export default HrAdminHiringCandidateDetails;
