import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, Grid2, Stack } from '@mui/material';
import React from 'react';
import 'rsuite/dist/rsuite.min.css';

const AppDetailsModal: React.FC<{
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
              <div className='card-title-large'>App Details</div>
              <div className='card-subtitle-small'>View App details below</div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Grid2 container spacing={2}>
            {[
              { label: 'Assigned To', details: 'Salem David' },
              { label: 'App Name', details: 'Figma' },
              { label: 'Request ID', details: '202201301610' },
              {
                label: 'App Details',
                details: `Figma app aims to streamline and optimize human resource processes by\nproviding an all-in-one platform for managing employee records, payroll,\nrecruitment, performance evaluations, and compliance tracking.`,
              },
            ].map((item, index) => (
              <Grid2
                key={index}
                // item
                size={index < 3 ? { xs: 12, md: 4 } : { xs: 12 }}
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

export default AppDetailsModal;
