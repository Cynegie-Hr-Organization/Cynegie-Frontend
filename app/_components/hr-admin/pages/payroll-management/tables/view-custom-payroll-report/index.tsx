import { ChevronLeft, ChevronRight, FilterList } from '@mui/icons-material';
import {
  Avatar,
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
import { selectEmployeesForPayrollTableData } from '../select-employees-for-payroll/data';

const ViewCustomPayrollReportTable = () => {
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
          <FilterList />
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
      <Stack direction='row' gap={1}>
        {['Sales', 'IT', 'Finance'].map((item, index) => (
          <button
            key={index}
            style={{
              border: '1px solid #D0D5DD',
              fontWeight: 600,
              fontSize: '14px',
              padding: '5px 10px',
              color: '#344054',
              borderRadius: '6px',
              backgroundColor: '#F0F2F5',
            }}
          >
            {item}
          </button>
        ))}
      </Stack>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#F7F9FC' }}>
            <TableRow>
              <TableCell sx={{ whiteSpace: 'nowrap', width: '50px' }}>
                <Checkbox
                  sx={{
                    '& .MuiSvgIcon-root': {
                      strokeWidth: '1.25px',
                    },
                  }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows([0, 1, 2, 3, 4]);
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === 5}
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < 5
                  }
                />
              </TableCell>
              {[
                'Employee Name',
                'Department',
                'Gross Pay',
                'Deduction',
                'Net Pay',
              ].map((field) => (
                <TableCell key={field} sx={{ whiteSpace: 'nowrap' }}>
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectEmployeesForPayrollTableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Checkbox
                    checked={selectedRows.includes(rowIndex)}
                    onChange={(e) => handleCheckboxChange(e, rowIndex)}
                  />
                </TableCell>
                {[
                  row.name,
                  row.department,
                  row.grossPay,
                  row.deduction,
                  row.netPay,
                ].map((field, columnIndex) =>
                  columnIndex == 0 ? (
                    <TableCell sx={{ whiteSpace: 'nowrap' }} key={columnIndex}>
                      <Stack direction='row' gap={1.5} alignItems='center'>
                        <Avatar src={row.image} />
                        <div>{field}</div>
                      </Stack>
                    </TableCell>
                  ) : (
                    <TableCell sx={{ whiteSpace: 'nowrap' }} key={columnIndex}>
                      {field}
                    </TableCell>
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
          <div>1-5 of 1</div>
          <Stack direction='row' gap={2}>
            <ChevronLeft />
            <ChevronRight />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ViewCustomPayrollReportTable;
