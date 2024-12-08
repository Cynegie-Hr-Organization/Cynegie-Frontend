import DoughnutChart from '@/app/_components/shared/charts/donut-chart';
import DotLegend from '@/app/_components/shared/charts/legends/dot-legend';
import {
  color,
  defaultDonutChartData,
  defaultDonutChartOptions,
} from '@/constants';
import { Stack } from '@mui/material';

export type LeaveManagementChartProps = {
  title: string;
  usedDays: number;
  totalDays: number;
  usedDaysColor: string;
};

const getAvailableDays = (totalDays: number, usedDays: number) => {
  return totalDays - usedDays;
};

const chartLabels = ['Used Days', 'Unused/Available Days'];

const LeaveManagementChart: React.FC<LeaveManagementChartProps> = (props) => {
  const { title, usedDays, totalDays, usedDaysColor } = props;

  return (
    <Stack gap={5}>
      <div className='card-title-small'>{title}</div>
      <DoughnutChart
        data={{
          ...defaultDonutChartData,
          labels: chartLabels,
          datasets: [
            {
              ...defaultDonutChartData.datasets[0],
              data: [usedDays, getAvailableDays(totalDays, usedDays)],
              backgroundColor: [
                usedDaysColor,
                defaultDonutChartData.datasets[0].backgroundColor[1],
              ],
            },
          ],
        }}
        options={defaultDonutChartOptions}
        chartwidth={100}
        chartheight={60}
        centertext={{
          value: usedDays,
          denominator: totalDays,
        }}
      />
      <Stack gap={1}>
        {chartLabels.map((label, index) => (
          <DotLegend
            key={index}
            label={label}
            dotColor={index == 0 ? usedDaysColor : color.grey.light}
            value={
              index == 0 ? usedDays : getAvailableDays(totalDays, usedDays)
            }
            countedItemName='day'
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default LeaveManagementChart;
