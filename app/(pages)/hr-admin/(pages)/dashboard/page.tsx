import HrAdminDashboardPage from '@/app/_components/hr-admin/pages/dashboard';
import { Suspense } from 'react';

const DashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HrAdminDashboardPage />
    </Suspense>
  );
};

export default DashboardPage;
