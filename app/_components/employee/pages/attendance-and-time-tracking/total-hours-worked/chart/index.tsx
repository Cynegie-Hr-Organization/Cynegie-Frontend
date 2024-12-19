import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type BarChartProps = {
  data: { item: string; value: number }[];
  barSize?: number;
  barFill?: string;
  isPercentage?: boolean;
  yAxisLabel?: string;
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  barSize,
  barFill,
  isPercentage,
  yAxisLabel,
}) => {
  return (
    <div style={{ position: 'relative', height: 260 }}>
      <ResponsiveContainer
        height={260}
        style={{ position: 'absolute', top: 20 }}
      >
        <RechartsBarChart barSize={barSize ?? 12} data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='item'
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            interval={0}
            fontSize={10}
          />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: 90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontWeight: 'bold' },
            }}
            tickFormatter={(value) => `${value}${isPercentage ? '%' : ''}`}
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            fontSize={12}
          />
          <Bar
            dataKey='value'
            fill={barFill ?? '#0035C3'}
            radius={[6, 6, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
