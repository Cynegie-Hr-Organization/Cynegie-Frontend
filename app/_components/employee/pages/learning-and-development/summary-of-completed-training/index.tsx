import { Stack } from '@mui/material';
import summaryCompletedTrainingData from './data';
import SummaryItem from './item';
import Title from '@/app/_components/shared/section-with-cards/title';

const SummaryOfCompletedTraining = () => {
  return (
    <Stack sx={{ height: '100%' }} gap={2}>
      <Title text='Summary of Completed Training' />
      <Stack
        className=' common-card'
        justifyContent='space-between'
        sx={{
          height: '100%',
        }}
        gap={2}
      >
        {summaryCompletedTrainingData.map((item, index) => (
          <SummaryItem
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
            }}
            {...item}
            key={index}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SummaryOfCompletedTraining;
