import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";
import { CardTitle } from "@/app/_components/ui/card";
import { Dropdown } from "@/app/_components/ui/dropdown"; // Assuming the Dropdown component is in this path

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
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("This month");

  const handleSelect = (option: string) => {
    setSelectedTimeFrame(option);
  };

  return (
    <div className="p-4 max-w-lg">
      <CardTitle className="font-semibold text-[16px] text-black font-sans">Job Offer Summary</CardTitle>
      
                      <div className="flex gap-2 w-1/3">
<Dropdown
        options={["This month", "Last month", "Last 3 months"]}
        selected={selectedTimeFrame}
        onSelect={handleSelect}
      />

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

        <div className="w-full mt-4 max-w-[16rem] space-y-2">
          {donutChartData.map((entry) => (
            <div key={entry.name} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-lg font-medium">{entry.name}</span>
              <span className="text-lg font-medium ml-auto">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
