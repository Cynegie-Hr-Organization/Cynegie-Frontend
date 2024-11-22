'use client';
import { ChevronLeft } from '@mui/icons-material';
import { Grid2, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import SelectEmployeesForPayrollTable from '../../../tables/select-employees-for-payroll';
import { useRouter } from 'next/navigation';

const HrAdminCreatePayrollPage = () => {
  const router = useRouter();
  return (
    <>
      <Stack marginX={5} gap={3} mb={10}>
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{ display: { xs: 'none', sm: 'flex' }, cursor: 'pointer' }}
          onClick={() => router.push('/hr-admin/payroll/overview')}
        >
          <ChevronLeft
            sx={{ color: '#8D8484', height: '36px', width: '36px' }}
          />
          <div style={{ color: '#667185', fontWeight: 400, fontSize: '16px' }}>
            Back to Payroll Management
          </div>
        </Stack>
        <Stack gap={2}>
          <div className='section-heading'>Create Payroll</div>
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
                        }}
                        inputProps={{
                          style: {
                            height: '1px',
                            fontSize: '14px',
                            fontWeight: 400,
                          },
                        }}
                        placeholder={item.placeholder}
                      />
                    ) : (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            fontSize: '14px',
                            '& .MuiInputBase-root': {
                              height: '35px',
                              border: '1px solid #D0D5DD',
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
          </div>
        </Stack>
        <Stack gap={2}>
          <div className='card-title-small'>
            Select Employees for Payroll Cycle
          </div>
          <SelectEmployeesForPayrollTable />
        </Stack>
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
            onClick={() => router.push('/hr-admin/payroll/review-payroll')}
            style={{
              borderRadius: '8px',
              border: '1.5px solid #98A2B3',
              color: '#344054',
              fontSize: '16px',
              fontWeight: 600,
              padding: '10px 0px',
              width: '250px',
              backgroundColor: '#98A2B3',
            }}
          >
            Continue
          </button>
        </Stack>
      </Stack>
    </>
  );
};

export default HrAdminCreatePayrollPage;
