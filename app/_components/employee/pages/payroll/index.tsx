'use client';
import { Box, Button, Grid2, Stack } from '@mui/material';
import PayrollActivitiesTable from '../../tables/payroll/payroll-activities';

const EmployeePayroll = () => {
  return (
    <Stack gap={3} mx={5} mb={10} mt={6}>
      <Stack direction='row' alignItems='center'>
        <Stack flexGrow={1} gap={1}>
          <div className='section-heading'>Employee Payroll Dashboard</div>
          <div className='section-subtitle'>
            Access your Employee Payroll Dashboard
          </div>
        </Stack>
        <Stack direction='row' gap={2}>
          <Button
            // disabled
            // onClick={() => router.push('/hr-admin/payroll/salary-advance')}
            style={{
              borderRadius: '8px',
              border: '1.5px solid #98A2B3',
              color: '#98A2B3',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 20px',
              textTransform: 'none',
              // width: '250px',
              //   backgroundColor: '#0035C3',
            }}
          >
            Download Payslip
          </Button>
          <button
            //   onClick={() => setOpenRequestBenefitModal(true)}
            style={{
              borderRadius: '8px',
              border: '1.5px solid #98A2B3',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 20px',
              // width: '250px',
              backgroundColor: '#0035C3',
            }}
          >
            View Payslip
          </button>
        </Stack>
      </Stack>
      <Grid2 columnSpacing={2} rowSpacing={2} container>
        {[
          {
            title: 'Next Payday',
            value: '28th August',
          },
          {
            title: 'Last Paycheck',
            value: 'N850,000.00',
          },
          {
            title: 'YTD Earnings',
            value: 'N3,750,000.00',
            additionalInfo: { value: '₦7,251,000', description: '28-Jul-2024' },
          },
          {
            title: 'Time in Company',
            value: '9 months',
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
                  <span style={{ color: '#9094A1' }}>
                    {item.additionalInfo?.description}
                  </span>
                </Box>
              </Stack>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
      <PayrollActivitiesTable getSelectedRows={() => {}} />
    </Stack>
  );
};

export default EmployeePayroll;
