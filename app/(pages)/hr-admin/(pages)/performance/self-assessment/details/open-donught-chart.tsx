"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const colors = {
  grey: "#E6EBF9",
  yellow: "#FFAD33",
  green: "#0F973D",
  blue: "#335DCF",
};

const chartData = [
  { task: "Communication", value: 275, fill: colors.green },
  { task: "Leadership", value: 200, fill: colors.blue },
  { task: "Teamwork", value: 187, fill: colors.yellow },
  { task: "Initiative", value: 173, fill: colors.grey },
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

export function OpenDonughtChart({
  innerRadius = 60,
  outerRadius = 90,
  className,
}: {
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
}) {
  console.log("Rendering OpenDonughtChart with data:", chartData);

  return (
    <ChartContainer
      config={chartConfig}
      className={`mx-auto h-48 w-48 ${className ?? ""}`}
    >
      <PieChart width={192} height={192}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="bg-white" hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="task"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />
      </PieChart>
    </ChartContainer>
  );
}
