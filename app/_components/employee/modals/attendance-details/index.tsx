import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, Grid2, Stack } from '@mui/material';
import React from 'react';
import 'rsuite/dist/rsuite.min.css';

const AttendanceDetailsModal: React.FC<{
  open: boolean;
  onCloseFn: () => void;
}> = ({ open, onCloseFn }) => {
  return (
    <Dialog
      open={open}
      onClose={onCloseFn}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          minWidth: '650px',
        },
      }}
    >
      <DialogContent>
        <Stack gap={4} padding={3}>
          <Stack direction='row' alignItems='center'>
            <Stack flexGrow={1} gap={1}>
              <div className='card-title-large'>View Attendance Details</div>
              <div className='card-subtitle-small'>
                View attendance details below
              </div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Grid2 container spacing={3}>
            {[
              { label: 'Date', details: '12 July 2024' },
              { label: 'Clock In Time', details: '08:00 AM' },
              { label: 'Clock Out Time', details: '05:00 PM' },
              {
                label: 'Hours Worked',
                details: `8 hours`,
              },
              {
                label: 'Status',
                details: `Present`,
              },
            ].map((item, index) => (
              <Grid2
                key={index}
                // item
                size={{ xs: 6 }}
              >
                <Stack gap={1}>
                  <div
                    style={{
                      color: '#9CA3AF',
                      fontWeight: 400,
                      fontSize: '14px',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: '#303030',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    <pre style={{ fontFamily: 'Open Sans' }}>
                      {item.details}
                    </pre>
                  </div>
                </Stack>
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDetailsModal;
