"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface ChartData {
  [key: string]: string | number;
}

export interface BarChartComponentProps {
  chartData: ChartData[];
  chartConfig: ChartConfig;
}

export function BarChartComponent({
  chartData,
  chartConfig,
}: BarChartComponentProps) {
  const processedData = chartData.map((data) => {
    const xAxisValue = data.xAxis;

    const inflow = data.pay1 || 0;
    const outflow = data.pay2 || 0;

    return { ...data, inflow, outflow, xAxisValue };
  });

  return (
    <ChartContainer className="w-full h-full" config={chartConfig}>
      <BarChart accessibilityLayer data={processedData} barCategoryGap="37%">
        <CartesianGrid
          horizontal={true}
          vertical={false}
          strokeDasharray="5 5"
          stroke="#f0f0f0"
          horizontalFill={["#fafafa"]}
          fillOpacity={0.1}
        />
        <YAxis
          className="text-xs font-semibold text-[#bebebe]"
          dataKey="inflow"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ stroke: "#bebebe" }}
          tickFormatter={(value) => `$${Number(Math.round(value))}M`}
        />
        <XAxis
          dataKey="xAxisValue"
          tickLine={false}
          tickMargin={15}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="bg-white border-none" />}
        />
        <Bar fill="#0035C3" radius={4} dataKey="inflow" />
        <Bar fill="#E8E8E8" radius={4} dataKey="outflow" />
      </BarChart>
    </ChartContainer>
  );
}
