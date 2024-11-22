'use client';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Grid2, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import SelectEmployeesForPayrollTable from '../../../tables/select-employees-for-payroll';
import { useRouter } from 'next/navigation';

const HrAdminReviewPayrollPage = () => {
  const router = useRouter();
  return (
    <>
      <Stack marginX={5} gap={3} mb={10}>
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{ display: { xs: 'none', sm: 'flex' }, cursor: 'pointer' }}
          onClick={() => router.push('/hr-admin/payroll/create-payroll')}
        >
          <ChevronLeft
            sx={{ color: '#8D8484', height: '36px', width: '36px' }}
          />
          <div style={{ color: '#667185', fontWeight: 400, fontSize: '16px' }}>
            Back to Create Payroll
          </div>
        </Stack>
        <Stack gap={2}>
          <div className='section-heading'>Review Payroll</div>
          <div className='common-card'>
            <Grid2 spacing={2} container>
              {[
                { label: 'Payroll Name', placeholder: 'Enter' },
                { label: 'Payroll Period', placeholder: 'Select period' },
                { label: 'Payment Date', placeholder: 'Select date' },
              ].map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <div
                      style={{
                        color: '#101928',
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      {item.label}
                    </div>
                    {index == 0 ? (
                      <TextField
                        sx={{
                          border: '1px solid #D0D5DD',
                          borderRadius: '6px',
                          backgroundColor: '#F0F2F5',
                        }}
                        inputProps={{
                          style: {
                            height: '1px',
                            fontSize: '14px',
                            fontWeight: 400,
                          },
                        }}
                        placeholder={item.placeholder}
                        disabled
                      />
                    ) : (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            fontSize: '14px',
                            '& .MuiInputBase-root': {
                              height: '35px',
                              border: '1px solid #D0D5DD',
                              backgroundColor: '#F0F2F5',
                            },
                          }}
                          slotProps={{
                            textField: { placeholder: item.placeholder },
                          }}
                          disabled
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                </Grid2>
              ))}
            </Grid2>
          </div>
        </Stack>
        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {[
            {
              title: 'Total Payroll Cost',
              value: '₦34,886,000',
              additionalInfo: { value: '+20%', description: 'Last Month' },
            },
            {
              title: 'Completed Payments',
              value: '40',
              additionalInfo: { value: '₦90,251,000', description: 'Paid' },
            },
            {
              title: 'Pending Payments',
              value: '12',
              additionalInfo: { value: '₦7,251,000', description: 'Pending' },
            },
            {
              title: 'Total Payrolls',
              value: '124',
              additionalInfo: { value: '', description: '' },
            },
          ].map((item, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, sm: 6, md: 3 }}
              className='common-card'
            >
              <Stack gap={3}>
                <Box
                  sx={{
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#1B1B1B',
                  }}
                >
                  {item.title}
                </Box>
                <Stack direction='row' alignItems='center'>
                  <Box
                    flexGrow={1}
                    sx={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#1B1B1B',
                    }}
                  >
                    {item.value}
                  </Box>
                  <Box sx={{ fontWeight: 400, fontSize: '12px' }}>
                    <span style={{ color: index == 2 ? '#B56D00' : '#2B9943' }}>
                      {item.additionalInfo.value}
                    </span>{' '}
                    <span style={{ color: '#9094A1' }}>
                      {item.additionalInfo.description}
                    </span>
                  </Box>
                </Stack>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
        <Stack direction='row' justifyContent='flex-end'>
          <div style={{ color: '#0035C3', fontSize: '14px', fontWeight: 700 }}>
            Add New Employee
          </div>
        </Stack>
        <SelectEmployeesForPayrollTable />
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          gap={2}
        >
          <button
            style={{
              borderRadius: '8px',
              border: '1.5px solid #98A2B3',
              color: '#344054',
              fontSize: '16px',
              fontWeight: 600,
              padding: '10px 0px',
              width: '250px',
              backgroundColor: '#FFFFFF',
            }}
          >
            Save & Continue Later
          </button>
          <button
            onClick={() => router.push('/hr-admin/payroll/payroll-summary')}
            style={{
              borderRadius: '8px',
              border: '1.5px solid #98A2B3',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
              padding: '10px 0px',
              width: '250px',
              backgroundColor: '#0035C3',
            }}
          >
            Continue
          </button>
        </Stack>
      </Stack>
    </>
  );
};

export default HrAdminReviewPayrollPage;
