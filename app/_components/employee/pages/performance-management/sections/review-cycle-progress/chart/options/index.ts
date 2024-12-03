import { ChartOptions } from 'chart.js';

const reviewCycleProgressChartOptions: ChartOptions<'doughnut'> = {
  rotation: 270,
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

export default reviewCycleProgressChartOptions;
