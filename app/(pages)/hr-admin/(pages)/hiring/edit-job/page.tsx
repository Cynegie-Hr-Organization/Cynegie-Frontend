/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import EditJobForm from "@/app/_components/hr-admin/pages/hiring/overview/form/edit-job";
import EditJobPreview from "@/app/_components/hr-admin/pages/hiring/overview/form/edit-job/edit-job-preview";
import { Job } from "@/types";

import { useState } from "react";

const HiringOverviewEditJobPage = () => {
  const [screenInView, setScreenInView] = useState<number>(1);
  const [formData, setFormData] = useState<Job | null>(null);
  return (
    <>
      {screenInView === 1 && (
        <EditJobForm
          setScreenInView={setScreenInView}
          setFormData={setFormData}
        />
      )}
      {screenInView === 2 && (
        <EditJobPreview setScreenInView={setScreenInView} formData={formData} />
      )}
    </>
  );
};

export default HiringOverviewEditJobPage;
