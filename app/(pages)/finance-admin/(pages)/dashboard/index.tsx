"use client"

import { useRouter } from "next/navigation";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { ChartConfig } from "@/components/ui/chart";
import { BarChartComponent } from "./bar-chart";


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
      title: "Total Revenue",
      description: "₦34,886,000",
    },
    {
      title: "Total Expenses",
      description: "₦34,886,000",
    },
    {
      title: "Net Profit",
      description: "₦34,886,000",
    },
    {
      title: "Net Loss",
      description: "₦34,886,000",
    },
  ];




  const chartData = [
    { date: "2023-01-15", desktop: 150, mobile: 95 },
    { date: "2023-02-20", desktop: 220, mobile: 180 },
    { date: "2023-03-10", desktop: 300, mobile: 210 },
    { date: "2023-04-05", desktop: 175, mobile: 160 },
    { date: "2023-05-25", desktop: 260, mobile: 145 },
    { date: "2023-06-30", desktop: 190, mobile: 170 },
    { date: "2023-07-12", desktop: 205, mobile: 155 },
    { date: "2023-08-18", desktop: 230, mobile: 190 },
    { date: "2023-09-22", desktop: 280, mobile: 200 },
  ]


  return (
    <div className="space-y-8">
      <PageHeader
        title="Finance Management"
        description="Manage finance and organization"
        buttonLabel="Run Financial Reports"
        actionButtonLabel="Actions"
        to="/finance-admin/new"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pageCards.map((card, index) => (
          <div className="common-card space-y-5" key={index}>
            <h3>{card.title}</h3>
            <p className="text-xl font-bold">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="common-card space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black">Financial Summary</h3>
          <div className="flex items-center gap-4 text-[10px]">
            <button className="border border-gray-400 rounded-md p-1 bg-gray-300">1W</button>
            <button className="border border-gray-400 rounded-md p-1">3M</button>
            <button className="border border-gray-400 rounded-md p-1">6M</button>
            <button className="border border-gray-400 rounded-md p-1">1Y</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-[220px] xl:h-[280px] max:w-[862px] lg:w-[862px] w-[300px]">
            <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Profit</p>
            <p className="text-xl font-bold">$34,886</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const PageHeader = ({ title, description, buttonLabel, to }: {
  title: string,
  description: string,
  actionButtonLabel: string,
  buttonLabel: string,
  to: string
}) => {
  const router = useRouter();
  const handleClick = () => router.push(to)

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-black font-roboto">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex items-center gap-4">
        <AppDropdownMenu
          width="w-[230px]"
          menuItems={
            <div className="text-sm">
              <button className="p-2 hover:bg-gray-100 rounded-lg w-full text-left">Manage Budgets</button>
              <button className="p-2 hover:bg-gray-100 rounded-lg w-full text-left">View Transactions</button>
              <button className="p-2 hover:bg-gray-100 rounded-lg w-full text-left">Update Financial Settings</button>
            </div>
          }

          trigger={
            <div className="flex items-center gap-2 btn-secondary rounded-md px-4 py-2 cursor-pointer">
              <p>Actions</p>
              <IoIosArrowDown />
            </div>
          }
        />

        <AppButton onClick={handleClick} label={buttonLabel} className="btn-primary w-full hidden md:block" />
      </div>
    </div>
  )
}

export default FinanceAdminDashboard;
