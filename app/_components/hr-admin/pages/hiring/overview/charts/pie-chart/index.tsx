import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";
import {  CardTitle } from "@/app/_components/ui/card"; 

interface PieChartComponentProps {
  donutChartData: {
    name: string;
    value: number;
    color: string;
  }[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  donutChartData,
}) => {
  return (
    <div className=" p-4  mnax-w-lg">
      <CardTitle className="font-semibold text-[16px] text-black font-sans">Job Offer Summary</CardTitle>
      <div className="border-2 rounded-lg flex gap-2 items-center mt-2 max-w-max px-2">
        <select className="h-8 rounded-md bg-background px-[1px] py-[1px] text-[10.77px]">
          <option>This month</option>
          <option>Last month</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="flex flex-col items-center justify-between h-[80%]">
        <div className="w-full mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donutChartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {donutChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full mt-4  max-w-[16rem] space-y-2">
          {donutChartData.map((entry) => (
            <div key={entry.name} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-lg  font-medium">{entry.name}</span>
              <span className="text-lg font-medium ml-auto">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
