import { color } from "@/constants";

const reviewCycleProgressChartData = {
  labels: ["Remaining Days", "Days Passed"],
  datasets: [
    {
      data: [25, 75],
      backgroundColor: ["#F0F2F5", color.warning.dark],
      borderWidth: 0,
      borderRadius: [0, 42.3],
      spacing: -10,
    },
  ],
};

export default reviewCycleProgressChartData;
