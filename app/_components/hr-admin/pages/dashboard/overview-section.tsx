import { AppSelect } from "@/app/_components/shared/select";
import CardSkeleton from "@/app/_components/shared/skelentons/card";
import Todo from "@/app/_components/todo";
import {
  useDashboardChartData,
  useDashboardOverviewData,
  useEmployeeStatus,
  usePriorityCards,
} from "@/app/_core/use-cases/hr-admin/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { newIndex } from "@/lib/utils";
import { Box, Grid2, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { PiListChecksFill } from "react-icons/pi";
import { GradientLineChart } from "./chart";

const colors = {
  red: "#D42620",
  grey: "#E6EBF9",
  yellow: "#FFAD33",
  green: "#0F973D",
};

const size = {
  width: 200,
  height: 200,
};

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
  const { data, isLoading } = useDashboardOverviewData();
  const {
    interviewsScheduled,
    pendingOffers,
    totalApplications,
    totalOpenPositions,
  } = data ?? {};

  const overviewContents = [
    {
      color: "#EADAFF",
      title: "Total Open Positions",
      count: totalOpenPositions ?? "...",
    },
    {
      color: "#D2F1DE",
      title: "Total Applications",
      count: totalApplications ?? "...",
    },
    {
      color: "#DEE3FF",
      title: "Pending Offer",
      count: pendingOffers ?? "...",
    },
    {
      color: "#DEE3FF",
      title: "Interview Scheduled",
      count: interviewsScheduled ?? "...",
    },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-base font-bold text-black">Overview</h3>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <CardSkeleton numberOfCards={overviewContents.length} />
        ) : (
          overviewContents.map((content) => (
            <div
              key={content.title}
              className="common-card p-3 md:p-5 rounded-[12.56px] space-y-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="p-1 rounded-full text-center flex justify-center w-fit"
                  style={{ backgroundColor: content.color }}
                >
                  <PiListChecksFill />
                </div>
                <p className="font-semibold text-[#1B1B1B] text-xs">
                  {content.title}
                </p>
              </div>

              <p className="text-lg font-bold text-[#1B1B1B]">
                {" "}
                {content.count}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ChartsCard = () => {
  const { data: chartData, isLoading } = useDashboardChartData();
  const { data: employeeStatus, isLoading: isEmployeeStatusLoading } =
    useEmployeeStatus();

  const { active, probation, resigned, onLeave } =
    employeeStatus?.statusDistribution ?? {};

  const data = [
    { value: active ?? 0, label: "A", color: colors.green },
    { value: probation ?? 0, label: "B", color: colors.yellow },
    { value: resigned ?? 0, label: "C", color: colors.grey },
    { value: onLeave ?? 0, label: "D", color: colors.red },
  ];

  console.log(chartData, isLoading);

  const timeRanges = [
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const handleTimeRangeChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="common-card p-4 rounded-[12.56px] col-span-1 lg:col-span-8">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-black w-full flex-grow">
            Total Payroll Processed
          </h3>
          <div>
            <AppSelect
              width="w-[120px]"
              placeholder="Monthly"
              listItems={timeRanges}
              onChange={handleTimeRangeChange}
            />
          </div>
        </div>

        <GradientLineChart chartData={[]} />
      </div>

      <div className="common-card p-4 rounded-xl col-span-1 lg:col-span-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-black">
            Employee Status Distribution
          </h3>

          <div className="flex justify-center mt-0 md:-mt-5 lg:mt-0">
            <PieChart
              series={[{ data, innerRadius: 65, cx: 90 }]}
              slotProps={{
                legend: { hidden: true },
              }}
              {...size}
            />
          </div>

          <div className="space-y-2">
            {isEmployeeStatusLoading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="h-2.5 w-2.5 bg-neutral-300 " />
                    <Skeleton className="h-4 w-32 bg-neutral-300" />
                  </div>
                  <Skeleton className="h-4 w-10 bg-neutral-300 " />
                </div>
              ))
            ) : (
              <>
                {[
                  {
                    color: colors.green,
                    label: "Active",
                    percentage: active ?? 0,
                  },
                  {
                    color: colors.yellow,
                    label: "On Leave",
                    percentage: onLeave ?? 0,
                  },
                  {
                    color: colors.grey,
                    label: "Probation",
                    percentage: probation ?? 0,
                  },
                  {
                    color: colors.red,
                    label: "Resigned",
                    percentage: resigned ?? 0,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1 text-base"
                  >
                    <div className="flex items-center gap-1">
                      <GoDotFill color={item.color} size={18} />
                      <p className="font-semibold text-xs">{item.label}</p>
                    </div>
                    <p className="font-semibold text-xs">{item.percentage}%</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PriorityCard = () => {
  const { data: priorityData, isLoading } = usePriorityCards();

  const timeRanges = [
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const handleTimeRangeChange = (value: string) => {
    console.log(value);
  };

  return (
    <Grid2 className="common-card" size={{ xs: 12, sm: 6, md: 8.5 }}>
      <Stack gap={2}>
        <Stack direction="row">
          <Box className="text-base font-semibold flex-grow">
            Priority Todos
          </Box>
          {isLoading ? (
            <Skeleton className="w-[120px] h-5 bg-neutral-300" />
          ) : (
            <AppSelect
              width="w-[120px]"
              placeholder="Monthly"
              listItems={timeRanges}
              onChange={handleTimeRangeChange}
            />
          )}
        </Stack>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <CardSkeleton numberOfCards={4} />
          </div>
        ) : (
          <>
            <Grid2 columnSpacing={2} rowSpacing={2} container>
              {priorityData && (priorityData?.tasks?.length ?? 0) > 0 ? (
                priorityData?.tasks?.map((task, index) => {
                  return (
                    <Grid2 key={newIndex(index)} size={{ xs: 12, md: 4 }}>
                      <Todo />
                    </Grid2>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 border border-dashed border-gray-200 p-4 rounded-lg w-full text-center">
                  You&apos;re all set. There is no existing task left.
                </p>
              )}
            </Grid2>
            <Link
              href="/hr-admin/onboarding/overview"
              className="underline text-[#0035C3] cursor-pointer hover:text-[#0035C3]/80 w-max"
            >
              View all tasks
            </Link>
          </>
        )}
      </Stack>
    </Grid2>
  );
};

export default OverViewSection;
