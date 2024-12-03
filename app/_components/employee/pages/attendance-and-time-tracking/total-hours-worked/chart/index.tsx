import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import totalHoursWorkedChartData from './data';

const TotalHoursWorkedChart: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: 260 }}>
      <ResponsiveContainer
        height={260}
        style={{ position: 'absolute', top: 20 }}
      >
        <BarChart barSize={12} data={totalHoursWorkedChartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='item'
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            interval={0}
            fontSize={8}
          />
          <YAxis axisLine={false} tickSize={0} tickMargin={10} fontSize={12} />
          <Bar dataKey='value' fill='#0035C3' radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalHoursWorkedChart;
