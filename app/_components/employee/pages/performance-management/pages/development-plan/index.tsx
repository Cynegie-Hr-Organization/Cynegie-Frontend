'use client';
import Page from '@/app/_components/shared/page';
import useDevelopmentPlanPage from '../../hooks/useDevelopmentPlanPage';
import Table from '@/app/_components/shared/table';

const EmployeePerformanceManagementDevelopmentPlan = () => {
  const { pageData, tableData } = useDevelopmentPlanPage();
  return (
    <Page {...pageData}>
      <Table {...tableData} />
    </Page>
  );
};

export default EmployeePerformanceManagementDevelopmentPlan;
