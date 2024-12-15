"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function AppPieChart<T extends { value: number }>({
  chartData,
  chartConfig,
  innerRadius = 75,
}: {
  chartData: T[];
  chartConfig: ChartConfig;
  innerRadius?: number;
}) {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor
          content={
            <ChartTooltipContent className="bg-white border-none" hideLabel />
          }
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="task"
          innerRadius={innerRadius}
          strokeWidth={100}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 14}
                      className="fill-foreground"
                    >
                      Total
                    </tspan>

                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 14}
                      className="fill-muted-foreground text-3xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
