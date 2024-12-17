'use client';
import Modal from '@/app/_components/employee/modal';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import Toast from '@/app/_components/shared/toast';
import { icon, route } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HrAdminEmployeeRole = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteToast, setOpenDeleteToast] = useState(false);
  return (
    <Page
      title='Roles'
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: 'Create New Role',
        onClick: () =>
          router.push(route.hrAdmin.employeeManagement.roleManagement.create),
      }}
    >
      <Table
        hasCheckboxes
        hasActionsColumn
        headerRowData={[
          'Role Name',
          'Department',
          'Employee Assigned',
          'Permission',
        ]}
        fieldTypes={Array(4).fill(FieldType.text)}
        displayedFields={[
          'name',
          'department',
          'employeeAssigned',
          'permission',
        ]}
        bodyRowData={Array(8).fill({
          name: 'Analytical Officer',
          department: 'Technology',
          employeeAssigned: 'N/A',
          permission: 'Job Posting +1',
        })}
        formFilter={{
          inputFields: [
            {
              name: 'Department',
              type: 'select',
              options: [
                { label: 'All', value: 0 },
                { label: 'Technology', value: 1 },
              ],
            },
          ],
        }}
        actions={[
          {
            name: 'Edit',
            onClick: () =>
              router.push(route.hrAdmin.employeeManagement.roleManagement.edit),
          },
          { name: 'Delete', onClick: () => setOpenDeleteModal(true) },
        ]}
      />
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        hasHeading={false}
        centerImage={icon.deleteX}
        centerTitle='Delete Role?'
        centerMessage='If you delete this role, it will be removed from the role management and it will be inaccessible'
        form={{
          inputFields: [
            { name: 'Why are you deleting this role?', type: 'message' },
          ],
        }}
        reduceVerticalGap
        buttonGroupPosition='center'
        buttonOne={{
          type: ButtonType.outlined,
          text: 'Cancel',
          onClick: () => setOpenDeleteModal(false),
        }}
        buttonTwo={{
          type: ButtonType.deleteContained,
          text: 'Delete Role',
          onClick: () => {
            setOpenDeleteModal(false);
            setOpenDeleteToast(true);
          },
        }}
      />
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        hasHeading={false}
        centerImage={icon.deleteX}
        centerTitle='Delete Role?'
        centerMessage='If you delete this role, it will be removed from the role management and it will be inaccessible'
        form={{
          inputFields: [
            { name: 'Why are you deleting this role?', type: 'message' },
          ],
        }}
        reduceVerticalGap
        buttonGroupPosition='center'
        buttonOne={{
          type: ButtonType.outlined,
          text: 'Cancel',
          onClick: () => setOpenDeleteModal(false),
        }}
        buttonTwo={{
          type: ButtonType.deleteContained,
          text: 'Delete Role',
          onClick: () => {
            setOpenDeleteModal(false);
            setOpenDeleteToast(true);
          },
        }}
      />
      <Toast
        open={openDeleteToast}
        onClose={() => setOpenDeleteToast(false)}
        status='Successful'
        message='Role has been deleted successfully'
        type='success'
        icon={icon.checkCircle}
      />
    </Page>
  );
};

export default HrAdminEmployeeRole;
