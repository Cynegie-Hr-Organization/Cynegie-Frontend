import { color } from '@/constants';
import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from 'recharts';

const data = [
  { ['2024']: 0, ['2023']: 0 },
  { ['2024']: 3000, ['2023']: 2210 },
  { ['2024']: 2000, ['2023']: 2290 },
  { ['2024']: 2780, ['2023']: 2000 },
  { ['2024']: 1890, ['2023']: 2181 },
  { ['2024']: 2390, ['2023']: 2500 },
  { ['2024']: 3490, ['2023']: 2100 },
];

const PerformanceSummaryChart = () => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        {/* <Tooltip /> */}
        <Area
          type='linear'
          dataKey='2024'
          strokeWidth={2}
          stroke={color.info.dark}
          fill='url(#gradientUv)'
        />
        <Area
          type='linear'
          dataKey='2023'
          strokeWidth={2}
          stroke={color.warning.dark}
          fill='url(#gradientUv)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PerformanceSummaryChart;
