'use client';
import { Grid2, Stack } from '@mui/material';
import EmployeeMyCoursesTable from '../../tables/my-courses';
import PageHeading from '../attendance-and-time-tracking/heading';
import PageContainer from '@/app/_components/shared/page/container';
import SummaryCards from './summary-cards';
import SummaryOfCompletedTraining from './summary-of-completed-training';
import Title from '@/app/_components/shared/section-with-cards/title';

const EmployeeLearningAndDevelopment = () => {
  return (
    <>
      <PageContainer>
        <PageHeading text='Learning and Development' />
        <Grid2 container spacing={2}>
          {[
            <SummaryCards key={0} />,
            <SummaryOfCompletedTraining key={1} />,
          ].map((component, index) => (
            <Grid2
              key={index}
              size={
                index === 0
                  ? { xs: 12, sm: 12, md: 5, lg: 7 }
                  : { xs: 12, sm: 12, md: 7, lg: 5 }
              }
            >
              {component}
            </Grid2>
          ))}
        </Grid2>
        <Stack gap={2}>
          <Title size='small' text='My Courses' />
          <EmployeeMyCoursesTable />
        </Stack>
      </PageContainer>
    </>
  );
};

export default EmployeeLearningAndDevelopment;
