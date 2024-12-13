/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import EditJobForm from "@/app/_components/hr-admin/pages/hiring/overview/form/edit-job";
import EditJobPreview from "@/app/_components/hr-admin/pages/hiring/overview/form/edit-job/edit-job-preview";
import { useState } from "react";

const HiringOverviewEditJobPage = () => {
  const [screenInView, setScreenInView] = useState<number>(1);
  const [formData, setFormData] = useState<any>(null); // Shared state for form data

  return (
    <>
      {screenInView === 1 && (
        <EditJobForm
          setScreenInView={setScreenInView}
          setFormData={setFormData} // Pass setFormData function
        />
      )}
      {screenInView === 2 && (
        <EditJobPreview
          setScreenInView={setScreenInView}
          formData={formData} // Pass formData to preview
        />
      )}
    </>
  );
};

export default HiringOverviewEditJobPage;
