import HrAdminDashboardPage from '@/app/_components/hr-admin/pages/dashboard';
import HrAdminInterviewDetailsPage from '@/app/_components/hr-admin/pages/hiring/interview-details';
import HrAdminHiringOverviewPage from '@/app/_components/hr-admin/pages/hiring/overview';
import HrAdminPayrollOverviewPage from '@/app/_components/hr-admin/pages/payroll-management/pages/overview';
import CancelInterviewModal from '@/app/_components/modals/cancel-interview';

const DashboardPage = () => {
  return <HrAdminPayrollOverviewPage />;
};

export default DashboardPage;
