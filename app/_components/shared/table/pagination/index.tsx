import { MenuItem, Select, Stack } from '@mui/material';
import { TablePaginationProps } from '../types';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const TablePagination: React.FC<TablePaginationProps> = (props) => {
  const { page, pageCount } = props;
  const limitOptions = [5, 10, 20, 30];

  return (
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
          defaultValue={limitOptions[0]}
          sx={{ height: '30px', borderRadius: '4.62px', pr: '5px' }}
        >
          {limitOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack direction='row' alignItems='center' gap={2}>
        <div>
          1-{pageCount} of {page}
        </div>
        <Stack direction='row' gap={2}>
          <ChevronLeft />
          <ChevronRight />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TablePagination;
