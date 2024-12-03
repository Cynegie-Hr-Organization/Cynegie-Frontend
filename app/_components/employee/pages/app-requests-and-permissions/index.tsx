'use client';
import { Stack } from '@mui/material';
import { useState } from 'react';
import EmployeeAppRequestsAndPermissionsTable from '../../tables/app-requests-and-permissions';
import AppRequestModal from '../../modals/app-request';

const EmployeeAppRequestsAndPermissions = () => {
  const [openAppRequestModal, setOpenAppRequestModal] = useState(false);
  return (
    <>
      <Stack gap={3} mx={5} mb={10} mt={6}>
        <Stack direction='row' alignItems='center'>
          <Stack flexGrow={1} gap={1}>
            <div className='section-heading'>Your Apps & Request</div>
            <div className='section-subtitle'>All Apps & Requests Below</div>
          </Stack>
          <button
            onClick={() => setOpenAppRequestModal(true)}
            style={{
              borderRadius: '8px',
              border: '1.5px solid #98A2B3',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 50px',
              // width: '250px',
              backgroundColor: '#0035C3',
            }}
          >
            App Request
          </button>
        </Stack>
        <EmployeeAppRequestsAndPermissionsTable />
      </Stack>
      <AppRequestModal
        open={openAppRequestModal}
        onCloseFn={() => setOpenAppRequestModal(false)}
      />
    </>
  );
};

export default EmployeeAppRequestsAndPermissions;
