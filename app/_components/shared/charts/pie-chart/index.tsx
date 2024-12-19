import { defaultDonutChartData, defaultDonutChartOptions } from '@/constants';
import DoughnutChart from '../donut-chart';
import DotLegend from '../legends/dot-legend';

type PieChartProps = {
  chartLabels: string[];
  chartValues: number[];
  chartColors: string[];
};

const PieChart: React.FC<PieChartProps> = ({
  chartLabels,
  chartValues,
  chartColors,
}) => {
  return (
    <div className='flex items-center h-full justify-center ml-[-40]'>
      <div className='grid grid-cols-5'>
        <div className='col-span-3'>
          <DoughnutChart
            data={{
              ...defaultDonutChartData,
              labels: chartLabels,
              datasets: [
                {
                  data: chartValues,
                  backgroundColor: chartColors,
                  borderWidth: 0,
                  spacing: 0,
                },
              ],
            }}
            options={{
              ...defaultDonutChartOptions,
              cutout: 0,
              rotation: 180,
            }}
            chartwidth={1}
            chartheight={1}
          />
        </div>
        <div className='col-span-2 flex items-center'>
          <div className='flex flex-col gap-2'>
            {chartLabels.map((label, index) => (
              <DotLegend
                key={label}
                dotColor={chartColors[index]}
                label={label}
                value={chartValues[index]}
                countedItemName={''}
                isPercentage
                boldValue
                type='meeting-indicator'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
