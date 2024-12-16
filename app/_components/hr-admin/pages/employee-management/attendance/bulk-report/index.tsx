'use client';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';

const HrAdminEmployeeAttendanceManagementBulkReport = () => {
  return (
    <Page
      title='Attendance Managment'
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: 'Generate Attendance Report',
      }}
    ></Page>
  );
};

export default HrAdminEmployeeAttendanceManagementBulkReport;
