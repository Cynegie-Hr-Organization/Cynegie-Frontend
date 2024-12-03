import {
  ChevronLeft,
  ChevronRight,
  MoreVert,
  FilterList,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
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
  TextField,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { reviewPayrollTableData } from './data';

const ReviewPayrollTable = () => {
  // const router = useRouter();
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [tableActionAnchorEl, setTableActionAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleFilterClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const buttonElement = event.currentTarget;
    setFilterAnchorEl(buttonElement);
  };

  const handleTableActionClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const buttonElement = event.currentTarget;
    setTableActionAnchorEl(buttonElement);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleTableActionClose = () => {
    setTableActionAnchorEl(null);
  };

  const openFilter = Boolean(filterAnchorEl);
  const filterId = openFilter ? 'filter-popover' : undefined;

  const openTableAction = Boolean(tableActionAnchorEl);
  const tableActionId = openTableAction ? 'table-action-popover' : undefined;

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
          onClick={handleFilterClick}
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
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#F7F9FC' }}>
            <TableRow>
              {[
                'Employee Name',
                'Department',
                'Gross Pay',
                'Net Pay',
                'Bonus',
                'Untaxed Bonus',
                'Deductions',
                'Prorate Deduction',
                'Tax',
                'Overtime Hours',
                'Actions',
              ].map((field) => (
                <TableCell key={field} sx={{ whiteSpace: 'nowrap' }}>
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewPayrollTableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {[
                  row.name,
                  row.department,
                  row.grossPay,
                  row.netPay,
                  row.bonus,
                  row.untaxedBonus,
                  row.deductions,
                  row.prorateDeduction,
                  row.tax,
                  row.overTimeHours,
                  '',
                ].map((field, columnIndex) =>
                  columnIndex == 0 ? (
                    <TableCell sx={{ whiteSpace: 'nowrap' }} key={columnIndex}>
                      <Stack direction='row' gap={1.5} alignItems='center'>
                        <Avatar src={row.image} />
                        <div>{field}</div>
                      </Stack>
                    </TableCell>
                  ) : columnIndex == 10 ? (
                    <TableCell key={columnIndex} sx={{ whiteSpace: 'nowrap' }}>
                      <Button onClick={handleTableActionClick}>
                        <MoreVert
                          sx={{
                            borderWidth: '0.5px',
                            borderRadius: '4px',
                            padding: '2px',
                            fill: '#000',
                          }}
                        />
                      </Button>
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
                sx={{ height: '40px', borderRadius: '5px', width: '200px' }}
              >
                <MenuItem></MenuItem>
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
      <Popover
        id={tableActionId}
        open={openTableAction}
        anchorEl={tableActionAnchorEl}
        onClose={handleTableActionClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List sx={{ color: '#475367', fontWeight: 400, fontSize: '14px' }}>
          {[
            { name: 'Adjust Compensation', route: '' },
            { name: 'Remove Employee', route: '' },
          ].map((item) => (
            <ListItem
              key={item.name}
              component='button'
              sx={{
                '&:hover': { color: '#0035C3' },
              }}
              // onClick={() => router.push(item.route)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </Stack>
  );
};

export default ReviewPayrollTable;
