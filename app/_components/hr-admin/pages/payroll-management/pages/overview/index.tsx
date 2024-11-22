'use client';
import { Box, Button, Grid2, MenuItem, Select, Stack } from '@mui/material';
import React from 'react';
import './style.css';
import PayrollTable from '../../tables/overview';
import { CalendarTodayOutlined } from '@mui/icons-material';
import PayrollOverviewChartLarge from '../../charts/payroll-overview/large';
import PayrollOverviewChartMobile from '../../charts/payroll-overview/mobile';
import BonusAndIncentivesChart from '../../charts/bonuses-and-incentives-chart';
import { useRouter } from 'next/navigation';

const HrAdminPayrollOverviewPage = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-5 p-8 min-h-screen'>
      <Stack gap={2}>
        <Stack direction='row'>
          <Stack flexGrow={1} gap={1} mr={2}>
            <Box className='section-heading'>Payroll</Box>
            <Box className='section-subtitle'>
              Manage employee and organization payroll
            </Box>
          </Stack>
          <Stack direction='row' alignItems='center' gap={2}>
            <Select
              defaultValue='Actions'
              sx={{ height: '38px', borderRadius: '4.62px', pr: '15px' }}
              disabled
            >
              <MenuItem value='Actions'>Actions</MenuItem>
            </Select>
            <Button
              sx={{ display: { xs: 'none', md: 'block' } }}
              variant='contained'
              className='common-button'
              onClick={() => router.push('/hr-admin/payroll/create-payroll')}
            >
              Create Payroll
            </Button>
          </Stack>
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
      </Stack>
      <Grid2 columnSpacing={3} rowSpacing={3} container>
        <Grid2 className='common-card' size={{ xs: 12, sm: 12, md: 8.5 }}>
          <Stack gap={3}>
            <Stack
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'flex-start' },
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  fontSize: { xs: '16px', sm: '20px' },
                  fontWeight: 600,
                  color: { xs: '#101928', sm: '#000000' },
                  mr: 2,
                }}
              >
                Payroll Cost Overview
              </Box>
              <Stack
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                direction='row'
                gap={2}
              >
                <Select
                  defaultValue='Monthly'
                  sx={{ height: '30px', borderRadius: '4.62px', pr: '15px' }}
                  disabled
                >
                  <MenuItem value='Monthly'>Monthly</MenuItem>
                </Select>
                <Select
                  defaultValue='Department'
                  sx={{ height: '30px', borderRadius: '4.62px', pr: '15px' }}
                  disabled
                >
                  <MenuItem value='Department'>Department</MenuItem>
                </Select>
              </Stack>
              <Select
                defaultValue='01 June - 31 June, 2024'
                sx={{
                  height: '30px',
                  borderRadius: '4.62px',
                  pr: '5px',
                  display: { xs: 'flex', sm: 'none' },
                }}
                disabled
              >
                <MenuItem value='01 June - 31 June, 2024'>
                  01 June - 31 June, 2024
                </MenuItem>
              </Select>
            </Stack>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <PayrollOverviewChartLarge />
            </Box>
            <Stack
              sx={{ display: { xs: 'flex', sm: 'none' }, mb: '-80px' }}
              gap={4}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: '#101928',
                  fontSize: '28px',
                }}
              >
                ₦120,574,000
              </div>
              <div style={{ margin: '0px -24.5px' }}>
                <PayrollOverviewChartMobile />
              </div>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 className='common-card' size={{ xs: 12, sm: 12, md: 3.5 }}>
          <Stack gap={4}>
            <Stack alignItems='center' direction='row'>
              <Stack flexGrow={1} gap={0.5} mr={2}>
                <Box className='card-title-small'>Bonuses and Incentives</Box>
                <Box className='card-subtitle-small'>
                  From 1 - 31 March, 2022
                </Box>
              </Stack>
              <CalendarTodayOutlined
                sx={{ width: 20, height: 20, color: '#667185' }}
              />
            </Stack>
            <Grid2 rowSpacing={2} mb={-3} container>
              {Array(2)
                .fill(undefined)
                .map((_, index) => (
                  <Grid2
                    size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                    key={index}
                    className={index == 0 ? 'grid-item-right-margin' : ''}
                  >
                    <Stack
                      sx={{
                        borderLeft: `3.26px solid ${
                          index == 0 ? '#8AA2E3' : '#0035C3'
                        }`,
                        pl: '10px',
                      }}
                    >
                      <Box
                        sx={{
                          color: '#70707A',
                          fontWeight: 400,
                          fontSize: '11.4px',
                        }}
                      >
                        Bonuses
                      </Box>
                      <Box
                        sx={{
                          fontSize: '19.53px',
                          fontWeight: 600,
                          color: '#101928',
                        }}
                      >
                        ₦2,764,000
                      </Box>
                    </Stack>
                  </Grid2>
                ))}
            </Grid2>
            <Box
              sx={{
                position: 'relative',
                marginBottom: '-20px',
                marginTop: { xs: 0, md: '-25px', lg: 0 },
              }}
            >
              <div
                style={{
                  width: '200px',
                  height: '300px',
                  margin: '0 auto -100px auto',
                }}
              >
                <BonusAndIncentivesChart />
              </div>
              <Box
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 100,
                  marginInline: 'auto',
                  width: 'fit-content',
                }}
              >
                <Box
                  sx={{
                    fontWeight: 400,
                    fontSize: '11.4px',
                    color: '#70707A',
                    textAlign: 'center',
                  }}
                >
                  Total
                </Box>
                <Box
                  sx={{ fontWeight: 600, fontSize: '16px', color: '#101928' }}
                >
                  ₦32,764,000
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      <Box sx={{ overflowX: 'auto' }}>
        <PayrollTable />
      </Box>
    </div>
  );
};

export default HrAdminPayrollOverviewPage;
