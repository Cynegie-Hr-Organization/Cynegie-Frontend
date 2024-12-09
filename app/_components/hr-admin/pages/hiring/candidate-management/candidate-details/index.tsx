"use client";

import React from "react";
import HiringCandidateDetailsHeader from "./header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileDetails from "./profile-details";
import CandidateCard from "./candidate-card";

const HrAdminHiringCandidateDetails: React.FC = () => {
  const router = useRouter();

  return (
    <div className="p-[15px]  flex gap-4 flex-col md:p-[30px]">
      <div className="flex  justify-start items-center gap-2">
        <Image
          src="/button-icon.svg"
          alt="Create New Job"
          width={24}
          height={24}
          className="object-contain"
          onClick={() => router.back()}
        />
        <h1 className="text-base text-gray-500 font-semibold">
          Back to Candidate Management{" "}
        </h1>
      </div>
      <HiringCandidateDetailsHeader />
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
        <CandidateCard />
      </div>
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
        <ProfileDetails />
      </div>
    </div>
  );
};

export default HrAdminHiringCandidateDetails;
