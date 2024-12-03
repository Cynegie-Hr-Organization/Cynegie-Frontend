import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, MenuItem, Select, Stack } from '@mui/material';
import React from 'react';
import { Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const RequestBenefitModal: React.FC<{
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
              <div className='card-title-large'>Request Benefit</div>
              <div className='card-subtitle-small'>Request benefit below</div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Stack gap={4}>
            {[
              {
                label: 'Benefit Type',
                placeholder: 'Select',
                options: ['Monthly', 'Biweekly', 'Weekly', 'Semi Monthly'],
              },
              {
                label: 'Providers',
                placeholder: 'Select',
                options: ['Monthly', 'Biweekly', 'Weekly', 'Semi Monthly'],
              },
              {
                label: 'Coverage detail',
                placeholder: 'Sample description here',
              },
              {
                label: 'Monthly Cost',
                placeholder: 'N20,000',
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
                  {index < 2 ? (
                    <Select
                      key={index}
                      defaultValue={item.placeholder}
                      sx={{
                        height: '35px',
                        borderRadius: '4.62px',
                        pr: '15px',
                      }}
                    >
                      <MenuItem value={item.placeholder}>
                        {item.placeholder}
                      </MenuItem>
                      {item.options?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      placeholder={item.placeholder}
                      key={index}
                      style={{ borderRadius: '6px' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </Stack>
          <Stack alignItems='center'>
            <button
              onClick={onCloseFn}
              style={{
                borderRadius: '8px',
                // border: '2px solid #0035C3',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                padding: '10px 0px',
                width: '250px',
                backgroundColor: '#0035C3',
                marginTop: '10px',
              }}
            >
              Request Benefit
            </button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RequestBenefitModal;
