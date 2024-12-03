import { Stack } from '@mui/material';
import CardLabelIcon from './icon';
import CardLabelText from './text';
import React from 'react';
import { ColorVariant } from '@/types';

const CardLabel: React.FC<{
  icon: React.ReactElement;
  iconColorVariant?: ColorVariant;
  iconContainerHeight: number;
  iconContainerWidth: number;
  text: string;
  hasIcon?: boolean;
}> = ({
  icon,
  iconColorVariant,
  iconContainerHeight,
  iconContainerWidth,
  text,
  hasIcon = false,
}) => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      {hasIcon && (
        <CardLabelIcon
          containerHeight={iconContainerHeight}
          containerWidth={iconContainerWidth}
          icon={icon}
          colorVariant={iconColorVariant}
        />
      )}
      <CardLabelText text={text} />
    </Stack>
  );
};

export default CardLabel;
