import { Stack } from "@mui/material";
import LeaveBalanceLegend from "./legend";
import Title from "@/app/_components/shared/section-with-cards/title";
import DoughnutChart from "@/app/_components/shared/charts/donut-chart";
import leaveBalanceChartConfig from "./config";

const LeaveBalance = () => {
  return (
    <Stack gap={4}>
      <DoughnutChart {...leaveBalanceChartConfig} />
      <Title text="Leave Balance" />
      <LeaveBalanceLegend />
    </Stack>
  );
};

export default LeaveBalance;
