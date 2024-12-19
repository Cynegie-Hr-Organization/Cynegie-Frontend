import { Box, Stack } from '@mui/material';
import BarChart from './chart';
import Header from '@/app/_components/shared/section-with-cards/header';
import totalHoursWorkedChartData from './chart/data';

const TotalHoursWorked = () => {
  return (
    <Stack gap={2}>
      <Header title='Total Hours Worked' period='This week' titleSize='large' />
      <Box ml={-5}>
        <BarChart data={totalHoursWorkedChartData} />
      </Box>
    </Stack>
  );
};

export default TotalHoursWorked;
