"use client";

import { cn } from "@/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import { PiListChecksFill } from "react-icons/pi";
import { AppPieChart } from "../../../../../_components/shared/piechart";
import { ChartConfig } from "@/components/ui/chart";
import { GradientLineChart } from "./components/chart";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import PerformanceReviewTable from "./components/table";
import { useRouter } from "next/navigation";

const colors = {
  grey: "#E6EBF9",
  yellow: "#FFAD33",
  green: "#0F973D",
  blue: "#335DCF",
};

// const overviewContents = [
//   {
//     color: "#EADAFF",
//     title: "Total Open Positions",
//     count: 15,
//   },
//   {
//     color: "#D2F1DE",
//     title: "Total Applications",
//     count: 900,
//   },
//   {
//     color: "#DEE3FF",
//     title: "Pending Offer",
//     count: 5,
//   },
// ];

const piechartConfig = {
  total: {
    label: "Total",
    color: "linear-gradient(90deg, #0035C380 0%, #0035C300 100%)",
  },
  completed: {
    label: "Completed",
    color: "#0F973D",
  },
  due: {
    label: "Due",
    color: "#FFAD33",
  },
  inProgress: {
    label: "In Progress",
    color: "#335DCF",
  },
  notStarted: {
    label: "Not Started",
    color: "#E6EBF9",
  },
} satisfies ChartConfig;

const getRandomNumber = (number: number) => {
  return Math.floor(Math.random() * number);
};

interface GradientChart {
  month: string;
  completed: number;
  inProgress: number;
  due: number;
  notStarted: number;
}

const gradientChartData: GradientChart[] = [
  {
    month: "Jan",
    completed: 150,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Feb",
    completed: 200,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Mar",
    completed: 200,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Apr",
    completed: 135,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "May",
    completed: 209,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Jun",
    completed: 214,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Jul",
    completed: 300,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Aug",
    completed: 350,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Sep",
    completed: 250,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Oct",
    completed: 200,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Nov",
    completed: 200,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
  {
    month: "Dec",
    completed: 200,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  },
];

const piechartData = [
  {
    task: "completed",
    value: gradientChartData[0].completed,
    fill: colors.grey,
  },
  { task: "due", value: gradientChartData[0].due, fill: colors.blue },
  {
    task: "inProgress",
    value: gradientChartData[0].inProgress,
    fill: colors.yellow,
  },
  {
    task: "notStarted",
    value: gradientChartData[0].notStarted,
    fill: colors.green,
  },
  { task: "other", value: 190, fill: colors.grey },
];

const fetchData = async () => {
  return gradientChartData.map((data) => ({
    ...data,
    inProgress: getRandomNumber(150),
    due: getRandomNumber(100),
    notStarted: getRandomNumber(150),
  }));
};

const PerformanceOverviewPage = () => {
  const router = useRouter();
  const [chartData, setChartData] = useState<typeof gradientChartData>([]);

  useEffect(() => {
    const loadChartData = async () => {
      const data = await fetchData();
      setChartData(data);
    };

    loadChartData();
  }, []);

  // const statuses = ['In Progress', 'Completed', 'Draft', 'Not Started']
  // const [selectedStatus, setSelectedStatus] = useS<string[]>([])

  return (
    <div className="space-y-8 mb-6">
      <div className="hidden md:flex items-center justify-between gap-4">
        <h3 className="text-base md:text-2xl font-medium text-black">
          Performance Overview
        </h3>

        <div className="flex gap-4">
          <Link
            href="#"
            className="font-bold rounded-lg px-4 py-2 border-2 border-primary flex gap-2 text-primary h-12 w-[192px] items-center justify-center btn-active"
          >
            Actions <IoIosArrowDown />
          </Link>
          <button
            onClick={() => {
              router.push("/hr-admin/performance/review-cycle/new");
            }}
            className="font-bold rounded-lg px-4 py-2 text-white bg-primary h-12 w-[249px] btn-active flex items-center justify-center"
          >
            Create New Review Cycle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-8 xl:col-span-9 space-y-4 flex flex-col">
          <OverviewCards />
          <BarChartCard chartData={gradientChartData} />
        </div>

        <PieChartCard
          className="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-3 h-auto"
          chartData={chartData}
        />
      </div>

      <PerformanceReviewTable />
    </div>
  );
};

const OverviewCards = ({ className }: { className?: string }) => {
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
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 items-center ",
        className,
      )}
    >
      {overviewContents.map((content) => {
        const { color, title, count } = content;

        return (
          <div className="common-card w-full flex flex-col" key={title}>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <PiListChecksFill />
              </div>
              <h3 className="text-base font-semibold text-black">{title}</h3>
            </div>
            <p className="text-3xl font-bold text-black mt-[27px]">{count}</p>
          </div>
        );
      })}
    </div>
  );
};

const BarChartCard = ({
  className,
  chartData,
}: {
  className?: string;
  chartData: typeof gradientChartData;
}) => {
  return (
    <div className={cn("common-card", className)}>
      <GradientLineChart
        chartConfig={piechartConfig}
        chartData={chartData}
        areas={[
          { dataKey: "completed", stroke: "#E6EBF9" },
          { dataKey: "inProgress", stroke: "#335DCF" },
          { dataKey: "due", stroke: "#FFAD33" },
          { dataKey: "notStarted", stroke: "#0F973D" },
        ]}
      />
    </div>
  );
};

const PieChartCard = ({
  className,
  chartData,
}: {
  className?: string;
  chartData: typeof gradientChartData;
}) => {
  const total = useMemo(() => {
    return (
      chartData[0]?.completed +
      chartData[0]?.due +
      chartData[0]?.inProgress +
      chartData[0]?.notStarted
    );
  }, [chartData]);

  const getPercentage = (number: number) => {
    return Math.floor((number / total) * 100);
  };

  return (
    <div className={cn("flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-black"> Priority Todos </h3>
        <button type="button" className="text-primary font-bold">
          {" "}
          See all{" "}
        </button>
      </div>

      <div className="common-card w-full mt-4 h-full">
        <AppPieChart
          chartData={piechartData}
          chartConfig={piechartConfig}
          innerRadius={70}
        />

        <div className="space-y-2 mt-8">
          {[
            {
              color: colors.grey,
              label: "Completed goals",
              percentage: getPercentage(chartData[0]?.completed ?? 0),
            },
            {
              color: colors.blue,
              label: "Due Goals",
              percentage: getPercentage(chartData[0]?.due ?? 0),
            },
            {
              color: colors.yellow,
              label: "In Progress Goals",
              percentage: getPercentage(chartData[0]?.inProgress ?? 0),
            },
            {
              color: colors.green,
              label: "Not Started Goals",
              percentage: getPercentage(chartData[0]?.notStarted ?? 0),
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-lg">
              <div
                className="rounded-full w-[15px] h-[15px]"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-grow">{item.label}</div>
              <div>{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverviewPage;
