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
  { month: "Jan", salary: 2000000, deductions: 800000, benefits: 200000 },
  { month: "Feb", salary: 1800000, deductions: 700000, benefits: 300000 },
  { month: "Mar", salary: 2200000, deductions: 900000, benefits: 300000 },
  { month: "Apr", salary: 1900000, deductions: 750000, benefits: 250000 },
  { month: "May", salary: 2100000, deductions: 850000, benefits: 300000 },
  { month: "Jun", salary: 2000000, deductions: 800000, benefits: 250000 },
  { month: "Jul", salary: 2300000, deductions: 950000, benefits: 320000 },
  { month: "Aug", salary: 2400000, deductions: 1000000, benefits: 300000 },
  { month: "Sep", salary: 1900000, deductions: 780000, benefits: 220000 },
  { month: "Oct", salary: 2000000, deductions: 820000, benefits: 280000 },
  { month: "Nov", salary: 2100000, deductions: 860000, benefits: 340000 },
  { month: "Dec", salary: 2200000, deductions: 880000, benefits: 320000 },
];

const CustomLegend = (props: {
  payload: {
    value: string;
    color: string;
  }[];
}) => {
  const { payload } = props;
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
      {payload.map(
        (
          entry: {
            value: string;
            color: string;
          },
          index: number,
        ) => (
          <div
            key={`item-${index}`}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "14px", color: "#333" }}>
              {entry.value}
            </span>
          </div>
        ),
      )}
    </div>
  );
};

const toolTipItemLabelStyle = {
  color: "#70707A",
  fontSize: "11px",
  fontWeight: 500,
};
const toolTipItemContentStyle = {
  color: "#101928",
  fontSize: "12px",
  fontWeight: 500,
};

const CustomTooltip = <
  T extends {
    salary: number;
    deductions: number;
    benefits: number;
    value: number;
  },
>({
  active,
  payload,
}: {
  active?: boolean;
  payload?: T[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #ccc",
          padding: "6px",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            backgroundColor: "#F9FAFB",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          {["Gross Salary", "Deductions", "Benefits"].map((item, index) => (
            <p key={index}>
              <span style={toolTipItemLabelStyle}>{`${item}: `}</span>
              <span
                style={toolTipItemContentStyle}
              >{`₦${payload[index].value.toLocaleString()}`}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const PayrollOverviewChartLarge: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Legend */}
      <CustomLegend
        payload={[
          { value: "Gross Salary", color: "#335DCF" },
          { value: "Deductions", color: "#8AA2E3" },
          { value: "Benefits", color: "#E4E7EC" },
        ]}
      />
      <ResponsiveContainer width="100%" height={250}>
        <BarChart barSize={30} data={data} margin={{ left: 15 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis
            tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
            fontSize={12}
            label={{
              value: "Total Payroll Cost (₦)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#333", fontSize: "14px" },
              dx: -10,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            radius={[0, 0, 20, 20]}
            dataKey="salary"
            stackId="a"
            fill="#335DCF"
            name="Gross Salary"
          />
          <Bar
            dataKey="deductions"
            stackId="a"
            fill="#8AA2E3"
            name="Deductions"
          />
          <Bar
            radius={[10, 10, 0, 0]}
            dataKey="benefits"
            stackId="a"
            fill="#E4E7EC"
            name="Benefits"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayrollOverviewChartLarge;
