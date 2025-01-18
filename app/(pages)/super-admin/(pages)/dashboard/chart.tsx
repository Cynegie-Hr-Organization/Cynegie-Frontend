"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", pay: 150 },
  { month: "Feb", pay: 200 },
  { month: "Mar", pay: 200 },
  { month: "Apr", pay: 135 },
  { month: "May", pay: 209 },
  { month: "Jun", pay: 214 },
  { month: "Jul", pay: 300 },
  { month: "Aug", pay: 350 },
  { month: "Sep", pay: 250 },
  { month: "Oct", pay: 200 },
  { month: "Nov", pay: 200 },
  { month: "Dec", pay: 200 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "linear-gradient(90deg, #0035C380 0%, #0035C300 100%)",
  },
} satisfies ChartConfig;

const formatLargeNumber = (value: number) => {
  if (value >= 1_000_000_000) {
    return (
      new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 1,
      }).format(value / 1_000_000_000) + "B"
    );
  } else if (value >= 1_000_000) {
    return (
      new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 1,
      }).format(value / 1_000_000) + "M"
    );
  } else if (value >= 1_000) {
    return (
      new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 1,
      }).format(value / 1_000) + "k"
    );
  } else {
    return new Intl.NumberFormat("en-US").format(value);
  }
};

export function GradientLineChart() {
  return (
    <ChartContainer
      className="h-[200px] w-full mt-6 -ml-6"
      config={chartConfig}
    >
      <ResponsiveContainer width="100%" height="100%">
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
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              className="bg-amber-600"
            >
              <stop offset="0%" stopColor="#0035C3" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
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
            dataKey="pay"
            type="number"
            domain={["auto", "auto"]}
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
                className="bg-white border-none outline-none shadow-primary shadow-2xl p-2 rounded-lg"
              />
            }
          />
          <Area
            dataKey="pay"
            type="natural"
            fill="url(#chartGradient)"
            fillOpacity={0.4}
            stroke="#0035C3"
            stackId="a"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
