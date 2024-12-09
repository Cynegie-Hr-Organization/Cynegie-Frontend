"use client";

import DashboardLayout from "./dashboard-layout";
import OverviewSection from "./overview-section";
import CandidatesSection from "./candidates-section";

const HrAdminDashboardPage = () => {
  return (
    <DashboardLayout>
      <OverviewSection />
      <CandidatesSection />
    </DashboardLayout>
  );
};

export default HrAdminDashboardPage;
