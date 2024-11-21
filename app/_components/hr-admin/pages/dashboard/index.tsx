'use client';
import {
  Avatar,
  Box,
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
import Image from 'next/image';
import Todo from '../../../todo';
import StatusPill from '../../../shared/pills/status';
import { newIndex } from '@/lib/utils';
import DashboardLayout from './dashboard-layout';
import OverviewSection from './overview-section';
import ChartsSection from './charts-section';


const HrAdminDashboardPage = () => {
  return (
    <DashboardLayout
    >
      <OverviewSection />
      <ChartsSection />
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
              .map((_, index) => {
                return (
                  <Grid2
                    key={newIndex(index)}
                    size={{ xs: 12, md: 4 }}>
                    <Todo />
                  </Grid2>
                )
              })}
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
        <CandidatesTable />
      </Stack>
    </DashboardLayout>
  );
};

const CandidatesTable = () => {
  return (
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
                  src='/icons/search.svg'
                  alt=''
                  width={24}
                  height={24}
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
                <TableRow key={newIndex(rowIndex)}>
                  {[
                    'Gabby Lewis',
                    'Screening',
                    'Sr. UX Designer',
                    '12/05/24',
                    '3 files',
                    'On-going',
                  ].map((field, columnIndex) =>
                    columnIndex == 0 ? (
                      <TableCell key={field}>
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
  );
};

export default HrAdminDashboardPage;
