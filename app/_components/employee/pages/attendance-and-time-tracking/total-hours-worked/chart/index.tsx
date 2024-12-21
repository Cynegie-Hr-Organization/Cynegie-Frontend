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
  Cell,
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
  isCard?: boolean;
  chartLayout?: 'horizontal' | 'vertical';
  xAxisType?: 'number' | 'category';
  xAxisDataKey?: string;
  yAxisType?: 'number' | 'category';
  yAxisDataKey?: string;
  hideXAxis?: boolean;
  removeCartesianGrid?: boolean;
  barRadius?: number | [number, number, number, number];
  barColors?: string[];
  chartLeftMargin?: number;
  chartMargin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  yAxisTickMargin?: number;
  useCustomTick?: boolean;
  fitContent?: boolean;
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
  isCard,
  chartLayout = 'horizontal',
  xAxisType = 'category',
  xAxisDataKey = 'item',
  yAxisType = 'number',
  yAxisDataKey,
  hideXAxis = false,
  removeCartesianGrid = false,
  barRadius = [6, 6, 0, 0],
  barColors,
  chartMargin,
  yAxisTickMargin = 10,
  useCustomTick = false,
  fitContent = false,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        ...(fitContent && { height: 'fit-content' }),
      }}
      className={`${isCard && 'common-card'} ${
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
          {hasLegend && (
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
          )}
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
          layout={chartLayout}
          margin={chartMargin}
        >
          {!removeCartesianGrid && <CartesianGrid vertical={false} />}
          <XAxis
            dataKey={xAxisDataKey}
            type={xAxisType}
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            interval={0}
            fontSize={10}
            className={`hidden sm:block ${hideXAxis && 'sm:hidden'}`}
          />
          <YAxis
            dataKey={yAxisDataKey}
            type={yAxisType}
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
            tickMargin={yAxisTickMargin}
            fontSize={12}
            {...(useCustomTick && {
              tick: ({ payload, x, y, textAnchor }) => (
                <text
                  x={x}
                  y={y}
                  dy={3.5}
                  textAnchor={textAnchor}
                  width={90} // Prevents wrapping
                  overflow='hidden'
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    textAnchor: 'start',
                    paddingTop: '10px',
                  }}
                  className='tiny-text'
                >
                  {payload.value}
                </text>
              ),
            })}
          />
          {bars?.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.fill ?? color.info.dark}
              radius={barRadius}
            >
              {barColors &&
                data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors?.[index % barColors?.length]}
                  />
                ))}
            </Bar>
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
