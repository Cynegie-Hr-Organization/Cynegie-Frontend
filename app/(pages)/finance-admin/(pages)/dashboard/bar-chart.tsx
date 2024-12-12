"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";


import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";




export interface ChartData {
  [key: string]: string | number
}

export interface BarChartComponentProps {
  chartData: ChartData[]
  chartConfig: ChartConfig
}


export function BarChartComponent({ chartData, chartConfig }: BarChartComponentProps) {
  return (
    <ChartContainer className="w-full h-full" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData} barCategoryGap="37%">
        <CartesianGrid
          horizontal={true}
          vertical={false}
          strokeDasharray="5 5"
          stroke="#f0f0f0"
          horizontalFill={['#fafafa']}
          fillOpacity={0.1}
        />
        <YAxis
          className="text-xs font-semibold text-[#bebebe]"
          dataKey={(data) => {
            const keys = Object.keys(data).filter(key => key !== 'month');
            return keys.reduce((sum, key) => sum + data[key], 0);
          }}
          tickLine={false}
          axisLine={false}
          tickMargin={25}
          tick={{ stroke: "#bebebe" }}
          tickFormatter={(value) => `$${Number(Math.round(value))}k`}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={15}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="bg-white border-none" />}
        />
        {/* <Bar dataKey="desktop" fill="#E8E8E8" radius={4} /> */}
        <Bar dataKey="mobile" fill="#0035C3" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
