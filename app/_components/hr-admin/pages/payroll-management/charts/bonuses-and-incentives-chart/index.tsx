import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'doughnut'> = {
  rotation: -90,
  circumference: 180,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  cutout: '70%',
};

const data = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      data: [2764000, 29764000],
      backgroundColor: ['#8AA2E3', '#0035C3'],
      borderWidth: 0,
    },
  ],
};

const BonusAndIncentivesChart = () => {
  return <Doughnut data={data} options={options} />;
};

export default BonusAndIncentivesChart;
