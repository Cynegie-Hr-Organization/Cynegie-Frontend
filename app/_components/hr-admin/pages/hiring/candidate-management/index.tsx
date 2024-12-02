"use client";

import React from "react";
import HiringCandidateManagementHeader from "./header";
import Image from "next/image";

import CandidateManagementTable from "./table-card";
import OverviewCards from "../cards/overview-card";

const HrAdminHiringCandidateManagement: React.FC = () => {
  return (
    <div className="space-y-4 p-[15px] md:p-[30px]">
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
          value="327"
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
          value="304"
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
          value="56"
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
          title="Offer Appointment "
          value="23"
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
          value="23"
        />
      </div>

      {/* Tabs Section*/}
      <div className="w-full">
        <CandidateManagementTable />
      </div>
    </div>
  );
};

export default HrAdminHiringCandidateManagement;
