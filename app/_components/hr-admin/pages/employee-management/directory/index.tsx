'use client';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import SectionWithCards from '@/app/_components/shared/section-with-cards';
import CardGroup from '@/app/_components/shared/section-with-cards/card-group';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import PendingApprovalRequests from './pending-approval-requests';
import Modal from '@/app/_components/employee/modal';
import SvgIcon from '@/app/_components/icons/container';
import { color, icon, route } from '@/constants';
import { ColorVariant } from '@/types';
import { useRouter } from 'next/navigation';
import PieChart from '@/app/_components/shared/charts/pie-chart';
import { useState } from 'react';
import Toast from '@/app/_components/shared/toast';

const chartLabels = [
  'Full Time',
  'Part Time',
  'Contract',
  'Intern',
  'Freelancer',
];
const chartValues = [50, 20, 10, 15, 5];
const chartColors = [
  color.pieChart.info,
  color.pieChart.success,
  color.pieChart.warning,
  color.pieChart.error,
  color.pieChart.grey,
];

const HrAdminEmployeeDirectory = () => {
  const router = useRouter();
  const cardIcon = (
    <SvgIcon path={icon.userGroup} width={13.56} height={13.56} />
  );
  const cardIconColorVariant: ColorVariant = 'grey';

  const [openTerminateEmployeeModal, setOpenTerminateEmployeeModal] =
    useState(false);
  const [openTerminationToast, setOpenTerminationToast] = useState(false);

  return (
    <Page
      title='Employee Management'
      subtitle='Manage access to all employees in your organization'
      hasButtons
      leftButton={{
        type: ButtonType.outlined,
        text: 'Actions',
        popoverOptions: [
          { name: 'Manage Department', onClick: () => {} },
          { name: 'Manage Roles', onClick: () => {} },
          { name: 'Manage Attendance', onClick: () => {} },
        ],
      }}
      rightButton={{
        type: ButtonType.contained,
        text: 'Add Employee',
        onClick: () =>
          router.push(route.hrAdmin.employeeManagement.directory.addEmployee),
      }}
    >
      <CardGroup
        cards={[
          {
            labelText: 'Total Headcount',
            value: 190,
            valueBelow: true,
          },
          {
            labelText: 'New Hires',
            value: 32,
            valueBelow: true,
          },
          {
            labelText: 'Open Positions',
            value: 2,
            valueBelow: true,
          },
          {
            labelText: 'Departure',
            value: 7,
            valueBelow: true,
          },
        ]}
        gridItemSize={{ xs: 12, sm: 6, md: 3 }}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <SectionCardContainer isCard title='Employment Type Distribution'>
          <PieChart
            chartLabels={chartLabels}
            chartValues={chartValues}
            chartColors={chartColors}
          />
        </SectionCardContainer>
        <SectionWithCards
          isCard
          title='Attendance Overview'
          period='See all'
          periodClick={() =>
            router.push(
              route.hrAdmin.employeeManagement.attendanceManagement.home
            )
          }
          cardsGroup={{
            gridItemSize: { xs: 12, sm: 6 },
            cards: [
              {
                value: `${190} hours`,
                labelText: 'Total Working Hours',
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
              {
                value: `${8} hours`,
                labelText: 'Avg working hrs per Employee',
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
              {
                value: `${4}%`,
                labelText: 'Absenteeism Rate',
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
              {
                value: 26,
                labelText: 'Total Working Hours',
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
            ],
          }}
        />
        <div className='col-span-1 md:col-span-2 lg:col-span-1'>
          <SectionCardContainer
            isCard
            title='Pending Approval Requests'
            period='View all'
            periodClick={() =>
              router.push(
                route.hrAdmin.employeeManagement.approvalManagement.home
              )
            }
          >
            <PendingApprovalRequests
              requests={[
                { title: 'Leave Request', from: 'John Emmanuel - HR' },
                { title: 'Job Offer', from: 'Kingsley Donals - HR' },
                { title: 'Promotion Request', from: 'Femi David - IT' },
                { title: 'Expense Approval', from: 'Marketing Campaign' },
              ]}
              type='actions'
              actions={[
                { name: 'View Details', onClick: () => {} },
                { name: 'Approve', onClick: () => {} },
                { name: 'Reject', onClick: () => {} },
              ]}
            />
          </SectionCardContainer>
        </div>
      </div>
      <Table
        title='Employee Directory'
        hasActionsColumn
        hasCheckboxes
        headerRowData={[
          'Employee Full Name',
          'Staff ID',
          'Email Address',
          'Job Title',
          'Department',
          'Permissions',
        ]}
        bodyRowData={Array(5).fill({
          name: 'Ayomide Alibaba',
          id: 'CYN02345',
          email: 'ayoalibaba@cynegie.com',
          jobTitle: 'Sales Director',
          department: 'Sales',
          permissions: 'Mailchimp',
        })}
        fieldTypes={[
          ...Array(4).fill(FieldType.text),
          FieldType.status,
          FieldType.text,
        ]}
        displayedFields={[
          'name',
          'id',
          'email',
          'jobTitle',
          'department',
          'permissions',
        ]}
        filters={[
          {
            name: 'Deparment',
            items: ['All', 'Sales'],
          },
          {
            name: 'Position',
            items: ['All', 'Regional Manager'],
          },
        ]}
        actions={[
          { name: 'Edit Employee Details', onClick: () => {} },
          { name: 'View Employee Details', onClick: () => {} },
          {
            name: 'Terminate Employee',
            onClick: () => setOpenTerminateEmployeeModal(true),
          },
        ]}
      />
      {openTerminateEmployeeModal && (
        <Modal
          open={openTerminateEmployeeModal}
          onClose={() => setOpenTerminateEmployeeModal(false)}
          title='Terminate Employee'
          subtitle='If you terminate employee, they will no longer show on your employee list'
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                name: 'Employee Name',
                type: 'text',
                disabled: true,
                placeholder: 'Salem Moses',
              },
              {
                name: 'Termination Date',
                type: 'date',
              },
              {
                name: 'Reason for Termination',
                type: 'text',
              },
              {
                name: 'Exit Interview Notes',
                type: 'drag-upload',
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: 'Cancel',
          }}
          buttonTwo={{
            type: ButtonType.deleteContained,
            text: 'Terminate',
            onClick: () => {
              setOpenTerminateEmployeeModal(false);
              setOpenTerminationToast(true);
            },
          }}
        />
      )}
      <Modal
        open={false}
        onClose={() => {}}
        title='Permissions'
        subtitle='See assigned permissions below'
        buttonOne={{
          type: ButtonType.outlined,
          text: 'Save Permissions',
        }}
        form={{
          gridSpacing: 3,
          inputFields: [
            {
              name: 'Work Email Address',
              type: 'text',
              sideButton: { type: ButtonType.deleteWithIcon, text: '' },
            },
            {
              name: 'Work Email Address',
              type: 'multi-select',
            },
          ],
        }}
        centerButton
      />
      {openTerminationToast && (
        <Toast
          open={openTerminationToast}
          onClose={() => setOpenTerminationToast(false)}
          status='Successful'
          message='Employee has been terminated successfully'
          icon={icon.checkCircle}
          type='success'
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeDirectory;
