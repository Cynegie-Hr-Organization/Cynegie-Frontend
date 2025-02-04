import { Grid } from '@mui/material';
import SvgIcon from '@/app/_components/icons/container';
import useSummaryCardsData from './data';
import { icon } from '@/constants';
import Card from '@/app/_components/shared/section-with-cards/card-group/card';
import Skeleton from '@mui/material/Skeleton';

const SummaryCards = () => {
  const { summaryCardsData, isLoading } = useSummaryCardsData();

  const setCardIcon = (label: string) => {
    return label === 'Certification Received'
      ? icon.graduatingCap
      : icon.square;
  };

  return (
    <Grid container spacing={2}>
      {isLoading
        ? Array.from(new Array(4)).map((_, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Skeleton variant="rectangular" height={118} />
            </Grid>
          ))
        : summaryCardsData.map((card) => (
            <Grid key={card.labelText} item xs={12} sm={6}>
              <Card
                {...card}
                icon={
                  <SvgIcon
                    width={16}
                    height={16}
                    path={setCardIcon(card.labelText)}
                  />
                }
                hasIcon
                iconContainerHeight={28}
                iconContainerWidth={28}
              lineBelowValue
              loading={isLoading}
              />
            </Grid>
          ))}
    </Grid>
  );
};

export default SummaryCards;