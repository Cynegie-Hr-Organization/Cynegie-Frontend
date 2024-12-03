import { Stack } from '@mui/material';
import Value from './value';
import CardLabel from './label';
import React from 'react';
import { ColorVariant } from '@/types';

const Card: React.FC<{
  value: number;
  valueBelow?: boolean;
  valueLineColor?: string;
  lineBelowValue?: boolean;
  icon: React.ReactElement;
  iconColorVariant?: ColorVariant;
  iconContainerHeight: number;
  iconContainerWidth: number;
  labelText: string;
  hasIcon?: boolean;
  denominator?: number;
  isPercentage?: boolean;
}> = ({
  value,
  icon,
  iconColorVariant,
  iconContainerHeight,
  iconContainerWidth,
  labelText,
  valueBelow = true,
  lineBelowValue = false,
  valueLineColor,
  hasIcon = false,
  denominator,
  isPercentage = false,
}) => {
  return (
    <Stack
      flexDirection={valueBelow ? 'column-reverse' : 'column'}
      className=' common-card'
      gap={2}
    >
      <Value
        lineBelow={lineBelowValue}
        lineColor={valueLineColor}
        value={value}
        denominator={denominator}
        isPercentage={isPercentage}
      />
      <CardLabel
        icon={icon}
        iconColorVariant={iconColorVariant}
        iconContainerHeight={iconContainerHeight}
        iconContainerWidth={iconContainerWidth}
        text={labelText}
        hasIcon={hasIcon}
      />
    </Stack>
  );
};

export default Card;
