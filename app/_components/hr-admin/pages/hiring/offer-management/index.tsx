"use client";

import React from "react";
import HiringCandidateOfferHeader from "./header";
import Image from "next/image";
import OfferManagementTable from "./table-card";
import OverviewCards from "../cards/overview-card";
import { useOfferManagementMetrics } from "../hook/useOfferManagement";

const HrAdminHiringOfferManagement: React.FC = () => {
  const { metrics, loading, error } = useOfferManagementMetrics();

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
      <HiringCandidateOfferHeader />

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-4 2xl:gap-4">
        <OverviewCards
          icon={
            <Image
              src="/open-positions.svg"
              alt="Open Positions Icon"
              width={30}
              height={30}
            />
          }
          title="Offers sent"
          value={metrics?.total.toString() || "0"} // Use total for "Offers sent"
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
          title="Pending"
          value={metrics?.counts.Pending.toString() || "0"}
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
          title="Accepted"
          value={metrics?.counts.Accepted.toString() || "0"}
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
          title="Rejected"
          value={metrics?.counts.Rejected.toString() || "0"}
          loading={loading}
        />
      </div>

      {/* Tabs Section */}
      <div className="w-full">
        <OfferManagementTable />
      </div>
    </div>
  );
};

export default HrAdminHiringOfferManagement;