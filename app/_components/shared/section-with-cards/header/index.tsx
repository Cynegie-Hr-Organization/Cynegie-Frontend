import { Box, Divider, Stack } from '@mui/material';
import React from 'react';
import Title from '../title';
import Period from '../period';

const Header: React.FC<{
  title: string;
  period?: string;
  hasDivider?: boolean;
  periodFont?: { size: number; weight: number; color: string };
  titleSize?: 'small' | 'large';
  periodClick?: () => void;
}> = ({
  title,
  period = '',
  hasDivider = false,
  titleSize = 'small',
  periodFont,
  periodClick,
}) => {
  return (
    <Stack {...(hasDivider && { gap: 1.5 })}>
      <Stack direction='row' alignItems='center'>
        <Box flexGrow={1}>
          <Title text={title} size={titleSize} />
        </Box>
        <div
          onClick={periodClick}
          style={{ ...(periodClick && { cursor: 'pointer' }) }}
        >
          <Period text={period} font={periodFont} />
        </div>
      </Stack>
      {hasDivider && (
        <Box mx={-2.5}>
          <Divider />
        </Box>
      )}
    </Stack>
  );
};

export default Header;
