'use client';

import Modal from '@/app/_components/employee/modal';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { icon, route } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HrAdminAppManagementRequest = () => {
  const router = useRouter();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDecommissionModal, setOpenDecommissionModal] = useState(false);
  return (
    <Page
      backText='Back to App Dashboard'
      onBackTextClick={() => router.push(route.hrAdmin.appManagement.overview)}
      title='App Request'
      subtitle='All App Requests Below'
    >
      <Table
        hasCheckboxes
        hasActionsColumn
        headerRowData={[
          'Request ID',
          'Employee',
          'App Name',
          'Status',
          'Request Date',
        ]}
        fieldTypes={[
          ...Array(3).fill(FieldType.text),
          FieldType.status,
          FieldType.text,
        ]}
        displayedFields={[
          'requestID',
          'employee',
          'appName',
          'status',
          'requestDate',
        ]}
        bodyRowData={Array(8).fill({
          requestID: '202201301610',
          employee: 'Ayomide Alibaba',
          appName: 'Figma',
          status: 'Pending',
          requestDate: '30 July 2024',
        })}
        statusMap={{ Pending: 'warning' }}
        formFilter={{
          gridSpacing: 3,
          inputFields: [
            {
              name: 'App Name',
              type: 'select',
            },
            {
              name: 'Department',
              type: 'select',
            },
            {
              name: 'Status',
              type: 'select',
            },
          ],
        }}
        actions={[
          {
            name: 'View Details',
            onClick: () => setOpenDetailsModal(true),
          },
          {
            name: 'Approve Request',
            onClick: () => setOpenEditModal(true),
          },
          {
            name: 'Reject Request',
            onClick: () => {},
          },
        ]}
      />
      {openDetailsModal && (
        <Modal
          open={openDetailsModal}
          onClose={() => setOpenDetailsModal(false)}
          title='View Details'
          subtitle='View details below'
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                name: 'App Name',
                type: 'text',
                value: 'Figma',
                disabled: true,
              },
              {
                name: 'Request ID',
                type: 'text',
                value: '202201301610',
                disabled: true,
              },
              {
                name: 'Employee Name',
                type: 'text',
                value: 'John Doe',
                disabled: true,
              },
              {
                name: 'Number of Licenses',
                type: 'text',
                value: '20',
                disabled: true,
              },
              {
                name: 'Assigned Licenses',
                type: 'text',
                value: '15',
                disabled: true,
              },
              {
                name: 'Available Licenses',
                type: 'text',
                value: '5',
                disabled: true,
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.deleteWithIcon,
            text: 'Decommission App',
            onClick: () => {
              setOpenDetailsModal(false);
              setOpenDecommissionModal(true);
            },
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: 'Edit App',
            onClick: () => {
              setOpenDetailsModal(false);
              setOpenEditModal(true);
            },
          }}
        />
      )}
      {openEditModal && (
        <Modal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          title='Edit Details'
          subtitle='Edit details below'
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                name: 'App Name',
                type: 'text',
                defaultValue: 'Figma',
              },
              {
                name: 'License Type',
                type: 'text',
                defaultValue: 'Public License',
              },
              {
                name: 'Assigned To',
                type: 'text',
                defaultValue: 'John Doe',
              },
              {
                name: 'Number of Licenses',
                type: 'text',
                defaultValue: '20',
              },
              {
                name: 'Assigned Licenses',
                type: 'text',
                defaultValue: '15',
              },
              {
                name: 'Available Licenses',
                type: 'text',
                defaultValue: '5',
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: 'Cancel',
            onClick: () => setOpenEditModal(false),
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: 'Save Changes',
            onClick: () => setOpenEditModal(false),
          }}
        />
      )}
      {openDecommissionModal && (
        <Modal
          open={openDecommissionModal}
          onClose={() => setOpenDecommissionModal(false)}
          hasHeading={false}
          reduceVerticalGap
          centerImage={icon.deleteX}
          centerTitle='Decommision App'
          centerMessage='If you decommission this app, it will be inactive and not assigned to any employee'
          buttonOne={{
            type: ButtonType.outlined,
            text: 'Cancel',
            onClick: () => setOpenDecommissionModal(false),
          }}
          buttonTwo={{
            type: ButtonType.deleteContained,
            text: 'Decommision App',
            onClick: () => setOpenDecommissionModal(false),
          }}
        />
      )}
    </Page>
  );
};

export default HrAdminAppManagementRequest;
