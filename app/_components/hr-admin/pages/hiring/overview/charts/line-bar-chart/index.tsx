/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { CardContent, CardHeader } from "@/app/_components/ui/card";
import {Dropdown} from '@/app/_components/ui/dropdown'

interface BarChartComponentProps {
  barChartData: any[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ barChartData }) => {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");

  return (
    <div className="">
      <CardHeader>
        <div className="flex flex-wrap flex-col items-start justify-between gap-4">
          <div className="flex w-full items-center justify-between flex-row">
            <div className="text-base font-semibold text-black tracking-[-0.02em] leading-[24px] md:text-[20px] md:leading-[32px] order-1">
              Hiring Pipeline
            </div>

            <div className="flex flex-col gap-4 items-end order-3 md:order-2">
              <div className="flex gap-2">
                <Dropdown
                  label="Month"
                  options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                  selected={selectedMonth}
                  onSelect={setSelectedMonth}
                />
                <Dropdown
                  label="Department"
                  options={["Engineering", "Design", "Marketing"]}
                  selected={selectedDepartment}
                  onSelect={setSelectedDepartment}
                />
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="flex flex-col gap-4 w-full items-end order-8 md:order-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                <span className="text-[11px] md:text-sm">Screening</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-200 rounded-full" />
                <span className="text-[11px] md:text-sm">Interviewing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-[11px] md:text-sm">Offered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <span className="text-[11px] md:text-sm">Hired</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 5, right: 15, left: 5, bottom: 5 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Screening" stackId="a" fill="#2563EB" radius={[0, 0, 12, 12]} />
              <Bar dataKey="Interviewing" stackId="a" fill="#BFDBFE" />
              <Bar dataKey="Offered" stackId="a" fill="#60A5FA" />
              <Bar dataKey="Hired" stackId="a" fill="#2263cB" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </div>
  );
};

export default BarChartComponent;
