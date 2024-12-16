'use client';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import CardGroup from '@/app/_components/shared/section-with-cards/card-group';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { AttendanceStatusMap, route } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DownloadReportModal from '../../../payroll-management/modals/download-report';

const HrAdminEmployeeAttendanceManagementBulkReport = () => {
  const router = useRouter();
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  return (
    <Page
      backText='Back to Attendance Management'
      onBackTextClick={() =>
        router.push(route.hrAdmin.employeeManagement.attendanceManagement.home)
      }
      title='Attendance Report (HR & IT Department: Oct 1 - Oct 15, 2024)'
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: 'Download Report',
        onClick: () => setOpenDownloadModal(true),
      }}
    >
      <CardGroup
        cards={[
          {
            labelText: 'Total Employee',
            value: 120,
            valueBelow: true,
          },
          {
            labelText: 'Total Days Analyzed',
            value: 15,
            valueBelow: true,
          },
          {
            labelText: 'Present Employees',
            value: 80,
            valueBelow: true,
          },
          {
            labelText: 'Absent Employees',
            value: 25,
            valueBelow: true,
          },
        ]}
        gridItemSize={{ xs: 12, sm: 6, md: 3 }}
      />
      <Table
        headerRowData={[
          'Employee Name',
          'Staff ID',
          'Department',
          'Job Title',
          'Check In Time',
          'Clock-Out Time',
          'Hours Worked',
          'Status',
          'Overtime Hours',
        ]}
        fieldTypes={[
          ...Array(7).fill(FieldType.text),
          FieldType.status,
          FieldType.text,
        ]}
        displayedFields={[
          'name',
          'id',
          'department',
          'jobTitle',
          'checkInTime',
          'checkOutTime',
          'hoursWorked',
          'status',
          'overtimeHours',
        ]}
        bodyRowData={Array(5).fill({
          name: 'Ayomide Alibaba',
          id: 'CYN0235',
          department: 'Product',
          jobTitle: 'Product Manager',
          checkInTime: '9:02 AM',
          checkOutTime: '4:56 PM',
          hoursWorked: '8',
          status: 'Absent',
          overtimeHours: '8',
        })}
        statusMap={AttendanceStatusMap}
        filters={[
          { name: 'Name', items: ['Emmanuel Okpara'] },
          { name: 'Department', items: ['Sales'] },
          { name: 'Job Title', items: ['Regional Manager'] },
          { name: 'Status', items: ['Present'] },
          { name: 'Date', items: ['Select Date'] },
        ]}
      />
      {openDownloadModal && (
        <DownloadReportModal
          open={openDownloadModal}
          onCloseFn={() => setOpenDownloadModal(false)}
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeAttendanceManagementBulkReport;
