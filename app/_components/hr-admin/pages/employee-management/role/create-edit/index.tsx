import { InputFieldProps } from '@/app/_components/employee/modal/types';
import Form from '@/app/_components/shared/form';
import Page from '@/app/_components/shared/page';
import Permissions from '../../directory/pending-approval-requests';
import ButtonGroup from '@/app/_components/shared/button-group';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { useRouter } from 'next/navigation';
import { icon, route } from '@/constants';
import { useState } from 'react';
import Modal from '@/app/_components/employee/modal';

type HrAdminEmployeeManagementCreateEditRoleProps = {
  title: string;
  type: 'create' | 'edit';
  buttonText: string;
};

const HrAdminEmployeeManagementCreateEditRole: React.FC<
  HrAdminEmployeeManagementCreateEditRoleProps
> = ({ title, buttonText, type }) => {
  const router = useRouter();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  return (
    <Page title={title}>
      <Form
        gridSpacing={4}
        inputFields={[
          {
            name: 'Role Name',
            type: 'select',
            placeholder: 'Select',
          },
          {
            name: 'Department',
            type: 'select',
            placeholder: 'Select',
          },
          {
            name: 'Employee Assigned',
            type: 'multi-select',
            placeholder: 'Select',
          },
          {
            name: 'Responsiblities',
            type: 'message',
          },
        ]}
      />
      <p className='card-title-small'>Permission</p>
      <div className='common-card mt-[-20px]'>
        <Permissions
          type='switch'
          requests={[
            {
              title: 'Job Posting',
              from: 'Grant users permission to post jobs, view jobs and manage posts',
            },
            {
              title: 'User Document',
              from: 'Grant users permission to access their documents and also edit it when necessary',
            },
            {
              title: 'Candidate Activation',
              from: 'Grant users access to activate candidates who are not working',
            },
            {
              title: 'Financial Information',
              from: 'Grant users access to view their financial status and information of candidates',
            },
            {
              title: 'Job Authority',
              from: 'Grant users full access to review their posts and modify them',
            },
          ]}
        />
      </div>
      <ButtonGroup
        leftButton={{
          type: ButtonType.outlined,
          text: 'Cancel',
          onClick: () =>
            router.push(route.hrAdmin.employeeManagement.roleManagement.home),
        }}
        rightButton={{
          type: ButtonType.contained,
          text: buttonText,
          onClick: () => setOpenSuccessModal(true),
        }}
        position='end'
      />
      {openSuccessModal && (
        <Modal
          open={openSuccessModal}
          onClose={() => setOpenSuccessModal(false)}
          hasHeading={false}
          centerImage={icon.successTick}
          centerTitle={`You have successfully ${
            type === 'create' ? 'created' : 'edited'
          } the role`}
          centerMessage='You can now proceed to the dashboard to continue'
          centerButton={true}
          buttonOne={{
            type: ButtonType.contained,
            text: 'Continue to Dashboard',
            onClick: () =>
              router.push(route.hrAdmin.employeeManagement.roleManagement.home),
          }}
          reduceVerticalGap
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeManagementCreateEditRole;
