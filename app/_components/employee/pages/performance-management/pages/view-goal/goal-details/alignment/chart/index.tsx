import DotLegend from '@/app/_components/shared/charts/legends/dot-legend';
import DoughnutChart from '@/app/_components/shared/charts/donut-chart';
import {
  color,
  defaultDonutChartData,
  defaultDonutChartOptions,
} from '@/constants';
import { AlignmentGoalDetailsChartProps } from '../../types';

const AlignmentGoalDetailsChart: React.FC<AlignmentGoalDetailsChartProps> = (
  props
) => {
  const { value, status } = props;
  return (
    <div className='flex flex-col items-center gap-6'>
      <DoughnutChart
        data={{
          ...defaultDonutChartData,
          labels: ['', ''],
          datasets: [
            {
              data: [100 - (value ?? 100), value ?? 0],
              backgroundColor: [status?.color, color.progress.unfilled],
              borderWidth: 0,
              borderRadius: [42.3, 0],
              spacing: 0,
            },
          ],
        }}
        options={{ ...defaultDonutChartOptions, rotation: 360 }}
        chartwidth={100}
        chartheight={60}
        centertext={{ value: 50 }}
        isvaluepercentage
      />
      <DotLegend dotColor={status?.color} label={status?.label} />
    </div>
  );
};

export default AlignmentGoalDetailsChart;
