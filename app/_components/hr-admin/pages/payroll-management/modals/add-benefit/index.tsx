import { Close } from '@mui/icons-material';
import {
  Checkbox,
  Dialog,
  DialogContent,
  Grid2,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Image from 'next/image';
import React from 'react';

const AddBenefitModal: React.FC<{
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
          minWidth: 'fit-content',
        },
      }}
    >
      <DialogContent>
        <Stack gap={2} padding={3}>
          <Stack direction='row'>
            <Stack flexGrow={1} gap={1} mr={2}>
              <div className='section-heading'>New Benefit</div>
              <div className='section-subtitle'>Add new benefit</div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Stack gap={4}>
            <Grid2 spacing={2} container>
              {[
                { label: 'Select Report Type', placeholder: 'Select Date' },
                { label: 'Select Payroll Period', placeholder: 'Select Type' },
              ].map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 6 }}>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
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
                    {index == 0 ? (
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
                    ) : (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            fontSize: '14px',
                            '& .MuiInputBase-root': {
                              height: '35px',
                              // border: '1px solid #D0D5DD',
                            },
                          }}
                          slotProps={{
                            textField: { placeholder: item.placeholder },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                </Grid2>
              ))}
            </Grid2>
            <Stack gap={2}>
              <div className='card-title-small'>Employee Filters</div>
              <Grid2 spacing={3} container>
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
                ].map((item, index) => (
                  <Grid2
                    key={index}
                    size={{ xs: 12, md: index == 3 || index == 4 ? 6 : 4 }}
                  >
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
                  </Grid2>
                ))}
              </Grid2>
            </Stack>
            <Stack gap={2}>
              <div className='card-title-small'>Report Customization</div>
              <Grid2 spacing={2} container>
                {[
                  {
                    label: 'Choose Specific Data Points',
                    placeholder: 'Select Data Points',
                  },
                  {
                    label: 'Select Visual Representation',
                    placeholder: 'Select',
                  },
                ].map((item, index) => (
                  <Grid2 key={index} size={{ xs: 12, md: 6 }}>
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
                  </Grid2>
                ))}
              </Grid2>
            </Stack>
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
              Add Benefit
            </button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddBenefitModal;
