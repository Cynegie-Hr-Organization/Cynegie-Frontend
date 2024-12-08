import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { LeaveManagementChartProps } from '../chart';
import { color } from '@/constants';

const useLeaveManagementPage = () => {
  const pageData: PageProps = {
    text: 'Leave Management',
    subtitle: 'Access your Leave Management',
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: 'Request Leave',
    },
  };

  const chartsData: LeaveManagementChartProps[] = [
    {
      title: 'Maternity/Paternity Leave',
      usedDays: 60,
      totalDays: 60,
      usedDaysColor: color.warning.dark,
    },
    {
      title: 'Annual Leave',
      usedDays: 0,
      totalDays: 20,
      usedDaysColor: color.success.dark,
    },
    {
      title: 'Sick Leave',
      usedDays: 2,
      totalDays: 10,
      usedDaysColor: color.info.dark,
    },
    {
      title: 'Exam Leave',
      usedDays: 1,
      totalDays: 10,
      usedDaysColor: color.error.dark,
    },
  ];
  return { pageData, chartsData };
};

export default useLeaveManagementPage;
