'use client';
import Modal from '@/app/_components/employee/modal';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import TabFormat from '@/app/_components/shared/tab-format';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { AttendanceStatusMap, route } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HrAdminEmployeeAttendanceManagement = () => {
  const router = useRouter();
  const [openAdjustAttendanceModal, setOpenAdjustAttendanceModal] =
    useState(false);
  const [openGenerateReportModal, setOpenGenerateReportModal] = useState(false);
  return (
    <Page
      title='Attendance Managment'
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: 'Generate Attendance Report',
        onClick: () =>
          router.push(
            route.hrAdmin.employeeManagement.attendanceManagement.bulkReport
          ),
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
                actions={[
                  {
                    name: 'Adjust Attendance',
                    onClick: () => setOpenAdjustAttendanceModal(true),
                  },
                  {
                    name: 'Generate Report',
                    onClick: () =>
                      router.push(
                        route.hrAdmin.employeeManagement.attendanceManagement
                          .individualReport
                      ),
                  },
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
                  'Backup Employee',
                ]}
                fieldTypes={Array(8).fill(FieldType.text)}
                displayedFields={[
                  'name',
                  'id',
                  'department',
                  'jobTitle',
                  'checkInTime',
                  'checkOutTime',
                  'hoursWorked',
                  'backupEmployee',
                ]}
                bodyRowData={Array(5).fill({
                  name: 'Ayomide Alibaba',
                  id: 'CYN0235',
                  department: 'Product',
                  jobTitle: 'Product Manager',
                  checkInTime: '9:02 AM',
                  checkOutTime: '4:56 PM',
                  hoursWorked: '8',
                  backupEmployee: 'N/A',
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
      {openAdjustAttendanceModal && (
        <Modal
          open={openAdjustAttendanceModal}
          onClose={() => setOpenAdjustAttendanceModal(false)}
          title='Adjust Attendance'
          subtitle='Make adjustments to the records for the selected employee'
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                name: 'Employee Name',
                type: 'text',
                value: 'John Emmanuel',
              },
              {
                name: 'Staff ID',
                type: 'text',
                value: 'CYN00117',
              },
              {
                name: 'Department',
                type: 'text',
                value: 'Finance',
              },
              {
                name: 'Date of Adjustment',
                type: 'text',
                value: 'November 12, 2024',
              },
              {
                name: 'Check - in Time',
                type: 'time',
              },
              {
                name: 'Check - out Time',
                type: 'time',
              },
              {
                name: 'Adjusted By',
                type: 'text',
              },
            ],
            buttonGroup: {
              leftButton: {
                type: ButtonType.outlined,
                text: 'Cancel',
                onClick: () => setOpenAdjustAttendanceModal(false),
              },
              rightButton: {
                type: ButtonType.contained,
                text: 'Save Changes',
                onClick: () => setOpenAdjustAttendanceModal(false),
              },
              position: 'center',
            },
          }}
        />
      )}
      {openGenerateReportModal && (
        <Modal
          open={openGenerateReportModal}
          onClose={() => setOpenGenerateReportModal(false)}
          title='Generate Attendance Report'
          subtitle='Select filters for the report'
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                name: 'Start Date',
                type: 'date',
              },
              {
                name: 'End Date',
                type: 'date',
              },
              {
                name: 'Department',
                type: 'select',
                placeholder: 'Select',
              },
              {
                name: 'Attendance Status',
                type: 'multi-select',
                placeholder: 'Select',
              },
            ],
            buttonGroup: {
              leftButton: {
                type: ButtonType.outlined,
                text: 'Cancel',
                onClick: () => setOpenGenerateReportModal(false),
              },
              rightButton: {
                type: ButtonType.contained,
                text: 'Generate Report',
                onClick: () => setOpenGenerateReportModal(false),
              },
              position: 'center',
            },
          }}
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeAttendanceManagement;
