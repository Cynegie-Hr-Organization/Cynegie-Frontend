import { Box, Stack } from "@mui/material";
import BarChart from "./chart";
import Header from "@/app/_components/shared/section-with-cards/header";
import { useEffect, useState } from "react";
import { getTotalHoursWorked } from "@/app/api/services/employee/attendance";



const TotalHoursWorked = () => {
  const [chartData, setChartData] = useState<Record<string, string | number>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTotalHoursWorked();
      const dates = Object.keys(data).sort(); 
      const formattedData = dates.map((date, index) => ({
        item: `Day ${index + 1}`,
        value: data[date],
      }));
      setChartData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <Stack gap={2}>
      <Header title="Total Hours Worked" period="This week" titleSize="large" />
      <Box ml={-5}>
        <BarChart
          data={chartData as Record<string, string | number>[]}
          bars={[{ dataKey: "value" }]}
        />
      </Box>
    </Stack>
  );
};

export default TotalHoursWorked;