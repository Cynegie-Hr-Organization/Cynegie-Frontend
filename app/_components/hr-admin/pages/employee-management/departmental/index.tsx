'use client';
import Modal from '@/app/_components/employee/modal';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { icon } from '@/constants';
import { useState } from 'react';

const HrAdminEmployeeDepartmental = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const [createClicked, setCreateClicked] = useState(false);
  const [createConfirmClicked, setCreateConfirmClicked] = useState(false);

  return (
    <Page
      title='Departmental Management'
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: 'Create New Department',
        onClick: () => {
          setOpenModal(true);
          setCreateClicked(true);
        },
      }}
      rightButtonSm
      rightButtonIconSm={icon.plus}
      rightButtonIconOnlySm
    >
      <Table
        hasActionsColumn
        headerRowData={[
          'S/N',
          'Department',
          'Department Manager',
          'Headcount',
          'Total Departmental No',
        ]}
        fieldTypes={Array(5).fill(FieldType.text)}
        displayedFields={[
          'sn',
          'department',
          'departmentalManager',
          'headcount',
          'totalDepartmentalNo',
        ]}
        bodyRowData={Array(5).fill({
          sn: '01',
          department: 'Product',
          departmentalManager: 'Ayomide Alibaba',
          headcount: '23',
          totalDepartmentalNo: '23',
        })}
        actions={[
          {
            name: 'Edit',
            onClick: () => {
              setOpenModal(true);
              setCreateClicked(false);
            },
          },
          {
            name: 'Delete',
            onClick: () => {
              setCreateConfirmClicked(false);
              setOpenConfirmationModal(true);
            },
          },
        ]}
        formFilter={{}}
      />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={createClicked ? 'Create New Department' : 'Edit Details'}
        subtitle={
          createClicked
            ? 'Fill in details to create new department'
            : 'Edit details below'
        }
        form={{
          gridSpacing: 3,
          inputFields: [
            {
              name: 'Department Name',
              placeholder: 'Department Name',
              type: 'text',
              ...(!createClicked && { value: 'Product' }),
            },
            {
              name: 'Department Manager',
              placeholder: 'Department Manager',
              type: 'text',
              ...(!createClicked && { value: 'Salami Abubakar' }),
            },
            {
              name: 'Total Departmental No',
              placeholder: 'Total Departmental No',
              type: 'text',
              ...(!createClicked && { value: '30' }),
            },
            { name: 'Add Employees', type: 'multi-select' },
          ],
        }}
        buttonOne={{
          type: ButtonType.outlined,
          text: 'Cancel',
          onClick: () => setOpenModal(false),
        }}
        buttonTwo={{
          type: ButtonType.contained,
          text: 'Save',
          onClick: () => {
            setCreateConfirmClicked(true);
            setOpenModal(false);
            setOpenConfirmationModal(true);
          },
        }}
        buttonGroupPosition='center'
      />
      <Modal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        hasHeading={false}
        centerImage={createConfirmClicked ? icon.successTick : icon.deleteX}
        centerTitle={
          createConfirmClicked
            ? 'You have successfully created the department'
            : 'Delete Department?'
        }
        centerMessage={
          createConfirmClicked
            ? 'You can now proceed to dashboard to continue'
            : 'If you delete this department, it will be removed from the department list and it will be inaccessible'
        }
        {...(createConfirmClicked
          ? {
              buttonOne: {
                type: ButtonType.contained,
                text: 'Continue to Dashboard',
                onClick: () => setOpenConfirmationModal(false),
              },
              centerButton: true,
            }
          : {
              form: {
                inputFields: [
                  {
                    name: 'Why are you deleting this department?',
                    type: 'message',
                  },
                ],
              },
              buttonOne: {
                type: ButtonType.outlined,
                text: 'Cancel',
                onClick: () => setOpenConfirmationModal(false),
              },
              buttonTwo: {
                type: ButtonType.deleteContained,
                text: 'Delete Department',
                onClick: () => setOpenConfirmationModal(false),
              },
              reduceVerticalGap: true,
            })}
      />
    </Page>
  );
};

export default HrAdminEmployeeDepartmental;
