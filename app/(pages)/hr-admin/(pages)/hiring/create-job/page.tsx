/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CreateJobForm from "@/app/_components/hr-admin/pages/hiring/overview/form/create-job";
import JobPreview from "@/app/_components/hr-admin/pages/hiring/overview/form/create-job/create-job-preview";

import { useState } from "react";

const HiringOverviewCreateJobPage = () => {
  const [screenInView, setScreenInView] = useState<number>(1);
  return (
    <>
      {screenInView === 1 && (
        <CreateJobForm setScreenInView={setScreenInView} />
      )}
      {screenInView === 2 && <JobPreview setScreenInView={setScreenInView} />}
    </>
  );
};

export default HiringOverviewCreateJobPage;
