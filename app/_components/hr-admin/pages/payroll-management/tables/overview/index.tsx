import StatusPill from '@/app/_components/shared/pills/status';
import { ChevronLeft, ChevronRight, MoreVert, Sort } from '@mui/icons-material';
import {
  Box,
  Checkbox,
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
import { useState, ChangeEvent } from 'react';

const PayrollTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    setSelectedRows((prevSelectedRows) => {
      if (event.target.checked) {
        return [...prevSelectedRows, rowIndex];
      } else {
        return prevSelectedRows.filter((index) => index !== rowIndex);
      }
    });
  };

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
            placeholder='Search here...'
          />
        </Box>
        <button
          style={{
            height: '30px',
            borderRadius: '4.62px',
            border: '1px solid #D0D5DD',
            padding: '15px 15px',
            boxShadow: '0px 0px 1px 0px #888888',
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
        >
          <Sort />
          <div
            style={{
              fontWeight: 600,
              color: '#344054',
              fontSize: '14px',
            }}
          >
            Filter
          </div>
        </button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#F7F9FC' }}>
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows([0, 1, 2, 3]);
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === 4}
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < 4
                  }
                />
              </TableCell>
              {[
                'Payroll Name',
                'Payroll Period',
                'Payment Date',
                'Total Employees',
                'Gross Pay',
                'Net Pay',
                'Approval Date',
                'Status',
                'Actions',
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
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(rowIndex)}
                      onChange={(e) => handleCheckboxChange(e, rowIndex)}
                    />
                  </TableCell>
                  {[
                    'Finance Sept 2024 Payroll',
                    '1st Sept - 31st Sept',
                    '31st Sept 2024',
                    '22',
                    'N4,886,000',
                    'N3,886,000',
                    '---',
                    'Approved',
                    '',
                  ].map((field, columnIndex) =>
                    columnIndex === 7 ? (
                      <TableCell key={columnIndex}>
                        <StatusPill variant='success' text={field} />
                      </TableCell>
                    ) : columnIndex === 8 ? (
                      <TableCell key={columnIndex}>
                        <MoreVert
                          sx={{
                            borderWidth: '0.5px',
                            borderRadius: '4px',
                            padding: '2px',
                          }}
                        />
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
      <Stack
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Stack direction='row' alignItems='center' gap={2} flexGrow={1}>
          <div style={{ fontWeight: 400, fontSize: '14px', color: '#525866' }}>
            Show rows per page
          </div>
          <Select
            defaultValue='5'
            sx={{ height: '30px', borderRadius: '4.62px', pr: '5px' }}
            disabled
          >
            <MenuItem value='5'>5</MenuItem>
          </Select>
        </Stack>
        <Stack direction='row' alignItems='center' gap={2}>
          <div>1-5 of 3</div>
          <Stack direction='row' gap={2}>
            <ChevronLeft />
            <ChevronRight />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PayrollTable;
