import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { item: "Gross Pay", value: 200000 },
  { item: "Tax", value: 300000 },
  { item: "Bonuses", value: 300000 },
  { item: "Deductions", value: 250000 },
  { item: "Net Pay", value: 300000 },
  { item: "Benefits", value: 250000 },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>{`${
          payload[0].payload.item
        }: ₦${payload[0].value.toLocaleString()} `}</p>
      </div>
    );
  }

  return null;
};

const PayrollSummaryChart: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart barSize={30} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="item" fontSize={16.67} />
          <YAxis
            tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
            fontSize={16.67}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            radius={[6, 6, 0, 0]}
            dataKey="value"
            stackId="a"
            fill="#0035C3"
            name="Values"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayrollSummaryChart;
