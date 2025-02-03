"use client"

import AppButton from "@/app/_components/shared/button";
import { AppSelect } from "@/app/_components/shared/select";
import { ChartConfig } from "@/components/ui/chart";
import { useRouter } from "next/navigation";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { TiMediaStop } from "react-icons/ti";
import { BarChartComponent } from "./bar-chart";
import FinanceAdminDashboardTable from "./table";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#E8E8E8",
  },
  mobile: {
    label: "Mobile",
    color: "#0035C3",
  },
} satisfies ChartConfig



const FinanceAdminDashboard = () => {
  const pageCards = [
    {
      icon: <FaMoneyBillWave />,
      color: "#F9FAFB",
      textColor: "#344054",
      title: "Total Transactions Proccessed",
      description: "₦34,886,000",
    },
    {
      icon: <TiMediaStop />,
      color: "#FFF5E6",
      textColor: "#FFAD33",
      title: "Pending Payroll Approvals",
      description: "3",
    },
    {
      icon: <HiUserGroup />,
      color: "#E7F6EC",
      textColor: "#0F973D",
      title: "Active Vendors",
      description: "27",
    },
    {
      icon: <FaMoneyBillWave />,
      color: "#E6EBF9",
      textColor: "#0035C3",
      title: "Budget Utilization",
      description: "80%",
    },
  ];




  const chartData = [
    { month: "January", desktop: 150, mobile: 95 },
    { month: "February", desktop: 220, mobile: 180 },
    { month: "March", desktop: 300, mobile: 210 },
    { month: "April", desktop: 175, mobile: 160 },
    { month: "May", desktop: 260, mobile: 145 },
    { month: "June", desktop: 190, mobile: 170 },
    { month: "July", desktop: 205, mobile: 155 },
    { month: "August", desktop: 230, mobile: 190 },
    { month: "September", desktop: 280, mobile: 200 },
    { month: "October", desktop: 230, mobile: 190 },
    { month: "November", desktop: 280, mobile: 200 },
    { month: "December", desktop: 230, mobile: 190 },
  ]


  return (
    <div className="space-y-8 py-6">
      <PageHeader
        title="Finance Management"
        description="Manage finance and organization"
        button1Label="Manage Account"
        button2Label="Payroll Approvals"
        link1="/finance-admin/budgets"
        link2="/finance-admin/payroll-management"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pageCards.map((card, index) => (
          <div className="common-card space-y-5" key={index}>
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2" style={{ backgroundColor: card.color, color: card.textColor }}>{card.icon}</div>
              <h3 className="font-roboto lg:text-xs text-sm text-[#848897] font-medium">{card.title}</h3>
            </div>
            <p className="font-roboto text-xl font-bold">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="common-card space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 md:gap-y-0">
          <h3 className="font-semibold text-lg font-roboto">Overall Budget Utilization </h3>
          <ChartDropdownFilters />
        </div>

        <div className="h-[220px] xl:h-[280px] w-full">
          <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
        </div>
      </div>



      <div className="space-y-4">
        <h3 className="text-xl font-bold text-black font-roboto">Recent Transactions</h3>
        <FinanceAdminDashboardTable />
      </div>
    </div>
  );
};



const PageHeader = ({ title, description, button1Label, button2Label, link1, link2 }: {
  title: string,
  description: string,
  button1Label: string,
  button2Label: string,
  link1: string,
  link2: string
}) => {
  const router = useRouter();
  const handleBtn1Click = () => router.push(link1)
  const handleBtn2Click = () => router.push(link2)
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-black font-roboto">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex items-center gap-4">
        <AppButton onClick={handleBtn1Click} label={button1Label} className="btn-secondary w-full hidden md:block" />
        <AppButton onClick={handleBtn2Click} label={button2Label} className="btn-primary w-full hidden md:block" />
      </div>
    </div>
  )
}


const ChartDropdownFilters = () => {
  return (
    <div className="flex items-center gap-2">
      <AppSelect
        placeholder="Department"
        width="w-max"
        listItems={[
          { label: "All", value: "all" },
          { label: "Department 1", value: "department-1" },
          { label: "Department 2", value: "department-2" },
          { label: "Department 3", value: "department-3" },
        ]}
        onChange={() => { }}
      />

      <AppSelect
        placeholder="Time Period"
        listItems={[
          { label: "This Month", value: "this-month" },
          { label: "Last Month", value: "last-month" },
          { label: "This Year", value: "this-year" },
          { label: "Last Year", value: "last-year" },
        ]}
        onChange={() => { }}
      />
    </div>
  )
}

export default FinanceAdminDashboard;
