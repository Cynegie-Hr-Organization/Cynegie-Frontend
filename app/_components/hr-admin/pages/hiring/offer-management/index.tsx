"use client";

import React from "react";
import HiringCandidateOfferHeader from "./header";
import Image from "next/image";

import OfferManagementTable from "./table-card";
import OverviewCards from "../cards/overview-card";

const HrAdminHiringOfferManagement: React.FC = () => {
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
          value="30"
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
          value="15"
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
          value="10"
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
          value="5"
        />
      </div>

      {/* Tabs Section*/}
      <div className="w-full">
        <OfferManagementTable />
      </div>
    </div>
  );
};

export default HrAdminHiringOfferManagement;
