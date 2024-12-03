'use client';
import Page from '@/app/_components/shared/page';
import leaveManagementPageData from './data';
import { Grid2, Stack } from '@mui/material';
import leaveManagementChartsData, {
  leaveManagementChartLabels,
} from './charts/data';
import DoughnutChart from '@/app/_components/shared/charts/donut-chart';
import {
  color,
  defaultDonutChartData,
  defaultDonutChartOptions,
} from '@/constants';
import DotLegend from './charts/legend';

const getAvailableDays = (totalDays: number, usedDays: number) => {
  return totalDays - usedDays;
};

const EmployeeLeaveManagementPage: React.FC = () => {
  return (
    <Page {...leaveManagementPageData}>
      <Grid2 container spacing={2}>
        {leaveManagementChartsData.map((section, index) => (
          <Grid2
            className='common-card'
            key={index}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Stack gap={5}>
              <div className=' card-title-small'>{section.title}</div>
              <DoughnutChart
                data={{
                  ...defaultDonutChartData,
                  labels: leaveManagementChartLabels,
                  datasets: [
                    {
                      ...defaultDonutChartData.datasets[0],
                      data: [
                        section.usedDays,
                        getAvailableDays(section.totalDays, section.usedDays),
                      ],
                      backgroundColor: [
                        section.usedDaysColor,
                        defaultDonutChartData.datasets[0].backgroundColor[1],
                      ],
                    },
                  ],
                }}
                options={defaultDonutChartOptions}
                chartWidth={100}
                chartHeight={60}
                centerText={{
                  value: section.usedDays,
                  denominator: section.totalDays,
                }}
              />
              <Stack gap={1}>
                {leaveManagementChartLabels.map((label, index) => (
                  <DotLegend
                    key={index}
                    label={label}
                    dotColor={
                      index == 0 ? section.usedDaysColor : color.grey.light
                    }
                    value={
                      index == 0
                        ? section.usedDays
                        : getAvailableDays(section.totalDays, section.usedDays)
                    }
                    countedItemName='day'
                  />
                ))}
              </Stack>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Page>
  );
};

export default EmployeeLeaveManagementPage;
