"use client";

import React from "react";
import HiringCandidateManagementHeader from "./header";
import Image from "next/image";
import CandidateManagementTable from "./table-card";
import OverviewCards from "../cards/overview-card";
import { useJobCandidateMetrics } from "../hook/useHiringMetrics";

const HrAdminHiringCandidateManagement: React.FC = () => {
  const { metrics, loading, error } = useJobCandidateMetrics();

  // Handle error state
  if (error) {
    return (
      <div className="p-[4px] md:p-[30px] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-[4px] md:p-[30px]">
      <HiringCandidateManagementHeader />

      {/* Cards Section */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-2 xl:grid-cols-5 2xl:gap-4">
        <OverviewCards
          icon={
            <Image
              src="/open-positions.svg"
              alt="Open Positions Icon"
              width={30}
              height={30}
            />
          }
          title="Applied"
          value={metrics?.counts.Applied.toString() || "0"}
          loading={loading} // Pass loading state
        />
        <OverviewCards
          icon={
            <Image
              src="/open-positions.svg"
              alt="Open Positions Icon"
              width={30}
              height={30}
            />
          }
          title="Screened"
          value={metrics?.counts.Screened.toString() || "0"}
          loading={loading}
        />
        <OverviewCards
          icon={
            <Image
              src="/open-positions.svg"
              alt="Open Positions Icon"
              width={30}
              height={30}
            />
          }
          title="Interviewed"
          value={metrics?.counts.Interviewed.toString() || "0"}
          loading={loading}
        />
        <OverviewCards
          icon={
            <Image
              src="/open-positions.svg"
              alt="Open Positions Icon"
              width={30}
              height={30}
            />
          }
          title="Offer Appointment"
          value="23" // Hardcoded as requested
          loading={false} // No loading state for this card
        />
        <OverviewCards
          icon={
            <Image
              src="/open-positions.svg"
              alt="Open Positions Icon"
              width={30}
              height={30}
            />
          }
          title="Hired"
          value={metrics?.counts.Hired.toString() || "0"}
          loading={loading}
        />
      </div>

      {/* Tabs Section */}
      <div className="w-full">
        <CandidateManagementTable />
      </div>
    </div>
  );
};

export default HrAdminHiringCandidateManagement;