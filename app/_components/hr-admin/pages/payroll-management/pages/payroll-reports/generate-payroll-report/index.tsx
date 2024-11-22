'use client';
import { Grid2, MenuItem, Select, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/navigation';

const HrAdminGeneratePayrollReport = () => {
  const router = useRouter();
  return (
    <Stack gap={3} mx={5} mb={10} mt={6}>
      <div className='section-heading'>Payroll Report Generator</div>
      <div
        className='common-card'
        style={{ padding: '50px', paddingBottom: '80px' }}
      >
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
            <Grid2 spacing={2} container>
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
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
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
      </div>
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
          onClick={() => router.push('/hr-admin/payroll/reports')}
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
          Generate Report
        </button>
      </Stack>
    </Stack>
  );
};

export default HrAdminGeneratePayrollReport;
