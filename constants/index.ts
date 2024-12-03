import { ChartOptions } from 'chart.js';

export const iconBaseUrl = '/icons/';

export const icon = {
  graduatingCap: `${iconBaseUrl}graduating-cap.svg`,
  square: `${iconBaseUrl}square.svg`,
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
