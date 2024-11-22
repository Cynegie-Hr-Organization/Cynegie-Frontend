'use client';
import { Box, Button, Grid2, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import PayrollBenefitsManagementTable from '../../tables/benefits-management';

const HrAdminPayrollBenefitsManagementPage = () => {
  const router = useRouter();
  return (
    <Stack gap={3} mx={5} mb={10} mt={6}>
      <Stack direction='row' alignItems='center'>
        <div style={{ flexGrow: 1 }} className='section-heading'>
          Benefits Management
        </div>
        <Stack direction='row' gap={2}>
          <Button
            // disabled
            onClick={() => router.push('/hr-admin/payroll/salary-advance')}
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
            Salary Advance
          </Button>
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
              padding: '8px 20px',
              // width: '250px',
              backgroundColor: '#0035C3',
            }}
          >
            Add Benefits
          </button>
        </Stack>
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
                  color: '#0A112F',
                  opacity: 0.5,
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
      <PayrollBenefitsManagementTable />
    </Stack>
  );
};

export default HrAdminPayrollBenefitsManagementPage;
