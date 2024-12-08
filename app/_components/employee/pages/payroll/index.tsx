'use client';
import { Box, Grid2, Stack } from '@mui/material';
import PayrollActivitiesTable from '../../tables/payroll/payroll-activities';
import usePayrollPage from './hooks/usePayrollPage';
import Page from '@/app/_components/shared/page';

const EmployeePayroll = () => {
  const { pageProps } = usePayrollPage();
  return (
    <Page {...pageProps}>
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
    </Page>
  );
};

export default EmployeePayroll;
