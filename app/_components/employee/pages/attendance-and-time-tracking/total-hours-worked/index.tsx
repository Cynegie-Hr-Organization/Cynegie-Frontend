import { Box, Stack } from "@mui/material";
import TotalHoursWorkedChart from "./chart";
import Header from "@/app/_components/shared/section-with-cards/header";

const TotalHoursWorked = () => {
  return (
    <Stack gap={2}>
      <Header title="Total Hours Worked" period="This week" titleSize="large" />
      <Box ml={-5}>
        <TotalHoursWorkedChart />
      </Box>
    </Stack>
  );
};

export default TotalHoursWorked;
