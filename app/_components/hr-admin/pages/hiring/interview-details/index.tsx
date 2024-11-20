import { ChevronLeft } from '@mui/icons-material';
import { Box, Grid2, MenuItem, Select, Stack } from '@mui/material';

const HrAdminInterviewDetailsPage = () => {
  return (
    <Stack sx={{ mx: '30px' }} gap={5}>
      <Stack direction='row'>
        <Stack direction='row' alignItems='center' gap={1} flexGrow={1}>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ChevronLeft />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            Back to Interviews
          </Box>
        </Stack>
        <Select
          defaultValue='Actions'
          sx={{ height: '30px', borderRadius: '4.62px', pr: '15px' }}
          disabled
        >
          <MenuItem value='Actions'>Actions</MenuItem>
        </Select>
      </Stack>
      <Stack
        sx={{ backgroundColor: '#FFF', padding: '30px 30px 80px 30px' }}
        gap={3}
      >
        <Box className='card-title-large'>Interview Details</Box>
        <Stack gap={6}>
          <Grid2 container rowSpacing={5}>
            {Array(5)
              .fill(undefined)
              .map((_, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2.3 }}>
                  <Detail />
                </Grid2>
              ))}
          </Grid2>
          <Grid2 container rowSpacing={5}>
            {Array(4)
              .fill(undefined)
              .map((_, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2.3 }}>
                  <Detail />
                </Grid2>
              ))}
          </Grid2>
          <Detail />
        </Stack>
      </Stack>
    </Stack>
  );
};

const Detail = () => {
  return (
    <Stack gap={1}>
      <Box sx={{ fontWeight: 600, color: '#98A2B3', fontSize: '14px' }}>
        Interviewer Name
      </Box>
      <Box sx={{ fontWeight: 600, color: '#101928', fontSize: '14px' }}>
        Emmanuel Jacob
      </Box>
    </Stack>
  );
};

export default HrAdminInterviewDetailsPage;
