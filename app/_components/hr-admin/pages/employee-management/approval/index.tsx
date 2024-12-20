'use client';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import useHandleRowChecks from '@/app/_components/shared/table/hooks/useHandleRowChecks';
import { FieldType } from '@/app/_components/shared/table/types';
import { icon, route } from '@/constants';
import { useRouter } from 'next/navigation';
import useApprovalConfirmationModal from './hooks/useApprovalConfirmationModal';
import Modal from '@/app/_components/employee/modal';
import { useState } from 'react';
import Toast from '@/app/_components/shared/toast';

const HrAdminEmployeeManagementApproval = () => {
  const router = useRouter();
  const { checkedRows, setCheckedRows, clearChecks, resetChecks } =
    useHandleRowChecks();
  const {
    openConfirmationModal,
    setOpenConfirmationModal,
    confirmationModalProps,
  } = useApprovalConfirmationModal();
  const [openToast, setOpenToast] = useState(false);

  return (
    <Page
      title='Approval Management'
      subtitle='Manage and Approve all requests pending HR review'
      hasButtons
      leftButton={{
        type:
          checkedRows.length > 0 ? ButtonType.outlined : ButtonType.disabled,
        text: 'Reject All',
        onClick: () => resetChecks(),
      }}
      rightButton={{
        type:
          checkedRows.length > 0 ? ButtonType.contained : ButtonType.disabled,
        text: 'Approve All',
        onClick: () => setOpenConfirmationModal(true),
      }}
    >
      <Table
        hasCheckboxes
        hasActionsColumn
        headerRowData={[
          'Request Type',
          'Employee Name',
          'Staff ID',
          'Department',
          'Request Details',
          'Request Date',
          'Status',
        ]}
        fieldTypes={[...Array(6).fill(FieldType.text), FieldType.status]}
        displayedFields={[
          'requestType',
          'employeeName',
          'staffID',
          'department',
          'requestDetails',
          'requestDate',
          'status',
        ]}
        bodyRowData={Array(5).fill({
          requestType: 'Leave Request',
          employeeName: 'Ayomide Alibaba',
          staffID: 'CYN0235',
          department: 'Product',
          requestDetails: 'Annual Leave (5 days)',
          requestDate: 'Oct 12, 2024',
          status: 'Pending',
        })}
        formFilter={{
          inputFields: [
            {
              name: 'Request Type',
              type: 'select',
              placeholder: 'Select',
              options: [{ label: 'Leave Request', value: 0 }],
            },
            {
              name: 'Department',
              type: 'select',
              placeholder: 'Select',
              options: [{ label: 'HR', value: 0 }],
            },
            {
              name: 'Date',
              type: 'date',
            },
            {
              name: 'Status',
              type: 'select',
              placeholder: 'Select',
              options: [
                { label: 'Approved', value: 2 },
                { label: 'Rejected', value: 1 },
                { label: 'Pending', value: 0 },
              ],
            },
          ],
        }}
        statusMap={{
          Approved: 'success',
          Pending: 'warning',
          Rejected: 'error',
        }}
        fieldActionMap={{
          Pending: [
            {
              name: 'View Details',
              onClick: () =>
                router.push(
                  route.hrAdmin.employeeManagement.approvalManagement
                    .requestDetails
                ),
            },
            {
              name: 'Approve',
              onClick: () => setOpenToast(true),
            },
            {
              name: 'Reject',
              onClick: () => {},
            },
          ],
        }}
        fieldToGetAction='status'
        getCheckedRows={setCheckedRows}
        clearChecks={clearChecks}
      />
      {openConfirmationModal && (
        <Modal
          {...confirmationModalProps}
          buttonTwo={{
            ...confirmationModalProps.buttonTwo,
            onClick: () => {
              resetChecks();
              setOpenConfirmationModal(false);
              setOpenToast(true);
            },
          }}
        />
      )}
      {openToast && (
        <Toast
          open={openToast}
          icon={icon.checkCircle}
          type='success'
          onClose={() => setOpenToast(false)}
          status='Successful'
          message='Request(s) approved successfully!'
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeManagementApproval;
