/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GradientChart {
  completed: number;
  inProgress?: number;
  month?: string;
}

export function AppBarChart({ chartData }: { chartData: GradientChart[] }) {
  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#B0C0EC",
    },
    inProgress: {
      label: "In Progress",
      color: "#5478D7",
    },
    notStarted: {
      label: "Not Started",
      color: "#E6EBF9",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="max-h-72 w-full">
      <BarChart accessibilityLayer data={chartData} barGap={2}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          domain={[0, "dataMax"]}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          interval="preserveStartEnd"
          tickFormatter={(value) => `${value}`}
        />
        <CartesianGrid
          horizontal={true}
          vertical={false}
          strokeDasharray="5 5"
          stroke="#f0f0f0"
          horizontalFill={["#fafafa"]}
          fillOpacity={0.1}
        />
        <Bar
          barSize={28}
          dataKey="completed"
          stackId="a"
          fill="#0035C3"
          radius={[0, 0, 8, 8]}
        />
        <Bar
          barSize={28}
          dataKey="inProgress"
          stackId="a"
          fill="#5478D7"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          barSize={28}
          dataKey="notStarted"
          stackId="a"
          fill="#B0C0EC"
          radius={[8, 8, 0, 0]}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="bg-white border-none"
              labelKey="activities"
              indicator="line"
            />
          }
          cursor={false}
          defaultIndex={1}
        />
      </BarChart>
    </ChartContainer>
  );
}
