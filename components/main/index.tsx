'use client';
import {
  Avatar,
  Box,
  Grid,
  Grid2,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';
import Image from 'next/image';
import Todo from '../todo';
import { SearchOutlined } from '@mui/icons-material';
import { ImageIcon } from '@/constants';
import StatusPill from '../pills/status';

const red = '#D42620';
const grey = '#E6EBF9';
const yellow = '#FFAD33';
const green = '#0F973D';

const data = [
  { value: 40, label: 'A', color: green },
  { value: 40, label: 'B', color: yellow },
  { value: 40, label: 'C', color: grey },
  { value: 40, label: 'D', color: red },
];

const size = {
  width: 250,
  height: 150,
};

const Main = () => {
  return (
    <Stack
      style={{
        padding: '30px',
        minHeight: '100vh',
      }}
      gap={3}
    >
      <Stack gap={2}>
        <Box className='section-heading'>Overview</Box>
        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {Array(4)
            .fill(undefined)
            .map((_, index) => (
              <Grid2
                key={index}
                size={{ xs: 12, sm: 6, md: 3 }}
                className='common-card'
              >
                <Stack gap={3}>
                  <Stack direction='row' alignItems='center' gap={2}>
                    <Box
                      sx={{
                        padding: '4px',
                        borderRadius: '50%',
                        textAlign: 'center',
                        backgroundColor: '#EADAFF',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src='/icons/task-square-bold.svg'
                        alt=''
                        width={13.56}
                        height={13.56}
                      />
                    </Box>
                    <Box
                      sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#1B1B1B',
                      }}
                    >
                      Total Open Positions
                    </Box>
                  </Stack>
                  <Box
                    sx={{
                      fontSize: '33.48px',
                      fontWeight: 700,
                      color: '#1B1B1B',
                    }}
                  >
                    15
                  </Box>
                </Stack>
              </Grid2>
            ))}
        </Grid2>
      </Stack>
      <Grid2 columnSpacing={3} rowSpacing={3} container>
        <Grid2 className='common-card' size={{ xs: 12, sm: 6, md: 8.5 }}>
          <Stack gap={2}>
            <Stack direction='row'>
              <Box
                sx={{
                  flexGrow: 1,
                }}
                className='card-title-large'
              >
                Total Payroll Processed
              </Box>
              <Select
                defaultValue='Monthly'
                sx={{ height: '30px', borderRadius: '4.62px', pr: '15px' }}
                disabled
              >
                <MenuItem value='Monthly'>Monthly</MenuItem>
              </Select>
            </Stack>
            <Box>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                  },
                ]}
                sx={{ width: 'inherit' }}
                height={300}
              />
            </Box>
          </Stack>
        </Grid2>
        <Grid2 className='common-card' size={{ xs: 12, sm: 6, md: 3.5 }}>
          <Stack gap={3}>
            <Box className='card-title-large'>Employee Status Distribution</Box>
            <Box
              sx={{
                display: 'flex',
                marginTop: { xs: '0px', sm: '0px', md: '-20px', lg: '0px' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PieChart
                series={[{ data, innerRadius: 55, cx: 120 }]}
                slotProps={{
                  legend: { hidden: true },
                }}
                {...size}
              />
            </Box>
            <Stack gap={2}>
              {[
                { color: green, label: 'Active', percentage: 75 },
                { color: yellow, label: 'On Leave', percentage: 10 },
                { color: grey, label: 'Probation', percentage: 5 },
                { color: red, label: 'Resigned', percentage: 10 },
              ].map((item, index) => (
                <Stack
                  key={index}
                  direction='row'
                  alignItems='center'
                  gap={2}
                  sx={{ fontSize: '18px' }}
                >
                  <Box
                    style={{
                      borderRadius: '50%',
                      width: '15px',
                      height: '15px',
                      backgroundColor: item.color,
                    }}
                  />
                  <Box flexGrow={1}>{item.label}</Box>
                  <Box>{item.percentage}%</Box>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      <Grid2 className='common-card' size={{ xs: 12, sm: 6, md: 8.5 }}>
        <Stack gap={2}>
          <Stack direction='row'>
            <Box
              sx={{
                flexGrow: 1,
              }}
              className='card-title-large'
            >
              Priority Todos
            </Box>
            <Select
              defaultValue='Monthly'
              sx={{ height: '30px', borderRadius: '4.62px', pr: '15px' }}
              disabled
            >
              <MenuItem value='Monthly'>Today</MenuItem>
            </Select>
          </Stack>
          <Grid2 columnSpacing={2} rowSpacing={2} container>
            {Array(3)
              .fill(undefined)
              .map((_, index) => (
                <Grid2 size={{ xs: 12, md: 4 }} key={index}>
                  <Todo />
                </Grid2>
              ))}
          </Grid2>
          <Box
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              textDecoration: 'underline',
              color: '#0035C3',
            }}
          >
            View All
          </Box>
        </Stack>
      </Grid2>
      <Stack gap={2}>
        <Box className='section-heading'>Candidates</Box>
        <Stack gap={2} className='common-card'>
          <Stack
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Box sx={{ width: '100%' }} flexGrow={1}>
              <TextField
                sx={{
                  width: { xs: '90%', sm: '70%', md: '70%' },
                  mb: { xs: '15px', md: '0px' },
                }}
                InputProps={{
                  sx: {
                    height: '35px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 400,
                  },
                  startAdornment: (
                    <Image
                      {...ImageIcon.search}
                      width={20}
                      height={20}
                      style={{ marginRight: '5px' }}
                    />
                  ),
                }}
                placeholder='Search'
              />
            </Box>
            <Select
              defaultValue='Filter'
              sx={{ height: '30px', borderRadius: '4.62px', pr: '15px' }}
              disabled
            >
              <MenuItem value='Filter'>Filter</MenuItem>
            </Select>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#F7F9FC' }}>
                <TableRow>
                  {[
                    'Candidate Name',
                    'Stages',
                    'Applied Role',
                    'Application Date',
                    'Attachments',
                    'Status',
                  ].map((field) => (
                    <TableCell key={field}>{field}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(4)
                  .fill(undefined)
                  .map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[
                        'Gabby Lewis',
                        'Screening',
                        'Sr. UX Designer',
                        '12/05/24',
                        '3 files',
                        'On-going',
                      ].map((field, columnIndex) =>
                        columnIndex == 0 ? (
                          <TableCell key={columnIndex}>
                            <Stack direction='row' alignItems='center' gap={2}>
                              <Avatar />
                              <Box>{field}</Box>
                            </Stack>
                          </TableCell>
                        ) : columnIndex == 5 ? (
                          <TableCell key={columnIndex}>
                            <StatusPill variant='success' text={field} />
                          </TableCell>
                        ) : (
                          <TableCell key={columnIndex}>{field}</TableCell>
                        )
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Main;
