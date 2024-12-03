import { color } from '@/constants';

type LeaveManagementChartsSection = {
  title: string;
  usedDays: number;
  totalDays: number;
  usedDaysColor: string;
};

export const leaveManagementChartLabels = [
  'Used Days',
  'Unused/Available Days',
];

const leaveManagementChartsData: LeaveManagementChartsSection[] = [
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

export default leaveManagementChartsData;
