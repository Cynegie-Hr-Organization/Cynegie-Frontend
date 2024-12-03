import {
  ChevronLeft,
  ChevronRight,
  MoreVert,
  FilterList,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
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
// import { payrollOverviewTableData } from '../overview/data';
import AdjustRepaymentDetailsModal from '../../../modals/adjust-repayment-details';
import { approvedSalaryAdvanceTableData } from './data';

const ApprovedSalaryAdvanceTable = () => {
  // const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [showAdjustRepaymentModal, setShowAdjustRepaymentModal] =
    useState(false);

  // const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  // const handleClick = (
  //   event: React.MouseEvent<SVGSVGElement>,
  //   rowIndex: number
  // ) => {
  //   setAnchorEl(event.currentTarget);
  //   setSelectedRowIndex(rowIndex);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'more-vert-popover' : undefined;

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
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#F7F9FC' }}>
            <TableRow>
              {[
                'Employee Name',
                'Advance Taken',
                'Repayment Status',
                'Amount Repaid',
                'Next Payment Date',
                'Actions',
              ].map((field) => (
                <TableCell key={field} sx={{ whiteSpace: 'nowrap' }}>
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {approvedSalaryAdvanceTableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {[
                  row.name,
                  row.advanceTaken,
                  row.repaymentStatus,
                  row.amountRepaid,
                  row.nextPaymentDate,
                ].map((field, columnIndex) =>
                  columnIndex === 0 ? (
                    <TableCell sx={{ whiteSpace: 'nowrap' }} key={columnIndex}>
                      <Stack direction='row' alignItems='center' gap={1.5}>
                        <Avatar />
                        {field}
                      </Stack>
                    </TableCell>
                  ) : (
                    <TableCell sx={{ whiteSpace: 'nowrap' }} key={columnIndex}>
                      {field}
                    </TableCell>
                  )
                )}
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton>
                    <MoreVert
                      aria-describedby={id}
                      // onClick={(e) => handleClick(e, rowIndex)}
                      sx={{
                        borderWidth: '0.5px',
                        borderRadius: '4px',
                        padding: '2px',
                        cursor: 'pointer',
                      }}
                    />
                  </IconButton>
                </TableCell>
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
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          <ListItem
            component='button'
            sx={{ '&:hover': { color: '#0035C3' } }}
            onClick={() => setShowAdjustRepaymentModal(true)}
          >
            <ListItemText primary='Adjust Repayment Details' />
          </ListItem>
        </List>
      </Popover>
      <AdjustRepaymentDetailsModal
        open={showAdjustRepaymentModal}
        onCloseFn={() => setShowAdjustRepaymentModal(false)}
      />
    </Stack>
  );
};

export default ApprovedSalaryAdvanceTable;
