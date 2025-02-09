import { Grid2 } from "@mui/material";
import LegendSeries from "./series";
import leaveBalanceLegendData from "./data";

const LeaveBalanceLegend = () => {
  return (
    <Grid2 container spacing={3}>
      {leaveBalanceLegendData.map((series, index) => (
        <Grid2 key={index} size={{ xs: 6 }}>
          <LegendSeries
            color={series.color}
            label={series.label}
            value={series.value}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default LeaveBalanceLegend;
