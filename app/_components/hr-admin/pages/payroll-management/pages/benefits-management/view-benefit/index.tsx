'use client';
import { Box, Grid2, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import EnrolledEmployeesTable from '../../../tables/enrolled-employees';
import { ChevronLeft } from '@mui/icons-material';

const HrAdminViewPayrollBenefitPage = () => {
  const router = useRouter();
  return (
    <Stack gap={4} mx={5} mb={10} mt={6}>
      <Stack
        direction='row'
        alignItems='center'
        gap={1}
        sx={{ display: { xs: 'none', sm: 'flex' }, cursor: 'pointer' }}
        onClick={() => router.push('/hr-admin/payroll/benefits-management')}
      >
        <ChevronLeft sx={{ color: '#8D8484', height: '36px', width: '36px' }} />
        <div style={{ color: '#667185', fontWeight: 400, fontSize: '16px' }}>
          Back to Benefits
        </div>
      </Stack>
      <div className='section-heading'>Health Insurance Plan A</div>
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
        ].map((item, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 6, md: 4 }}
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
      <Stack gap={2}>
        <Stack direction='row' alignItems='center'>
          <div style={{ flexGrow: 1 }} className='card-title-small'>
            Employees Enrolled
          </div>
          <button
            style={{
              borderRadius: '8px',
              border: '1.5px solid #98A2B3',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
              padding: '10px 30px',
              backgroundColor: '#0035C3',
            }}
          >
            Unenroll
          </button>
        </Stack>
        <EnrolledEmployeesTable />
      </Stack>
    </Stack>
  );
};

export default HrAdminViewPayrollBenefitPage;
