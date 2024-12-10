import { Stack } from '@mui/material';
import RecentActivityCardDetailsItem from './item';

const RecentActivityCardDetails = () => {
  return (
    <Stack gap={2}>
      {Array(2)
        .fill(undefined)
        .map((_, index) => (
          <div key={index}>
            <RecentActivityCardDetailsItem />
          </div>
        ))}
    </Stack>
  );
};

export default RecentActivityCardDetails;
