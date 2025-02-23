"use client";

import { PageHeader } from "@/app/_components/hr-admin/performance/page-header";
import { IoIosArrowDown } from "react-icons/io";
import PerformanceChart from "./chart";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import {
  getGoalsAcheivementRate,
  getTrainingCompletionRate,
} from "@/app/api/services/performance/kpi";
import { GoalAchievementRate, TrainingCompletionRate } from "@/types";
import PerformanceBreakdown from "@/app/_components/hr-admin/performance/kpi/perfomance-breakdown";

const KpiPage = () => {
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
        <KpiCard title="Total Completed Assessments" value="50" percentage="" />

        <KpiCard
          title="Average Employee  Rating"
          value={
            isGoalsLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              `${goalAchievementData?.achievementRate || "78"}%`
            )
          }
          percentage=""
        />

        {/* Employee Engagement Score */}
        <KpiCard title=" Goal Achievement Rate" value="72%" percentage="" />

        <KpiCard
          title="Training Completion Rate"
          value={
            isTrainingLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              `${trainingCompletionData?.completionRate || "N/A"}%`
            )
          }
          percentage=""
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
          <PerformanceChart />
        </div>

        <h3 className="text-lg font-bold flex items-center gap-x-2">
          Performance Rating Trends{" "}
          <span className="text-gray-500">
            <IoIosArrowDown />
          </span>
        </h3>

        <PerformanceBreakdown />
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
