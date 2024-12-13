import HrAdminDashboardPage from "@/app/_components/hr-admin/pages/dashboard";
import Loading from "@/app/_components/shared/loading";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HrAdminDashboardPage />
    </Suspense>
  );
};

export default DashboardPage;
