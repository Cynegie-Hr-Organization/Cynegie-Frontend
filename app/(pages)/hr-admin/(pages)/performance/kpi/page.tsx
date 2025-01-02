"use client";

import { PageHeader } from "@/app/_components/hr-admin/performance/page-header";
import { ChartConfig } from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GradientLineChart } from "./chart";
import { AppBarChart } from "./barchart";
import { AppSelect } from "@/app/_components/shared/select";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import {
  getGoalsAcheivementRate,
  getTrainingCompletionMonthlyRate,
  getTrainingCompletionRate,
} from "@/app/api/services/performance/kpi";
import {
  GoalAchievementRate,
  MonthlyCompletionRate,
  TrainingCompletionRate,
} from "@/types";

interface GradientChart {
  completed: number;
  inProgress?: number;
  month?: string;
}

const piechartConfig = {
  total: {
    label: "Total",
    color: "linear-gradient(90deg, #0035C380 0%, #0035C300 100%)",
  },
  completion: {
    label: "80% Completion",
    color: "#0F973D",
  },
  inProgress: {
    label: "20% In Progress",
    color: "#E6EBF9",
  },
} satisfies ChartConfig;

const getRandomNumber = (number: number): number => {
  return Math.floor(Math.random() * number);
};

const gradientChartData: GradientChart[] = [
  { month: "Jan", completed: 150, inProgress: getRandomNumber(150) },
  { month: "Feb", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Mar", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Apr", completed: 135, inProgress: getRandomNumber(150) },
  { month: "May", completed: 209, inProgress: getRandomNumber(150) },
  { month: "Jun", completed: 214, inProgress: getRandomNumber(150) },
  { month: "Jul", completed: 300, inProgress: getRandomNumber(150) },
  { month: "Aug", completed: 350, inProgress: getRandomNumber(150) },
  { month: "Sep", completed: 250, inProgress: getRandomNumber(150) },
  { month: "Oct", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Nov", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Dec", completed: 200, inProgress: getRandomNumber(150) },
];

const KpiPage = () => {
  const [chartData, setChartData] = useState<GradientChart[]>([]);

  const { data: goalAchievementData, isLoading: isGoalsLoading } =
    useQuery<GoalAchievementRate>({
      queryKey: ["goalsAchievementRate"],
      queryFn: getGoalsAcheivementRate,
    });

  const { data: trainingCompletionData, isLoading: isTrainingLoading } =
    useQuery<TrainingCompletionRate>({
      queryKey: ["trainingCompletionRate"],
      queryFn: getTrainingCompletionRate,
    });

  const { data: monthlyCompletionData, isLoading: isMonthlyLoading } = useQuery<
    MonthlyCompletionRate[]
  >({
    queryKey: ["trainingCompletionMonthlyRate"],
    queryFn: getTrainingCompletionMonthlyRate,
  });

  useEffect(() => {
    if (Array.isArray(monthlyCompletionData)) {
      const transformedData: GradientChart[] = monthlyCompletionData.map(
        (item) => ({
          month: item.month,
          completed: item.completionRate,
          inProgress: 0,
        }),
      );
      setChartData(transformedData);
    } else {
      setChartData([]);
    }
  }, [monthlyCompletionData]);

  const fetchData = async (): Promise<GradientChart[]> => {
    return gradientChartData.map((data) => ({
      ...data,
      completed: getRandomNumber(100),
      inProgress: getRandomNumber(150),
    }));
  };

  useEffect(() => {
    const loadChartData = async () => {
      const data = await fetchData();
      setChartData(data);
    };

    loadChartData();
  }, []);

  return (
    <div className="space-y-6 mb-12">
      <PageHeader
        title="KPI Dashboard"
        description="Manage employee and organization KPI"
        buttonLabel="View Detailed Report"
        to="/hr-admin/performance/kpi/details"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {/* Average Performance Rating */}
        <KpiCard
          title="Average Performance Rating"
          value="4.2/5"
          percentage="+0.3%"
        />

        <KpiCard
          title="Goal Achievement Rate"
          value={
            isGoalsLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              `${goalAchievementData?.achievementRate || "N/A"}%`
            )
          }
          percentage="+0%"
        />

        {/* Employee Engagement Score */}
        <KpiCard
          title="Employee Engagement Score"
          value="72%"
          percentage="+0.3%"
        />

        <KpiCard
          title="Training Completion Rate"
          value={
            isTrainingLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              `${trainingCompletionData?.completionRate || "N/A"}%`
            )
          }
          percentage="+0%"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-x-2">
          Performance Rating Trends{" "}
          <span className="text-gray-500">
            <IoIosArrowDown />
          </span>
        </h3>

        <div className="common-card flex flex-col gap-y-4">
          {isMonthlyLoading ? (
            <Skeleton className="h-[300px]" />
          ) : (
            <GradientLineChart
              chartConfig={piechartConfig}
              chartData={chartData}
              areas={[
                { dataKey: "inProgress", stroke: "#E6EBF9" },
                { dataKey: "completed", stroke: "#335DCF" },
              ]}
            />
          )}
        </div>

        <div className="common-card flex flex-col gap-y-4">
          <AppSelect
            width="w-[144.34px]"
            placeholder="Today"
            listItems={[
              { label: "Today", value: "today" },
              { label: "Last 7 Days", value: "last-7-days" },
              { label: "Last 30 Days", value: "last-30-days" },
              { label: "Last 6 Months", value: "last-6-months" },
            ]}
            onChange={() => {}}
          />

          <GradientLineChart
            chartConfig={piechartConfig}
            chartData={chartData}
            areas={[
              { dataKey: "inProgress", stroke: "#E6EBF9" },
              { dataKey: "completed", stroke: "#335DCF" },
            ]}
          />
        </div>

        <div className="common-card flex flex-col gap-y-4">
          <AppSelect
            width="w-[144.34px]"
            placeholder="Today"
            listItems={[
              { label: "Today", value: "today" },
              { label: "Last 7 Days", value: "last-7-days" },
              { label: "Last 30 Days", value: "last-30-days" },
              { label: "Last 6 Months", value: "last-6-months" },
            ]}
            onChange={() => {}}
          />
          <div className="max-h-[400px]">
            {isMonthlyLoading ? (
              <Skeleton className="h-[300px]" />
            ) : (
              <AppBarChart chartData={chartData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface KpiCardProps {
  title: string;
  value: string | React.JSX.Element;
  percentage: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, percentage }) => {
  return (
    <div className="common-card text-sm space-y-8">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <div className="flex items-center justify-between gap-x-2">
        <p className="font-bold">{value}</p>
        <p className=" text-green-500">
          {percentage} <span className="text-gray-500">Last 6 Months</span>
        </p>
      </div>
    </div>
  );
};

export default KpiPage;
