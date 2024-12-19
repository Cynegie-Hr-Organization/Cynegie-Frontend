import { InputFieldProps } from '@/app/_components/employee/modal/types';
import DotLegend from '@/app/_components/shared/charts/legends/dot-legend';
import InputField from '@/app/_components/shared/form/input-field';
import { color } from '@/constants';
import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export type BarChartProps = {
  data: Record<string, string | number>[];
  barSize?: number;
  isPercentage?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  bars?: { dataKey: string; fill?: string }[];
  inputFields?: InputFieldProps[];
  title?: string;
  hasLegend?: boolean;
};

const defaultHeight = 260;

const BarChart: React.FC<BarChartProps> = ({
  data,
  barSize,
  isPercentage,
  xAxisLabel,
  yAxisLabel,
  bars,
  inputFields: selectFields,
  title,
  hasLegend,
}) => {
  return (
    <div
      style={{
        position: 'relative',
      }}
      className={`${
        title
          ? hasLegend
            ? 'h-[470px] sm:h-[450px]'
            : 'h-[380px]'
          : hasLegend
          ? 'h-[420px]'
          : `h-[${defaultHeight}px]`
      }`}
    >
      <div className='absolute right-[50%] left-[50%] bottom-[15] sm:bottom-[6] font-bold text-[12px]'>
        {xAxisLabel}
      </div>
      {title && (
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col sm:flex-row  sm:items-center'>
            <div className='card-title-large flex-grow mb-3 sm:mb-0'>
              {title}
            </div>
            <div className='flex gap-4'>
              {selectFields?.map((field, index) => (
                <div className='w-[180px]' key={index}>
                  <InputField {...field} />
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-end'>
            <div className='flex gap-5'>
              {bars?.map((bar) => (
                <DotLegend
                  key={bar.dataKey}
                  dotColor={bar.fill ?? color.info.dark}
                  label={bar.dataKey}
                  type='meeting-indicator'
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <ResponsiveContainer
        height={title ? 300 : defaultHeight}
        className={` ${
          title
            ? hasLegend
              ? 'top-[150px] sm:top-[120px]'
              : 'top-[80px]'
            : hasLegend
            ? 'top-[120px]'
            : 'top-[80px]'
        }`}
      >
        <RechartsBarChart
          className={`${hasLegend ? 'mt-6' : ''}`}
          barSize={barSize ?? 12}
          barGap={0}
          data={data}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='item'
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            interval={0}
            fontSize={10}
            className='hidden sm:block'
          />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: 90,
              position: 'insideLeft',
              style: {
                textAnchor: 'middle',
                fontWeight: 'bold',
                fill: '#000',
                fontSize: '12px',
              },
            }}
            tickFormatter={(value) => `${value}${isPercentage ? '%' : ''}`}
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            fontSize={12}
          />
          {bars?.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.fill ?? color.info.dark}
              radius={[6, 6, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
