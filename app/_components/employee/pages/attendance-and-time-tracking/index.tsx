/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Grid2 } from '@mui/material';
import LeaveBalance from './leave-balance';
import TotalHoursWorked from './total-hours-worked';
import SectionWithCards from '@/app/_components/shared/section-with-cards';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '../../../shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import useAttendanceRecordTable from './hooks/useAttendanceRecordTable';
import useClockInOut from './hooks/useClockInOut';
import Modal from '../../modal';
import { TableAction } from '@/app/_components/shared/table/types';
import Toast from '@/app/_components/shared/toast';

const EmployeeAttendanceAndTimeTracking = () => {
  const { attendanceRecordTableData, modalsData, currentAttendanceRecordsSectionData } = useAttendanceRecordTable();
  const { handleClockIn, handleClockOut, openToast, setOpenToast, toastMessage, toastStatus } = useClockInOut();

  const pageActions: TableAction[] = [
    { name: 'Clock In', onClick: handleClockIn },
    { name: 'Clock Out', onClick: handleClockOut },
  ];

  return (
    <>
      <Page
        title='Attendance and Time Tracking'
        hasButtons
        leftButton={{
          text: 'Clock Out',
          type: ButtonType.outlined,
          onClick: handleClockOut,
        }}
        rightButton={{
          text: 'Clock In',
          type: ButtonType.contained,
          onClick: handleClockIn,
        }}
        smActions={pageActions}
      >
        <Grid2 container spacing={2}>
          {[
            <SectionWithCards
              key={0}
              {...currentAttendanceRecordsSectionData}
            />,
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
        <Table {...attendanceRecordTableData} />
      </Page>
      {modalsData.map((data, index) => (
        <Modal key={index} {...data} />
      ))}
      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        status={toastStatus}
        message={toastMessage}
      />
    </>
  );
};

export default EmployeeAttendanceAndTimeTracking;