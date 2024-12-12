import { Grid2 } from '@mui/material';
import SvgIcon from '@/app/_components/icons/container';
import summaryCardsData from './data';
import { icon } from '@/constants';
import Card from '@/app/_components/shared/section-with-cards/card-group/card';

const SummaryCards = () => {
  const setCardIcon = (label: string) => {
    return label === 'Certification Received'
      ? icon.graduatingCap
      : icon.square;
  };

  return (
    <Grid2 container spacing={2}>
      {summaryCardsData.map((card) => (
        <Grid2 key={card.labelText} size={{ xs: 12, sm: 6 }}>
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
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default SummaryCards;
