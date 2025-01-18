/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Grid2 } from '@mui/material';
import LeaveBalance from './leave-balance';
import TotalHoursWorked from './total-hours-worked';
import SectionWithCards from '@/app/_components/shared/section-with-cards';
import currentAttendanceRecordsSectionData from './current-attendance-records/data';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '../../../shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import useAttendanceRecordTable from './hooks/useAttendanceRecordTable';
import Modal from '../../modal';
import { TableAction } from '@/app/_components/shared/table/types';
import Toast from '@/app/_components/shared/toast';
import { useState } from 'react';
import { clockIn, clockOut, fetchAttendanceMine } from '@/app/api/services/employee/attendance';

const EmployeeAttendanceAndTimeTracking = () => {
  const { attendanceRecordTableData, modalsData } = useAttendanceRecordTable();
  const [openToast, setOpenToast] = useState(false);
  const [openClockOutToast, setOpenClockOutToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStatus, setToastStatus] = useState<'Successful' | 'Error'>('Successful');

 const handleClockIn = async () => {
  try {
    const payload = { date: new Date().toISOString() };
    const response = await clockIn(payload); 
    console.log('Clock In Response:', response);
    setToastMessage('You have successfully clocked in!');
    setToastStatus('Successful');
    setOpenToast(true);
  } catch (error) {
    console.error('Clock In Error:', error);
    setToastMessage('Failed to clock in. Please try again.');
    setToastStatus('Error');
    setOpenToast(true);
  }
};


  
  const handleClockOut = async () => {
  try {
    const attendanceRecords = await fetchAttendanceMine();

    if (!attendanceRecords || attendanceRecords.length === 0) {
      throw new Error("No attendance records found.");
    }

    // Sort records by date (or updatedAt) in descending order and get the latest record's ID
    const lastAttendanceRecord = attendanceRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    if (!lastAttendanceRecord) {
      throw new Error("No attendance record found.");
    }

    const payload = { id: lastAttendanceRecord.id, date: new Date().toISOString() };
    const response = await clockOut(payload.id); 
    console.log('Clock Out Response:', response); // TODO: Remove this line
    setToastMessage('You have successfully clocked out!');
    setToastStatus('Successful');
    setOpenClockOutToast(true);
  } catch (error) {
    console.error('Clock Out Error:', error); 
    setToastMessage('Failed to clock out. Please try again.');
    setToastStatus('Error');
    setOpenClockOutToast(true);
  } 
};


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
      <Toast
        open={openClockOutToast}
        onClose={() => setOpenClockOutToast(false)}
        status={toastStatus}
        message={toastMessage}
      />
    </>
  );
};

export default EmployeeAttendanceAndTimeTracking;
