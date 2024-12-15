'use client';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import TabFormat from '@/app/_components/shared/tabs/index';

const HrAdminEmployeeAttendanceManagement = () => {
  return (
    <Page
      title='Attendance Managment'
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: 'Generate Attendance Report',
      }}
    >
      <TabFormat
        tabs={[
          {
            name: 'Attendance Summary',
            component: (
              <Table
                hasActionsColumn
                headerRowData={[
                  'Employee Name',
                  'Staff ID',
                  'Department',
                  'Job Title',
                  'Check In Time',
                  'Clock-Out Time',
                  'Hours Worked',
                ]}
                fieldTypes={Array(7).fill(FieldType.text)}
                displayedFields={[
                  'name',
                  'id',
                  'department',
                  'jobTitle',
                  'checkInTime',
                  'checkOutTime',
                  'hoursWorked',
                ]}
                bodyRowData={Array(5).fill({
                  name: 'Ayomide Alibaba',
                  id: 'CYN0235',
                  department: 'Product',
                  jobTitle: 'Product Manager',
                  checkInTime: '9:02 AM',
                  checkOutTime: '4:56 PM',
                  hoursWorked: '8',
                })}
                filters={[
                  { name: 'Name', items: ['Emmanuel Okpara'] },
                  { name: 'Department', items: ['Sales'] },
                  { name: 'Job Title', items: ['Regional Manager'] },
                  { name: 'Status', items: ['Present'] },
                  { name: 'Date', items: ['Select Date'] },
                ]}
                actions={[
                  { name: 'Adjust Attendance', onClick: () => {} },
                  { name: 'Generate Report', onClick: () => {} },
                ]}
              />
            ),
          },
          {
            name: 'Leave Summary',
            component: (
              <Table
                headerRowData={[
                  'Employee Name',
                  'Staff ID',
                  'Department',
                  'Leave Type',
                  'Start Date',
                  'End Date',
                  'Days on Leave',
                ]}
                fieldTypes={Array(7).fill(FieldType.text)}
                displayedFields={[
                  'name',
                  'id',
                  'department',
                  'jobTitle',
                  'checkInTime',
                  'checkOutTime',
                  'hoursWorked',
                ]}
                bodyRowData={Array(5).fill({
                  name: 'Ayomide Alibaba',
                  id: 'CYN0235',
                  department: 'Product',
                  jobTitle: 'Product Manager',
                  checkInTime: '9:02 AM',
                  checkOutTime: '4:56 PM',
                  hoursWorked: '8',
                })}
                filters={[
                  { name: 'Department', items: ['Sales'] },
                  { name: 'Leave Type', items: ['Annual'] },
                  { name: 'Date', items: ['Select Date'] },
                ]}
              />
            ),
          },
        ]}
      />
    </Page>
  );
};

export default HrAdminEmployeeAttendanceManagement;
