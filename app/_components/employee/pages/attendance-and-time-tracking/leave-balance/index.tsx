import { Stack } from '@mui/material';
import LeaveBalanceLegend from './legend';
import Title from '@/app/_components/shared/section-with-cards/title';
import leaveBalanceChartData from './chart/data';
import DoughnutChart from '@/app/_components/shared/charts/donut-chart';
import { defaultDonutChartOptions } from '@/constants';

const LeaveBalance = () => {
  return (
    <Stack gap={4}>
      <DoughnutChart
        data={leaveBalanceChartData}
        options={{
          ...defaultDonutChartOptions,
          rotation: 270,
          cutout: '85%',
        }}
        chartWidth={100}
        chartHeight={60}
        centerText={{ value: 5, label: 'Days' }}
        containerSx={{ height: '166px' }}
      />
      <Title text='Leave Balance' />
      <LeaveBalanceLegend />
    </Stack>
  );
};

export default LeaveBalance;
