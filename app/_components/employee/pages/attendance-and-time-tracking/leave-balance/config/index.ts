import { defaultDonutChartOptions } from "@/constants";
import leaveBalanceChartData from "../chart/data";

const leaveBalanceChartConfig = {
  data: leaveBalanceChartData,
  options: {
    ...defaultDonutChartOptions,
    rotation: 270,
    cutout: "85%",
  },
  chartwidth: 100,
  chartheight: 60,
  centertext: { value: 5, label: "Days" },
  containersx: { height: "166px" },
};

export default leaveBalanceChartConfig;
