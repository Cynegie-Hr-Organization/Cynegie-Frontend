import ItAdminDashboard from "@/app/_components/it-admin/pages/it-admin";
import Loading from "@/app/_components/shared/loading";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ItAdminDashboard />
    </Suspense>
  );
};

export default DashboardPage;
