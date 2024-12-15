"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 30, fill: "#0030B1" },
  { browser: "safari", visitors: 70, fill: "#FF9900" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieChart2() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent className="bg-white border-none" hideLabel />
          }
        />
        <Pie data={chartData} dataKey="visitors" nameKey="browser" />
      </PieChart>
    </ChartContainer>
  );
}
