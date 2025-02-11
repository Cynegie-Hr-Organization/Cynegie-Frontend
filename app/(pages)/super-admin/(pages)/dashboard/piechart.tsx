"use client";

import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CustomChartConfig extends ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export function AppPieChart<T extends { value: number }>({
  chartData,
  chartConfig,
  innerRadius = 60,
  totalName = "Total",
  totalNameBeforeFigure = false,
  height = "max-h-[200px]",
}: {
  chartData: T[];
  chartConfig: CustomChartConfig;
  innerRadius?: number;
  totalName?: string;
  totalNameBeforeFigure?: boolean;
  height?: string;
}) {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className={`mx-auto aspect-square ${height}`}
    >
      <PieChart>
        <ChartTooltip
          cursor
          content={
            <ChartTooltipContent
              hideLabel
              className="bg-white border-none font-roboto text-xs"
            />
          }
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="label"
          innerRadius={innerRadius}
          strokeWidth={100}
        >
          {Object.keys(chartConfig).map((entry, index) => {
            return (
              <Cell key={`cell-${index}`} fill={chartConfig[entry]?.color} />
            );
          })}
          {!totalNameBeforeFigure ? (
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
                        {totalName}
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 14}
                        className="fill-muted-foreground text-base font-bold"
                      >
                        ₦{total.toLocaleString()}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          ) : (
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
                        className="fill-muted-foreground text-base font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 14}
                        className="fill-foreground"
                      >
                        {totalName}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          )}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
