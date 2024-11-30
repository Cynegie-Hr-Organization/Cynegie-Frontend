"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const formatLargeNumber = (value: number) => {
  if (value >= 1_000_000_000) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 1,
    }).format(value / 1_000_000_000) + 'B';
  } else if (value >= 1_000_000) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 1,
    }).format(value / 1_000_000) + 'M';
  } else if (value >= 1_000) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 1,
    }).format(value / 1_000) + 'k';
  } else {
    return new Intl.NumberFormat('en-US').format(value);
  }
};

export function GradientLineChart({
  chartConfig,
  chartData,
  gradient = {
    id: "chartGradient",
    stops: [
      { offset: "0%", stopColor: "#0035C3", stopOpacity: 0.4 },
      { offset: "100%", stopColor: "#ffffff", stopOpacity: 0 }
    ]
  },
  areas = [
    {
      dataKey: "completed",
      stroke: "#0035C3"
    }
  ]
}: {
  chartConfig: ChartConfig,
  chartData: any[],
  gradient?: { id: string, stops: { offset: string, stopColor: string, stopOpacity: number }[] },
  areas?: { dataKey: string, stroke: string }[]
}) {
  return (
    <ChartContainer className="h-[300px] w-full mt-6 -ml-6" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 0,
          right: 5,
          bottom: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id={gradient.id} x1="0%" y1="0%" x2="0%" y2="100%">
            {gradient.stops.map((stop) => (
              <stop
                key={stop.offset}
                offset={stop.offset}
                stopColor={stop.stopColor}
                stopOpacity={stop.stopOpacity}
              />
            ))}
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          stroke="#E0E0E0"
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          type="number"
          domain={['auto', 'auto']}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatLargeNumber}
          interval="preserveStartEnd"
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dot"
              className="bg-white border-none outline-none shadow-primary/25 shadow-2xl p-2 rounded-lg"
            />
          }
        />

        {areas.map((area) => (
          <Area
            key={area.dataKey}
            dataKey={area.dataKey}
            type="natural"
            fill={`url(#${gradient.id})`}
            fillOpacity={0.4}
            stroke={area.stroke}
            stackId="a"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  )
}
