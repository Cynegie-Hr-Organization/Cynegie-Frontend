"use client";

import React from "react";
import HiringOverviewHeader from "./overview/header";
import Image from "next/image";

import OverviewTabs from "./overview/tabs";
import BarChartComponent from "./overview/charts/line-bar-chart";
import PieChartComponent from "./overview/charts/pie-chart";
import OverviewCards from "./cards/overview-card";

const barChartData = [
  { name: 'Jan', Screening: 40, Interviewing: 30, Offered: 18, Hired: 12 },
  { name: 'Feb', Screening: 40, Interviewing: 28, Offered: 16, Hired: 12 },
  { name: 'Mar', Screening: 40, Interviewing: 30, Offered: 19, Hired: 12 },
  { name: 'Apr', Screening: 40, Interviewing: 27, Offered: 16, Hired: 12 },
  { name: 'May', Screening: 40, Interviewing: 30, Offered: 17, Hired: 12 },
  { name: 'Jun', Screening: 25, Interviewing: 18, Offered: 15, Hired: 6 },
  { name: 'Jul', Screening: 30, Interviewing: 20, Offered: 12, Hired: 7 },
  { name: 'Aug', Screening: 28, Interviewing: 17, Offered: 11, Hired: 6 },
  { name: 'Sep', Screening: 32, Interviewing: 22, Offered: 13, Hired: 8 },
  { name: 'Oct', Screening: 35, Interviewing: 25, Offered: 15, Hired: 9 },
  { name: 'Nov', Screening: 38, Interviewing: 28, Offered: 17, Hired: 10 },
  { name: 'Dec', Screening: 40, Interviewing: 30, Offered: 18, Hired: 12 },
];

const donutChartData = [
  { name: 'Accepted', value: 40, color: '#3b82f6' },
  { name: 'Pending', value: 20, color: '#f97316' },
  { name: 'Rejected', value: 10, color: '#ef4444' },
];

const HrAdminHiringOverview: React.FC = () => {
  return (
    <div className="space-y-4 p-[30px]">
      <HiringOverviewHeader />

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-4 2xl:gap-4">
        <OverviewCards
          icon={<Image src="/open-positions.svg" alt="Open Positions Icon" width={30} height={30} />}
          title="Open Positions"
          value="15"
        />
        <OverviewCards
          icon={<Image src="/total-application.svg" alt="Total Application Icon" width={30} height={30} />}
          title="Active Candidates"
          value="900"
        />
        <OverviewCards
          icon={<Image src="/total-candiate.svg" alt="Pending Offer Icon" width={30} height={30} />}
          title="Upcoming Interviews"
          value="15"
        />
        <OverviewCards
          icon={<Image src="/total-candiate.svg" alt="Interview Scheduled Icon" width={30} height={30} />}
          title="Offers extended "
          value="15"
        />
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-3 2xl:gap-4 items-stretch">
        {/* Bar Chart */}
        <div className="xl:col-span-2  bg-white shadow-sm rounded-xl border h-full">
          <BarChartComponent barChartData={barChartData} />
        </div>
        {/* Pie Chart */}
        <div className="xl:col-span-1 bg-white shadow-sm rounded-xl border h-full">
          <PieChartComponent donutChartData={donutChartData} />
        </div>
      </div>

      {/* Tabs Section*/}
      <div className="w-full">
        <OverviewTabs />
      </div>

    </div>
  );
};

export default HrAdminHiringOverview;
