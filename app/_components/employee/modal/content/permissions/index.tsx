import InputField from '@/app/_components/shared/form/input-field';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { Permission } from '@/app/_components/shared/table/cell/variants/permissions';
import { useState } from 'react';

export type PermissionModalContentProps = {
  userEmail: string;
  permissions: Permission[];
};

const PermissionsModalContent: React.FC<PermissionModalContentProps> = ({
  userEmail,
  permissions,
}) => {
  const [userPermissions, setUserPermissions] =
    useState<Permission[]>(permissions);

  const handleDeleteClick = (permission: Permission) => {
    setUserPermissions(
      userPermissions.filter((userPermission) => userPermission !== permission)
    );
  };

  return (
    <div className='flex flex-col gap-8'>
      <InputField
        name='Work Email Address'
        type='text'
        disabled
        value={userEmail}
      />
      {userPermissions.map((permission, index) => (
        <InputField
          type='text'
          key={index}
          name={permission.name}
          defaultValue={permission.value}
          sideButton={{
            type: ButtonType.deleteWithIcon,
            text: '',
            onClick: () => handleDeleteClick(permission),
          }}
        />
      ))}
    </div>
  );
};

export default PermissionsModalContent;
