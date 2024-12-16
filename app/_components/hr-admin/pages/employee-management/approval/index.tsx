'use client';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { route } from '@/constants';
import { useRouter } from 'next/navigation';

const HrAdminEmployeeManagementApproval = () => {
  const router = useRouter();
  return (
    <Page
      title='Approval Management'
      subtitle='Manage and Approve all requests pending HR review'
      hasButtons
      leftButton={{ type: ButtonType.disabled, text: 'Reject All' }}
      rightButton={{ type: ButtonType.disabled, text: 'Approve All' }}
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
        ]}
        fieldTypes={Array(6).fill(FieldType.text)}
        displayedFields={[
          'requestType',
          'employeeName',
          'staffID',
          'department',
          'requestDetails',
          'requestDate',
        ]}
        bodyRowData={Array(5).fill({
          requestType: 'Leave Request',
          employeeName: 'Ayomide Alibaba',
          staffID: 'CYN0235',
          department: 'Product',
          requestDetails: 'Annual Leave (5 days)',
          requestDate: 'Oct 12, 2024',
        })}
        actions={[
          {
            name: 'View Details',
            onClick: () =>
              router.push(route.hrAdmin.employeeManagement.requestDetails),
          },
          {
            name: 'Approve',
            onClick: () => {},
          },
          {
            name: 'Reject',
            onClick: () => {},
          },
        ]}
        filters={[
          { name: 'Request Type', items: ['Leave Request'] },
          { name: 'Department', items: ['HR'] },
          { name: 'Date', items: [] },
          { name: 'Status', items: ['Approved', 'Rejected', 'Pending'] },
        ]}
      />
    </Page>
  );
};

export default HrAdminEmployeeManagementApproval;
