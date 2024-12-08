'use client';
import Page from '@/app/_components/shared/page';
import useLeaveManagementPage from './hooks/useLeaveManagementPage';
import LeaveManagementChart from './chart';

const EmployeeLeaveManagement: React.FC = () => {
  const { pageData, chartsData } = useLeaveManagementPage();
  return (
    <Page {...pageData}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {chartsData.map((chart) => (
          <div key={chart.title} className='common-card'>
            <LeaveManagementChart {...chart} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default EmployeeLeaveManagement;
