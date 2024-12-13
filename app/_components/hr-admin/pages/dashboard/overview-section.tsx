import { Stack, Box, Grid2, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { GradientLineChart } from "./chart";
import { PieChart } from "@mui/x-charts/PieChart";
import { newIndex } from "@/lib/utils";
import Todo from "@/app/_components/todo";

const colors = {
  red: "#D42620",
  grey: "#E6EBF9",
  yellow: "#FFAD33",
  green: "#0F973D",
};
const data = [
  { value: 40, label: "A", color: colors.green },
  { value: 40, label: "B", color: colors.yellow },
  { value: 40, label: "C", color: colors.grey },
  { value: 40, label: "D", color: colors.red },
];

const size = {
  width: 250,
  height: 150,
};

const overviewContents = [
  {
    color: "#EADAFF",
    title: "Total Open Positions",
    count: 15,
  },
  {
    color: "#D2F1DE",
    title: "Total Applications",
    count: 900,
  },
  {
    color: "#DEE3FF",
    title: "Pending Offer",
    count: 5,
  },
  {
    color: "#DEE3FF",
    title: "Interview Scheduled",
    count: 4,
  },
];

const OverViewSection = () => {
  return (
    <>
      <OverViewCards />
      <ChartsCard />
      <PriorityCard />
    </>
  );
};

const OverViewCards = () => {
  return (
    <Stack gap={2}>
      <Box className="section-heading">Overview</Box>
      <Grid2 columnSpacing={2} rowSpacing={2} container>
        {overviewContents.map((content) => (
          <Grid2
            key={content.title}
            size={{ xs: 12, sm: 6, md: 3 }}
            className="border-[1.13px] border-card-border bg-white p-3 md:p-5 rounded-[12.56px]"
          >
            <Stack gap={3}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Box
                  className={`p-1 rounded-full text-center flex justify-center`}
                  sx={{ backgroundColor: content.color }}
                >
                  <Image
                    src="/icons/task-square-bold.svg"
                    alt=""
                    width={13.56}
                    height={13.56}
                  />
                </Box>
                <Box className="font-semibold text-[#1B1B1B]">
                  {content.title}
                </Box>
              </Stack>

              <Box className="text-[33.48px] font-bold text-[#1B1B1B]">
                {content.count}
              </Box>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};

const ChartsCard = () => {
  return (
    <Grid2 columnSpacing={3} rowSpacing={3} container>
      <Grid2
        className="border-[1.13px] border-card-border bg-white p-4 rounded-[12.56px]"
        size={{ xs: 12, sm: 6, md: 8 }}
      >
        <Stack gap={2}>
          <Stack direction="row">
            <Box className="card-title-large flex-grow">
              Total Payroll Processed
            </Box>
            <Select
              defaultValue="Monthly"
              className="h-[30px] rounded-[4.62px] pr-[15px]"
              disabled
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </Stack>
          <Box>
            <GradientLineChart />
          </Box>
        </Stack>
      </Grid2>

      <Grid2
        className="border-[1.13px] border-card-border bg-white p-4 rounded-[12.56px]"
        size={{ xs: 12, sm: 6, md: 4 }}
      >
        <Stack gap={2}>
          <Box className="card-title-large">Employee Status Distribution</Box>
          <Box
            sx={{
              display: "flex",
              marginTop: { xs: "0px", sm: "0px", md: "-20px", lg: "0px" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PieChart
              series={[{ data, innerRadius: 55, cx: 120 }]}
              slotProps={{
                legend: { hidden: true },
              }}
              {...size}
            />
          </Box>
          <Stack gap={2}>
            {[
              { color: colors.green, label: "Active", percentage: 75 },
              { color: colors.yellow, label: "On Leave", percentage: 10 },
              { color: colors.grey, label: "Probation", percentage: 5 },
              { color: colors.red, label: "Resigned", percentage: 10 },
            ].map((item, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                gap={2}
                sx={{ fontSize: "18px" }}
              >
                <Box
                  style={{
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    backgroundColor: item.color,
                  }}
                />
                <Box flexGrow={1}>{item.label}</Box>
                <Box>{item.percentage}%</Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

const PriorityCard = () => {
  return (
    <Grid2 className="common-card" size={{ xs: 12, sm: 6, md: 8.5 }}>
      <Stack gap={2}>
        <Stack direction="row">
          <Box className="card-title-large flex-grow">Priority Todos</Box>
          <Select
            defaultValue="Monthly"
            className="h-[30px] rounded-[4.62px] pr-[15px]"
            disabled
          >
            <MenuItem value="Monthly">Today</MenuItem>
          </Select>
        </Stack>
        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {Array(3)
            .fill(undefined)
            .map((_, index) => {
              return (
                <Grid2 key={newIndex(index)} size={{ xs: 12, md: 4 }}>
                  <Todo />
                </Grid2>
              );
            })}
        </Grid2>
        <Box className="underline text-[#0035C3] cursor-pointer">
          View all tasks
        </Box>
      </Stack>
    </Grid2>
  );
};

export default OverViewSection;
