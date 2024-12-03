import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, Stack } from '@mui/material';
import React from 'react';
import 'rsuite/dist/rsuite.min.css';

const ViewBenefitDetailsModal: React.FC<{
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
              <div className='card-title-large'>View Details</div>
              <div className='card-subtitle-small'>View details below</div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Stack gap={2}>
            {[
              { label: 'Benefit Name', value: 'Retirement Plans' },
              { label: 'Benefit Type', value: 'Financial' },
              { label: 'Provider', value: 'Cynegie' },
              { label: 'Start Date', value: 'January 30, 2024' },
              { label: 'End Date', value: 'December 31, 2024' },
              { label: 'Employee Contribution', value: 'N20,000' },
              { label: 'Employer Contribution', value: 'N20,000' },
            ].map((item, index) => (
              <Stack key={index} direction='row' alignItems='center'>
                <div
                  style={{
                    flexGrow: 1,
                    color: '#101928',
                    fontWeight: 400,
                    fontSize: '16px',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    color: '#101928',
                    fontWeight: 700,
                    fontSize: '18px',
                  }}
                >
                  {item.value}
                </div>
              </Stack>
            ))}
          </Stack>
          <Stack alignItems='center'>
            <button
              onClick={onCloseFn}
              style={{
                borderRadius: '8px',
                border: '2px solid #0035C3',
                color: '#0035C3',
                fontSize: '16px',
                fontWeight: 600,
                padding: '10px 0px',
                width: '250px',
                backgroundColor: '#FFFFFF',
                marginTop: '10px',
              }}
            >
              Contact HR
            </button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBenefitDetailsModal;
