"use client";

import { AppSelect } from "@/app/_components/shared/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", performance: 35 },
  { month: "Feb", performance: 40 },
  { month: "Mar", performance: 38 },
  { month: "Apr", performance: 32 },
  { month: "May", performance: 36 },
  { month: "Jun", performance: 45 },
  { month: "Jul", performance: 50 },
  { month: "Aug", performance: 53 },
  { month: "Sept", performance: 55 },
  { month: "Oct", performance: 48 },
  { month: "Nov", performance: 40 },
  { month: "Dec", performance: 80 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md px-3 py-2 rounded-md border border-gray-200">
        <p className="text-sm font-semibold">
          {label} {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function PerformanceChart() {
  return (
    <div className="w-full h-[500px] flex flex-col items-center gap-4">
      <div className="w-full flex  justify-between">
        <div className="flex justify-start gap-2 w-full">
          <AppSelect
            width="w-[144.34px]"
            placeholder="Monthly"
            listItems={[
              { label: "January", value: "January" },
              { label: "February", value: "Febraury" },
              { label: "March", value: "March" },
              { label: "April", value: "April" },
            ]}
            onChange={() => {}}
          />
          <AppSelect
            width="w-[144.34px]"
            placeholder="Assessment Type "
            listItems={[
              { label: "Self", value: "self" },
              { label: "Team", value: "team" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#0030B1] rounded-full"></span>
          <h2 className="text-gray-700 whitespace-nowrap text-base font-light">
            Employee Performance Rating
          </h2>
        </div>
      </div>
      <ResponsiveContainer className="p-2 m-2" width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis
            domain={[10, 100]}
            stroke="#94a3b8"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
