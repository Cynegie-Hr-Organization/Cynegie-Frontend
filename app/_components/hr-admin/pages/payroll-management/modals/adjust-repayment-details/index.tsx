import { newIndex } from '@/lib/utils';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, MenuItem, Select, Stack } from '@mui/material';
import React from 'react';
import { Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

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
                label: 'Employee Name',
                placeholder: 'John Emmanuel',
              },
              {
                label: 'Advance Taken',
                placeholder: '200,000',
              },
              {
                label: 'Total Repaid',
                placeholder: '50,000',
              },
              {
                label: 'Remaining Balance',
                placeholder: '150,000',
              },
              { label: 'New Installment Amount', placeholder: '40,000' },
              {
                label: 'Repayment Frequency',
                placeholder: 'Select',
                options: ['Monthly', 'Biweekly', 'Weekly', 'Semi Monthly'],
              },
              {
                label: 'Repayment Period',
                placeholder: 'Select',
                options: ['1 Month', '2 Months', '3 Months', '4 Months'],
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
                  {index > 4 ? (
                    <Select
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
                      {item.options?.map((option, index) => (
                        <MenuItem key={newIndex(index)} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      placeholder={item.placeholder}
                      key={index}
                      style={{ borderRadius: '6px' }}
                      {...(index < 5 && { disabled: true })}
                    />
                  )}
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
