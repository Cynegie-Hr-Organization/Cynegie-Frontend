import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", uv: 4000, amt: 2400 },
  { name: "Feb", uv: 3000, amt: 2210 },
  { name: "Mar", uv: 2000, amt: 2290 },
  { name: "Apr", uv: 2780, amt: 2000 },
  { name: "May", uv: 1890, amt: 2181 },
  { name: "Jun", uv: 2390, amt: 2500 },
  { name: "Jul", uv: 3490, amt: 2100 },
];

const PayrollOverviewChartMobile = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradientUv" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EFF5FE" stopOpacity={1} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
          </linearGradient>
        </defs>

        <Tooltip />

        <Area
          type="linear"
          dataKey="uv"
          strokeWidth={2}
          stroke="#0035C3"
          fill="url(#gradientUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PayrollOverviewChartMobile;
