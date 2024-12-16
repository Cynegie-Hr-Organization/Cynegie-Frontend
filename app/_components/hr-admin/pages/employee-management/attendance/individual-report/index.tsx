'use client';
import HrAdminEmployeeAttendanceManagementReport from '../report';
import { FieldType } from '@/app/_components/shared/table/types';

const HrAdminEmployeeAttendanceManagementIndividualReport = () => {
  return (
    <HrAdminEmployeeAttendanceManagementReport
      title='Attendance Report for Emmanuel Okpara (Oct 15, 2024 - Oct 25, 2024)'
      cards={[
        {
          labelText: 'Total Days Analyzed',
          value: '15 Days',
          valueBelow: true,
        },
        {
          labelText: 'On Leave',
          value: '0 Days',
          valueBelow: true,
        },
        {
          labelText: 'Present',
          value: '10 Days',
          valueBelow: true,
        },
        {
          labelText: 'Absent',
          value: '3 Days',
          valueBelow: true,
        },
      ]}
      tableProps={{
        hasActionsColumn: false,
        headerRowData: [
          'Date',
          'Check In Time',
          'Clock-Out Time',
          'Hours Worked',
          'Status',
          'Overtime Hours',
        ],
        fieldTypes: [
          ...Array(4).fill(FieldType.text),
          FieldType.status,
          FieldType.text,
        ],
        displayedFields: [
          'date',
          'checkInTime',
          'checkOutTime',
          'hoursWorked',
          'status',
          'overtimeHours',
        ],
        bodyRowData: Array(5).fill({
          date: 'Oct 1, 2024',
          checkInTime: '9:02 AM',
          checkOutTime: '4:56 PM',
          hoursWorked: '8',
          status: 'Absent',
          overtimeHours: 'N/A',
        }),
        filters: [{ name: 'Status', items: ['Present'] }],
      }}
    />
  );
};

export default HrAdminEmployeeAttendanceManagementIndividualReport;
