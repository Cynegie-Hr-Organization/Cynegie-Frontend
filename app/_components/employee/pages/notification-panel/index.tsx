'use client';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import NotificationsTable from '../../tables/notifications-table';

const EmployeeNotificationPanel = () => {
  return (
    <Stack gap={3} mx={3}>
      <Stack
        direction='row'
        alignItems='center'
        gap={1}
        sx={{ display: 'flex', cursor: 'pointer', ml: '-10px' }}
      >
        <ChevronLeft sx={{ color: '#8D8484', height: '36px', width: '36px' }} />
        <div
          style={{
            color: '#667185',
            fontWeight: 400,
            fontSize: '16px',
            textWrap: 'nowrap',
          }}
        >
          Back to Employee Dashboard
        </div>
      </Stack>
      <Stack flexGrow={1} gap={1} mr={2}>
        <Box className='section-heading'>Notification</Box>
        <Box className='section-subtitle'>All Notifications Below</Box>
      </Stack>
      <NotificationsTable />
    </Stack>
  );
};

export default EmployeeNotificationPanel;
