/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import EditJobForm from '@/app/_components/hr-admin/pages/hiring/overview/form/edit-job';
import EditJobPreview from '@/app/_components/hr-admin/pages/hiring/overview/form/edit-job/edit-job-preview';


import { useState } from 'react';

const HiringOverviewEditJobPage = () => {
  const [screenInView, setScreenInView] = useState<number>(1);
  return (
      <>
      {screenInView === 1 && <EditJobForm  setScreenInView={setScreenInView} />}
      {screenInView === 2 && <EditJobPreview setScreenInView={setScreenInView} />}
    </>
  );
};

export default HiringOverviewEditJobPage;