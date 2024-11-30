import { newIndex } from '@/lib/utils';
import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  Grid2,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

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
                { label: 'Benefit Name', placeholder: 'Enter Title' },
                {
                  label: 'Benefit Type',
                  placeholder: 'Select Method',
                  options: [
                    'Health',
                    'Financial',
                    'Leave',
                    'Transportation',
                    'Education',
                    'Pension',
                    'Other',
                  ],
                },
                { label: 'Benefit Provider', placeholder: 'Enter' },
              ].map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 4 }}>
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
                    {index == 1 ? (
                      <Select
                        defaultValue={item.placeholder}
                        sx={{
                          height: '35px',
                          borderRadius: '4.62px',
                          pr: '15px',
                        }}
                      >
                        <MenuItem
                          sx={{ display: 'none' }}
                          value={item.placeholder}
                        >
                          {item.placeholder}
                        </MenuItem>
                        {item.options?.map((option, index) => (
                          <MenuItem key={newIndex(index)} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    ) : (
                      // <LocalizationProvider dateAdapter={AdapterDayjs}>
                      //   <DatePicker
                      //     sx={{
                      //       fontSize: '14px',
                      //       '& .MuiInputBase-root': {
                      //         height: '35px',
                      //         // border: '1px solid #D0D5DD',
                      //       },
                      //     }}
                      //     slotProps={{
                      //       textField: { placeholder: item.placeholder },
                      //     }}
                      //   />
                      // </LocalizationProvider>
                      <Input
                        placeholder={item.placeholder}
                        key={index}
                        style={{ borderRadius: '6px' }}
                      />
                    )}
                  </div>
                </Grid2>
              ))}
            </Grid2>
            <Stack gap={2}>
              <div className='card-title-small'>Eligibility Criteria</div>
              <Grid2 spacing={3} container>
                {[
                  {
                    label: 'Department',
                    placeholder: 'Select Department',
                    options: [
                      'Engineering',
                      'Product',
                      'Marketing',
                      'Admin',
                      'Human Resource',
                      'Brand',
                      'Sales',
                      'Finance',
                    ],
                  },
                  {
                    label: 'Employment Type',
                    placeholder: 'Select Type',
                    options: ['Full-Time', 'Part-Time', 'Contract Workers'],
                  },
                  {
                    label: 'Job Level',
                    placeholder: 'Select Level',
                    options: ['Junior', 'Mid Level', 'Senior'],
                  },
                  {
                    label: 'Start Date',
                    placeholder: 'Select Date',
                  },
                  {
                    label: 'End Date',
                    placeholder: 'Select Date',
                  },
                ].map((item, index) => (
                  <Grid2
                    key={newIndex(index)}
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
                      {index < 3 ? (
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
                            <MenuItem key={newIndex(index)} value={option}>{option}</MenuItem>
                          ))}
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
            </Stack>
            <Stack gap={2}>
              <div className='card-title-small'>Contribution Details</div>
              <Grid2 spacing={2} container>
                {[
                  {
                    label: 'Employer Contribution',
                    placeholder: 'Enter',
                  },
                  {
                    label: 'Employee Contribution',
                    placeholder: 'Enter',
                  },
                ].map((item, index) => (
                  <Grid2 key={newIndex(index)} size={{ xs: 12, md: 6 }}>
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
                      <Input
                        placeholder={item.placeholder}
                        key={newIndex(index)}
                        style={{ borderRadius: '6px' }}
                      />
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
