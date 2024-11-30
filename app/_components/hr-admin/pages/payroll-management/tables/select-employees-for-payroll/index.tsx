import {
  ChevronLeft,
  ChevronRight,
  FilterList,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  MenuItem,
  Popover,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';
import { selectEmployeesForPayrollTableData } from './data';
import { Input, InputGroup } from 'rsuite';

const SelectEmployeesForPayrollTable: React.FC<{
  getSelectedRows: (selectedRows: number[]) => void;
}> = ({ getSelectedRows }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    setSelectedRows((prevSelectedRows) => {
      if (event.target.checked) {
        getSelectedRows([...prevSelectedRows, rowIndex]);
        return [...prevSelectedRows, rowIndex];
      } else {
        getSelectedRows(prevSelectedRows.filter((index) => index !== rowIndex));
        return prevSelectedRows.filter((index) => index !== rowIndex);
      }
    });
  };

  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleFilterClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const buttonElement = event.currentTarget;
    setFilterAnchorEl(buttonElement);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const openFilter = Boolean(filterAnchorEl);
  const filterId = openFilter ? 'filter-popover' : undefined;

  return (
    <Stack gap={2} className='common-card'>
      <Stack
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Box sx={{ width: '100%' }} flexGrow={1}>
          <Box
            sx={{
              width: { xs: '90%', sm: '70%', md: '70%' },
              mb: { xs: '15px', md: '0px' },
            }}
          >
            <InputGroup>
              <InputGroup.Addon style={{ backgroundColor: 'transparent' }}>
                <Image
                  src='/icons/search-2.svg'
                  alt=''
                  width={18}
                  height={18}
                  style={{ margin: '-15px 0px -15px 0px' }}
                />
              </InputGroup.Addon>
              <Input
                style={{ paddingLeft: '0px', height: '30px' }}
                placeholder='Search here...'
              />
            </InputGroup>
          </Box>
        </Box>
        <Box>
          <Button
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
              textTransform: 'none',
              color: 'inherit',
            }}
            sx={{ '&:hover': { backgroundColor: '#F0F0F0' } }}
            onClick={handleFilterClick}
          >
            <FilterList />
            <div
              style={{
                fontWeight: 500,
                color: '#344054',
                fontSize: '14px',
              }}
            >
              Filter
            </div>
          </Button>
        </Box>
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
                      getSelectedRows([0, 1, 2, 3, 4]);
                    } else {
                      getSelectedRows([]);
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
      <Popover
        id={filterId}
        open={openFilter}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack padding={5} gap={5}>
          <Stack gap={3}>
            <Stack gap={1}>
              <div
                style={{ fontWeight: 400, fontSize: '12px', color: '#303030' }}
              >
                Department
              </div>
              <Select
                defaultValue='All'
                sx={{ height: '40px', borderRadius: '5px', width: '200px' }}
              >
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='Sales'>Sales</MenuItem>
                <MenuItem value='IT'>IT</MenuItem>
                <MenuItem value='Finance'>Finance</MenuItem>
              </Select>
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Button
              sx={{
                display: { xs: 'none', md: 'block' },
                textTransform: 'none',
                fontSize: '14px',
                border: '0px',
                color: '#9CA3AF',
              }}
              variant='outlined'
            >
              Reset
            </Button>
            <Button
              sx={{
                display: { xs: 'none', md: 'block' },
                fontSize: '14px',
                boxShadow: 'none',
              }}
              variant='contained'
              className='common-button'
            >
              Filter
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
};

export default SelectEmployeesForPayrollTable;
