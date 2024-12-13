import { color } from '@/constants';
import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 0, amt: 0 },
  { name: 'Feb', uv: 3000, amt: 2210 },
  { name: 'Mar', uv: 2000, amt: 2290 },
  { name: 'Apr', uv: 2780, amt: 2000 },
  { name: 'May', uv: 1890, amt: 2181 },
  { name: 'Jun', uv: 2390, amt: 2500 },
  { name: 'Jul', uv: 3490, amt: 2100 },
];

const PerformanceSummaryChart = () => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <Tooltip />
        <Area
          type='linear'
          dataKey='uv'
          strokeWidth={2}
          stroke={color.info.dark}
          fill='url(#gradientUv)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PerformanceSummaryChart;
