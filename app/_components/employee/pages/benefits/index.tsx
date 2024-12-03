'use client';
import RequestBenefitModal from '@/app/_components/employee/modals/request-benefit';
import EmployeeBenefitsTable from '@/app/_components/employee/tables/benefits';
import GiftIcon from '@/app/_components/icons/gift';
import { Box, Button, Grid2, Stack } from '@mui/material';
import { useState } from 'react';

const EmployeeBenefits = () => {
  const [openRequestBenfitModal, setOpenRequestBenefitModal] = useState(false);
  return (
    <>
      <Stack gap={3} mx={5} mb={10} mt={6}>
        <Stack direction='row' alignItems='center'>
          <Stack flexGrow={1} gap={1}>
            <div className='section-heading'>Benefits</div>
            <div className='section-subtitle'>All Your Benefits below</div>
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
              Salary Advance
            </Button>
            <button
              onClick={() => setOpenRequestBenefitModal(true)}
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
              Request Benefits
            </button>
          </Stack>
        </Stack>
        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {[
            {
              title: 'Total Benefits Enrolled',
              value: '10',
              icon: '/icons/gift.svg',
              iconFill: '#0F973D',
              iconBg: '#E7F6EC',
            },
            {
              title: 'Active Benefits',
              value: '4',
              icon: '/icons/gift.svg',
              iconFill: '#335DCF',
              iconBg: '#E6EBF9',
            },
            {
              title: 'Pending Benefits',
              value: '3',
              icon: '/icons/gift.svg',
              iconFill: '#F3A218',
              iconBg: '#FEF6E7',
            },
            {
              title: 'Upcoming Expiration',
              value: '2',
              icon: '/icons/gift.svg',
              iconFill: '#D42620',
              iconBg: '#FBEAE9',
            },
          ].map((item, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, sm: 6, md: 3 }}
              className='common-card'
            >
              <Stack gap={3}>
                <Stack direction='row' alignItems='center' gap={1}>
                  <div
                    style={{
                      padding: '6px',
                      borderRadius: '50%',
                      backgroundColor: item.iconBg,
                      fill: item.iconFill,
                      color: item.iconFill,
                    }}
                  >
                    <GiftIcon />
                  </div>
                  <Box
                    sx={{
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#1B1B1B',
                    }}
                  >
                    {item.title}
                  </Box>
                </Stack>
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
              </Stack>
            </Grid2>
          ))}
        </Grid2>
        <EmployeeBenefitsTable />
        {/* <PayrollBenefitsManagementTable />
      <AddBenefitModal
        open={showAddBenefitsModal}
        onCloseFn={() => setShowAddBenefitsModal(false)}
      /> */}
      </Stack>
      <RequestBenefitModal
        open={openRequestBenfitModal}
        onCloseFn={() => setOpenRequestBenefitModal(false)}
      />
    </>
  );
};

export default EmployeeBenefits;
