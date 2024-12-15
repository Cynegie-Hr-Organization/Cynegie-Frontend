import Card from './card';
import { Grid2 } from '@mui/material';
import SvgIcon from '@/app/_components/icons/container';
import { icon } from '@/constants';
import { CardGroupProps } from '../types';

const CardGroup: React.FC<CardGroupProps> = ({ data, gridItemSize }) => {
  return (
    <Grid2 container spacing={2}>
      {data?.map((card, index) => (
        <Grid2 key={index} size={gridItemSize ?? { xs: 12, sm: 6 }}>
          <Card
            value={card.value}
            valueBelow={card.valueBelow ?? false}
            icon={
              card.icon ?? <SvgIcon path={icon.square} width={16} height={16} />
            }
            iconColorVariant={card.iconColorVariant}
            iconContainerHeight={27.11}
            iconContainerWidth={27.11}
            labelText={card.labelText}
            hasIcon={card.hasIcon || card.icon ? true : false}
            denominator={card.denominator}
            isPercentage={card.isPercentage}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CardGroup;
