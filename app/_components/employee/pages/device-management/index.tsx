'use client';
import RequestBenefitModal from '@/app/_components/employee/modals/request-benefit';
import { Stack } from '@mui/material';
import { useState } from 'react';
import EmployeeDeviceManagementTable from '../../tables/device-management';

const EmployeeDeviceManagement = () => {
  const [openRequestBenfitModal, setOpenRequestBenefitModal] = useState(false);
  return (
    <>
      <Stack gap={3} mx={5} mb={10} mt={6}>
        <Stack gap={1}>
          <div className='section-heading'>Employee Device Management</div>
          <div className='section-subtitle'>
            Access your Employee Device Dashboard
          </div>
        </Stack>
        <EmployeeDeviceManagementTable />
      </Stack>
      <RequestBenefitModal
        open={openRequestBenfitModal}
        onCloseFn={() => setOpenRequestBenefitModal(false)}
      />
    </>
  );
};

export default EmployeeDeviceManagement;
