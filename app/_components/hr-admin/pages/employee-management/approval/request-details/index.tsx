'use client';
import Modal from '@/app/_components/employee/modal';
import ButtonGroup from '@/app/_components/shared/button-group';
import DetailGroup from '@/app/_components/shared/detail-group';
import Form from '@/app/_components/shared/form';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import { route } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HrAdminEmployeeManagementApprovalRequestDetails = () => {
  const router = useRouter();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  return (
    <Page
      backText='Back to Approval Management'
      onBackTextClick={() =>
        router.push(route.hrAdmin.employeeManagement.approvalManagement.home)
      }
    >
      <SectionCardContainer isCard title='Leave Request Details'>
        <DetailGroup
          gridLayout='3-columns'
          details={[
            {
              name: 'Name',
              value: 'Emmanuel Jacob',
            },
            {
              name: 'Staff ID',
              value: 'CYN0017',
            },
            {
              name: 'Department',
              value: 'HR',
            },
            {
              name: 'Job Title',
              value: 'Senior Manager',
            },
            {
              name: 'Status',
              value: 'Pending',
            },
            {
              name: 'Leave Type',
              value: 'Annual Leave',
            },
            {
              name: 'Start Date',
              value: 'Oct 5, 2024',
            },
            {
              name: 'End Date',
              value: 'Oct 15, 2024',
            },
            {
              name: 'Total Days Requested',
              value: '12',
            },
            {
              name: 'Reason for Leave',
              value: 'Vacation with family',
            },
            {
              name: 'Supporting Document',
              value: 'Download medical certificate.pdf',
            },
          ]}
        />
        <div className='mt-2'></div>
        <Form
          gridSpacing={4}
          inputFields={[
            {
              name: 'Assign Backup Employee',
              type: 'select',
              placeholder: 'Select Employee',
            },
            {
              name: 'Add Comments',
              type: 'message',
            },
          ]}
        />
        <div className='mb-2'></div>
      </SectionCardContainer>
      <ButtonGroup
        leftButton={{ type: ButtonType.outlined, text: 'Reject' }}
        rightButton={{
          type: ButtonType.contained,
          text: 'Approve',
          onClick: () => setOpenConfirmationModal(true),
        }}
        position='end'
      />
      {openConfirmationModal && (
        <Modal
          open={openConfirmationModal}
          onClose={() => setOpenConfirmationModal(false)}
          hasHeading={false}
          centerTitle='Approve Request'
          centerMessage='Are you sure you want to approve the request'
          buttonOne={{
            type: ButtonType.outlined,
            text: 'Cancel',
            onClick: () => setOpenConfirmationModal(false),
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: 'Confirm Approval',
            onClick: () =>
              router.push(
                route.hrAdmin.employeeManagement.approvalManagement.home
              ),
          }}
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeManagementApprovalRequestDetails;
