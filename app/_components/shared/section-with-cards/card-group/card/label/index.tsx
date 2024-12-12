import { Stack } from '@mui/material';
import CardLabelIcon from './icon';
import CardLabelText from './text';
import React from 'react';
import { CardLabelProps } from '../../../types';

const CardLabel: React.FC<CardLabelProps> = (props) => {
  const {
    icon,
    iconColorVariant,
    iconContainerHeight,
    iconContainerWidth,
    text,
    hasIcon = false,
  } = props;
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
