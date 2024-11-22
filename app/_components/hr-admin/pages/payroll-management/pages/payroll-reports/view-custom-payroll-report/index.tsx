'use client';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Grid2, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import ViewCustomPayrollReport from '../../../tables/view-custom-payroll-report';
import PayrollSummaryChart from '../../../charts/payroll-summary';

const HrAdminViewCustomPayrollReportPage = () => {
  const router = useRouter();
  return (
    <Stack gap={3} mx={5} mb={10} mt={6}>
      <Stack
        direction='row'
        alignItems='center'
        gap={1}
        sx={{ display: { xs: 'none', sm: 'flex' }, cursor: 'pointer' }}
        onClick={() => router.push('/hr-admin/payroll/reports')}
      >
        <ChevronLeft sx={{ color: '#8D8484', height: '36px', width: '36px' }} />
        <div style={{ color: '#667185', fontWeight: 400, fontSize: '16px' }}>
          Back to Payroll Reports
        </div>
      </Stack>
      <Stack direction='row' alignItems='center'>
        <div style={{ flexGrow: 1 }} className='section-heading'>
          Payroll Reports Overview
        </div>
        <button
          onClick={() =>
            router.push('/hr-admin/payroll/generate-payroll-report')
          }
          style={{
            borderRadius: '8px',
            border: '1.5px solid #98A2B3',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 600,
            padding: '10px 30px',
            // width: '250px',
            backgroundColor: '#0035C3',
          }}
        >
          Download Report
        </button>
      </Stack>
      <Stack gap={4} padding={3} className='common-card'>
        <Stack>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#667185' }}>
            Report Title
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#1D2739' }}>
            Finance Department 2024 Payroll Report
          </div>
        </Stack>
        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {[
            {
              title: 'Total Payroll Cost',
              value: '₦34,886,000',
            },
            {
              title: 'Completed Payments',
              value: '40',
            },
            {
              title: 'Pending Payments',
              value: '12',
            },
            {
              title: 'Total Payrolls',
              value: '124',
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
                <Box
                  sx={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1B1B1B',
                  }}
                >
                  {item.value}
                </Box>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </Stack>
      <div className='common-card'>
        <Stack gap={2}>
          <div className='card-title-small'>Payroll Summary</div>
          <PayrollSummaryChart />
        </Stack>
      </div>
      <ViewCustomPayrollReport />
    </Stack>
  );
};

export default HrAdminViewCustomPayrollReportPage;
