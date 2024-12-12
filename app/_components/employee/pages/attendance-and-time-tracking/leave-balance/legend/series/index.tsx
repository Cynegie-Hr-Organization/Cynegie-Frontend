import { Stack } from '@mui/material';
import React from 'react';
import SeriesLabel from './label';
import SeriesValue from './value';

const LegendSeries: React.FC<{
  color: string;
  label: string;
  value: number | string;
  valueOnTop?: boolean;
}> = ({ color, label, value, valueOnTop = false }) => {
  return (
    <Stack
      sx={{
        borderLeft: `3.26px solid ${color}`,
        pl: 1.5,
        ...(valueOnTop && { flexDirection: 'column-reverse' }),
      }}
      gap={1}
    >
      <SeriesLabel label={label} />
      <SeriesValue value={value} />
    </Stack>
  );
};

export default LegendSeries;
