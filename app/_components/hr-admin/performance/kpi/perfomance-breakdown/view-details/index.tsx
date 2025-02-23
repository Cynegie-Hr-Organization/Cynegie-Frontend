"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import KPIReportCard from "./kpi-report-card";
import KPIBreakdown from "./kpi-breakdown";
import { useState } from "react";
import DownloadModalWrapper from "./download-modal";

const ViewDetailsPerformanceBreakdown = () => {
  const router = useRouter();
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  return (
    <div className="space-y-8 h-screen mb-6">
      <div className="hidden md:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/button-icon.svg"
            alt="back"
            width={24}
            height={24}
            className="object-contain cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-base text-gray-500 font-semibold">
            Back to KPI Dashboard
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setOpenDownloadModal(true)}
            className="font-bold rounded-lg px-4 py-2 text-white bg-primary h-12 w-[249px] btn-active flex items-center justify-center"
          >
            Download Report
          </button>
        </div>
      </div>
      <KPIReportCard />
      <div>
        <h2 className="text-black mb-2 font-semibold text-lg">KPI Breakdown</h2>
        <KPIBreakdown />
      </div>
      {openDownloadModal && (
        <DownloadModalWrapper
          open={openDownloadModal}
          onClose={() => setOpenDownloadModal(false)}
        />
      )}
    </div>
  );
};

export default ViewDetailsPerformanceBreakdown;
