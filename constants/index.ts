import { Filter, StatusMap } from '@/app/_components/shared/table/types';
import { ChartOptions } from 'chart.js';

export const iconBaseUrl = '/icons/';

export const icon = {
  graduatingCap: `${iconBaseUrl}graduating-cap.svg`,
  square: `${iconBaseUrl}square.svg`,
  bin: `${iconBaseUrl}bin.svg`,
};

export const color = {
  primary: {
    dark: '#0035C3',
  },
  success: {
    dark: '#099137',
    light: '#E7F6EC',
  },
  info: {
    dark: '#0035C3',
    light: '#E6EBF9',
  },
  warning: {
    dark: '#FF9900',
    light: '#FFF5E6',
  },
  error: {
    dark: '#CB1A14',
    light: '#FBEAE9',
  },
  grey: {
    dark: '#000000',
    light: '#E6EBF9',
  },
  button: {
    contained: {
      backgroundColor: '#0035C3',
      color: '#FFFFFF',
    },
    outlined: {
      backgroundColor: '#FFFFFF',
      color: '#475367',
      borderColor: '#98A2B3',
    },
    filter: {
      backgroundColor: '#FFFFFF',
      color: '#344054',
      borderColor: '#D0D5DD',
    },
    disabled: {
      backgroundColor: '#98A2B3',
      color: '#101928',
      borderColor: '#98A2B3',
    },
  },
  progress: {
    filled: '#475367',
    unfilled: '#F0F2F5',
  },
};

export const defaultDonutChartData = {
  labels: ['', ''],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: [color.info.dark, '#F0F2F5'],
      borderWidth: 0,
      borderRadius: [0, 0],
      spacing: -10,
    },
  ],
};

export const defaultDonutChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  events: [],
  cutout: '85%',
};

export const APRStatusMap: StatusMap = {
  Approved: 'success',
  Pending: 'warning',
  Rejected: 'error',
};

export const CISStatusMap: StatusMap = {
  Completed: 'success',
  'In Progress': 'warning',
  'Not Started': 'error',
};

export const CPStatusMap: StatusMap = {
  Completed: 'success',
  Pending: 'warning',
};

export const AttendanceStatusMap: StatusMap = {
  Present: 'grey',
  Late: 'info',
  Absent: 'error',
};

export const tableFilter = {
  department: { name: 'Department', items: ['All', 'Sales', 'Finance', 'IT'] },
  status: {
    name: 'Status',
    items: ['All', 'Approved', 'Pending', 'Rejected'],
  },
};

const basePath = {
  employee: '/employee/',
  performanceManagement: 'performance-management/',
  learningDevelopment: 'learning-development',
};

export const route = {
  employee: {
    performanceManagement: {
      home: `${basePath.employee}${basePath.performanceManagement}`,
      selfAssessment: `${basePath.employee}${basePath.performanceManagement}self-assessment`,
      viewGoal: `${basePath.employee}${basePath.performanceManagement}view-goal`,
      continuousFeedback: `${basePath.employee}${basePath.performanceManagement}continuous-feedback`,
      developmentPlan: `${basePath.employee}${basePath.performanceManagement}development-plan`,
      viewDevelopmentPlan: `${basePath.employee}${basePath.performanceManagement}view-development-plan`,
    },
    learningDevelopment: {
      home: `${basePath.employee}${basePath.learningDevelopment}`,
      viewDetails: `${basePath.employee}${basePath.learningDevelopment}view-course-details`,
    },
  },
};
