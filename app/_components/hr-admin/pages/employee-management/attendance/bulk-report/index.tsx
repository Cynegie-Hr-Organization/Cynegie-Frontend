'use client';
import { FieldType } from '@/app/_components/shared/table/types';
import HrAdminEmployeeAttendanceManagementReport from '../report';

const HrAdminEmployeeAttendanceManagementBulkReport = () => {
  return (
    <HrAdminEmployeeAttendanceManagementReport
      title='Attendance Report (HR & IT Department: Oct 1 - Oct 15, 2024)'
      cards={[
        {
          labelText: 'Total Employees',
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
      tableProps={{
        headerRowData: [
          'Employee Name',
          'Staff ID',
          'Department',
          'Job Title',
          'Check In Time',
          'Clock-Out Time',
          'Hours Worked',
          'Status',
          'Overtime Hours',
        ],
        fieldTypes: [
          ...Array(7).fill(FieldType.text),
          FieldType.status,
          FieldType.text,
        ],
        displayedFields: [
          'name',
          'id',
          'department',
          'jobTitle',
          'checkInTime',
          'checkOutTime',
          'hoursWorked',
          'status',
          'overtimeHours',
        ],
        bodyRowData: Array(5).fill({
          name: 'Ayomide Alibaba',
          id: 'CYN0235',
          department: 'Product',
          jobTitle: 'Product Manager',
          checkInTime: '9:02 AM',
          checkOutTime: '4:56 PM',
          hoursWorked: '8',
          status: 'Absent',
          overtimeHours: '8',
        }),
        filters: [
          { name: 'Name', items: ['Emmanuel Okpara'] },
          { name: 'Department', items: ['Sales'] },
          { name: 'Job Title', items: ['Regional Manager'] },
          { name: 'Status', items: ['Present'] },
          { name: 'Date', items: ['Select Date'] },
        ],
      }}
    />
  );
};

export default HrAdminEmployeeAttendanceManagementBulkReport;
