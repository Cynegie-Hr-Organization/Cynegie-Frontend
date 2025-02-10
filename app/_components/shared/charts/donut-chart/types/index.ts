import { SxProps } from "@mui/material";
import { ChartData, ChartOptions } from "chart.js";

export type DonutChartProps = {
  data: ChartData<"doughnut", number[], string>;
  options: ChartOptions<"doughnut">;
  chartwidth: number;
  chartheight: number;
  centertext?: ChartCenterTextProps;
  containersx?: SxProps;
  isvaluepercentage?: boolean;
};

export type ChartCenterTextProps = ChartCenterTextValueProps & {
  denominator?: number;
  label?: string;
};

export type ChartCenterTextValueProps = {
  value?: number;
  isPercentage?: boolean;
  denominator?: number;
};
