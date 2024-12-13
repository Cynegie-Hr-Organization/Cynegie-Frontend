import { color } from '@/constants';
import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', ['2024']: 0, ['2023']: 0 },
  { name: 'Feb', ['2024']: 3000, ['2023']: 2210 },
  { name: 'Mar', ['2024']: 2000, ['2023']: 2290 },
  { name: 'Apr', ['2024']: 2780, ['2023']: 2000 },
  { name: 'May', ['2024']: 1890, ['2023']: 2181 },
  { name: 'Jun', ['2024']: 2390, ['2023']: 2500 },
  { name: 'Jul', ['2024']: 3490, ['2023']: 2100 },
];

const PerformanceSummaryChart = () => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <Tooltip />
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
