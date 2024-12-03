import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, Grid2, Stack } from '@mui/material';
import React from 'react';
import 'rsuite/dist/rsuite.min.css';

const DeviceDetailsModal: React.FC<{
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
              <div className='card-title-large'>Device Details</div>
              <div className='card-subtitle-small'>
                View device details below
              </div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Grid2 container spacing={2}>
            {[
              { label: 'Assigned To', details: 'Salem David' },
              { label: 'Device Type', details: 'Macbook Pro 2021' },
              { label: 'Serial Number', details: 'W88401231AX' },
              {
                label: 'Device Details',
                details: `Device name HP Elitebook\nProcessor	14th Gen Intel(R) Core(TM) i8-1335U   1.40 GHz\nInstalled RAM	16.0 GB (15.6 GB usable)\nDevice ID	ABCDEFG6-1234-123-AVBNHJKI\nProduct ID ABVG-1234\nSystem type 64-bit operating system, x64-based processor\nPen and touch No pen or touch input is available for this display`,
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

export default DeviceDetailsModal;
