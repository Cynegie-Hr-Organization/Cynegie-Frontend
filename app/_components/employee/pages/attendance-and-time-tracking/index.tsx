'use client';
import { Grid2 } from '@mui/material';
import EmployeeAttendanceRecordTable from '../../tables/attendance-record';
import LeaveBalance from './leave-balance';
import TotalHoursWorked from './total-hours-worked';
import SectionWithCards from '@/app/_components/shared/section-with-cards';
import currentAttendanceRecordsSectionData from './data/section/current-attendance-records';
import Page from '@/app/_components/shared/page';

const EmployeeAttendanceAndTimeTracking = () => {
  return (
    <Page
      text='Attendance and Time Tracking'
      hasButtons
      outlinedButton={{ text: 'Clock Out' }}
      containedButton={{ text: 'Clock In' }}
    >
      <Grid2 container spacing={2}>
        {[
          <SectionWithCards key={0} {...currentAttendanceRecordsSectionData} />,
          <LeaveBalance key={1} />,
          <TotalHoursWorked key={2} />,
        ].map((item, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 12, md: index == 2 ? 12 : 6, lg: 4 }}
            sx={{ height: '100%' }}
            className='common-card'
          >
            {item}
          </Grid2>
        ))}
      </Grid2>
      <EmployeeAttendanceRecordTable />
    </Page>
  );
};

export default EmployeeAttendanceAndTimeTracking;
