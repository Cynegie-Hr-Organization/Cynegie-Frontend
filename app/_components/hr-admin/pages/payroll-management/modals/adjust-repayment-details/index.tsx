import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, MenuItem, Select, Stack } from '@mui/material';
import React from 'react';

const AdjustRepaymentDetailsModal: React.FC<{
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
          minWidth: '700px',
        },
      }}
    >
      <DialogContent>
        <Stack gap={4} padding={3}>
          <Stack direction='row' alignItems='center'>
            <Stack flexGrow={1} gap={1} mr={2}>
              <div className='section-heading'>Adjust Repayment Details </div>
              <div className='section-subtitle'>
                Adjust salary advance repayment terms{' '}
              </div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Stack gap={4}>
            {[
              {
                label: 'Filter by Department',
                placeholder: 'Select Department',
              },
              {
                label: 'Filter by Employment Type',
                placeholder: 'Filter by Employment Type',
              },
              {
                label: 'Filter by Location',
                placeholder: 'Filter by Location',
              },
              {
                label: 'Filter by Employment Type',
                placeholder: 'Filter by Employment Type',
              },
              {
                label: 'Filter by Location',
                placeholder: 'Filter by Location',
              },
              {
                label: 'Filter by Location',
                placeholder: 'Filter by Location',
              },
              {
                label: 'Filter by Location',
                placeholder: 'Filter by Location',
              },
            ].map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      color: '#101928',
                      fontWeight: 600,
                      fontSize: '14px',
                      whiteSpace: 'no-wrap',
                    }}
                  >
                    {item.label}
                  </div>
                  <Select
                    defaultValue={item.placeholder}
                    sx={{
                      height: '35px',
                      borderRadius: '4.62px',
                      pr: '15px',
                    }}
                    disabled
                  >
                    <MenuItem value={item.placeholder}>
                      {item.placeholder}
                    </MenuItem>
                  </Select>
                </div>
              </div>
            ))}
          </Stack>
          <Stack direction='row' gap={5} mt={3} justifyContent='center'>
            <button
              onClick={onCloseFn}
              style={{
                borderRadius: '8px',
                border: '1.5px solid #D0D5DD',
                color: '#667185',
                fontSize: '16px',
                fontWeight: 700,
                padding: '10px 0px',
                width: '50%',
                backgroundColor: '#FFF',
                marginTop: '10px',
              }}
            >
              Cancel
            </button>
            <button
              style={{
                borderRadius: '8px',
                border: '1.5px solid #98A2B3',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                padding: '10px 0px',
                width: '50%',
                backgroundColor: '#0035C3',
                marginTop: '10px',
              }}
            >
              Save Changes
            </button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustRepaymentDetailsModal;
