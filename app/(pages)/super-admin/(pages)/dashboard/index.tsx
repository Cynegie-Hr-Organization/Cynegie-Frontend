"use client";

import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppSelect } from "@/app/_components/shared/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { PiChartLineFill, PiDevicesFill } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { GradientLineChart } from "./chart";
import { AppPieChart } from "./piechart";
import SuperAdminOverviewTable from "./table";







const SuperAdminDashboard = () => {
  // const { data, status } = useCashflowTrends();
  // console.log(data, status)


  const getConfigKey = (config: ChartConfigType, label: string): string => {
    const existingKey = Object.keys(config).find(
      (key) => config[key].label.toLowerCase() === label.toLowerCase()
    );

    if (existingKey) return existingKey;

    return label
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  };

  const chartData: ChartDataItem[] = [
    { label: "Salaries", value: 45 },
    { label: "Operational cost", value: 25 },
    { label: "Marketing", value: 15 },
    { label: "Research and Development", value: 10 },
    { label: "Others", value: 5 }
  ];

  const chartConfig: ChartConfigType = {
    salaries: { color: "#E6EBF9", label: "Completed" },
    operationalCost: { color: "#335DCF", label: "Pending" },
    marketing: { color: "#FFAD33", label: "Pending" },
    researchAndDevelopment: { color: "#0F973D", label: "Pending" },
    others: { color: "#F7C164", label: "Pending" },
  };




  const chartData2: ChartDataItem[] = [
    { label: "Full Access", value: 45 },
    { label: "Limited Access", value: 25 },
    { label: "View Only", value: 15 },
  ];
  const chartConfig2: ChartConfigType = {
    fullAccess: { color: "#335DCF", label: "Full Access" },
    limitedAccess: { color: "#FFAD33", label: "Limited Access" },
    viewOnly: { color: "#E6EBF9", label: "View Only" },
  };



  const handleTimeRangeChange = (value: TimeRange) => {
    console.log(`Selected time range: ${value}`);
  };

  const calculatePercentage = (value: number, total: number): number => {
    return Number(((value / total) * 100).toFixed(1));
  };

  const timeRangeOptions = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Year", value: "year" },
  ];






  return (
    <div className="space-y-8 py-6">
      <PageHeader
        title="Overview"
        button1Label="Manage Users"
        button2Label="Approval Requests"
        link1="/super-admin/users/overview"
        link2="/super-admin/approval-management"
      />


      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          <div className="common-card space-y-4 col-span-1 lg:col-span-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-black">Cash flow Trends</h3>
                <AppSelect
                  width="w-max space-x-2"
                  placeholder="This Month"
                  listItems={timeRangeOptions}
                  onChange={(value) => handleTimeRangeChange(value as TimeRange)}
                />
              </div>

              <div className="flex items-center justify-end gap-4">
                <ChartIndicator label="Revenue" color="#0030B1" />
                <ChartIndicator label="Expenses" color="#FF9900" />
              </div>

              <div className="">
                <GradientLineChart />
              </div>
            </div>

          </div>
          <div className="common-card col-span-1 lg:col-span-4">
            <div className="flex flex-col space-y-2">
              <h3 className="text-base font-semibold text-black">Expenditure Breakdown</h3>

              <AppSelect width="w-max space-x-2"
                placeholder="This Month"
                listItems={timeRangeOptions}
                onChange={(value) => handleTimeRangeChange(value as TimeRange)}
              />
            </div>

            <div>
              <AppPieChart chartData={chartData} chartConfig={chartConfig} height="max-h-[130px]" innerRadius={34} />

              {chartData.map((item) => {
                const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
                const percentage = calculatePercentage(item.value, total);
                const configKey = getConfigKey(chartConfig, item.label);

                console.log(configKey)
                const color = chartConfig[configKey]?.color;

                return (
                  <PieChartLabel
                    key={item.label}
                    label={item.label}
                    value={`${percentage}%`}
                    color={color}
                  />
                )
              })}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          <div className="common-card space-y-4 col-span-1 lg:col-span-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-black">Pending Approvals</h3>
                <Link href="/super-admin/approval-management" className="text-sm font-semibold text-primary hover:text-primary hover:no-underline">View all</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PendingApprovalCard
                  title="HR"
                  value="12"
                  icon={<RiGroupLine color="#0035C3" />}
                  iconColor="#E6EBF9"
                />
                <PendingApprovalCard
                  title="Finance"
                  value="8"
                  icon={<PiChartLineFill color="#FF9900" />}
                  iconColor="#FFF5E6"
                />
                <PendingApprovalCard
                  title="IT"
                  value="14"
                  icon={<PiDevicesFill color="#099137" />}
                  iconColor="#E7F6EC"
                />
              </div>

            </div>
          </div>

          <div className="common-card col-span-1 lg:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-black">User Permissions</h3>
              <Link
                href="/super-admin/users/users-permission"
                className="text-sm font-semibold text-primary hover:text-primary hover:no-underline"
              >
                View Details
              </Link>
            </div>

            <AppPieChart totalNameBeforeFigure chartData={chartData2} chartConfig={chartConfig2} totalName="Admins" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {chartData2.map((item) => {
                const total = chartData2.reduce((acc, curr) => acc + curr.value, 0);
                const percentage = calculatePercentage(item.value, total);
                const configKey = getConfigKey(chartConfig2, item.label);
                const color = chartConfig2[configKey]?.color ?? '#E6EBF9';

                return (
                  <AdminPieChartLabel
                    key={item.label}
                    label={item.label}
                    value={`${percentage}%`}
                    color={color}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <SuperAdminOverviewTable />
    </div>
  )
};






const PieChartLabel = ({ label, value, color }: { label: string, value: string, color: string }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <GoDotFill size={24} color={color} />
        <span className="text-xs font-semibold">{label}</span>
      </div>

      <p className="text-xs font-semibold">{value}</p>
    </div>
  )
}

const AdminPieChartLabel = ({ label, value, color }: { label: string, value: string, color: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex relative h-max">
        <div className="w-1 rounded-full mr-2" style={{ backgroundColor: color }}></div>
        <div className="flex-grow font-semibold text-xs text-[#1B1B1B] space-y-2">
          <p className="text-xs font-semibold">{label}</p>
          <p className="text-sm text-[#909090]">{value}</p>
        </div>
      </div>
    </div>
  )
}

const PendingApprovalCard = ({ title, value, icon, iconColor }: {
  title: string,
  value: string,
  icon: React.ReactNode,
  iconColor?: string
}) => {
  return (
    <div className="common-card space-y-4">
      <div className="space-y-2">
        <h3 className="text-base font-bold text-black">{value}</h3>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-full" style={{ backgroundColor: iconColor }}>
            {icon}
          </span>
          <span className="text-xs font-semibold">{title}</span>
        </div>
      </div>
    </div>
  )
}

const PageHeader = ({ title, button1Label, button2Label, link1, link2 }: {
  title: string,
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
      <h3 className="text-lg font-semibold text-black">{title}</h3>



      <div className="hidden md:flex items-center gap-4">
        <AppButton onClick={handleBtn1Click} label={button1Label} className="btn-secondary w-full text-sm" />
        <AppButton onClick={handleBtn2Click} label={button2Label} className="btn-primary w-full text-sm" />
      </div>
      <AppDropdownMenu
        width="w-[190px]"
        trigger={<button
          type="button"
          className="text-gray-500 font-semibold flex gap-2 items-center border rounded-lg px-4 py-2 md:hidden">
          Action <IoIosArrowDown size={24} />
        </button>}
        menuItems={
          <div>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">Approve Request</button>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">System Settings</button>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">View Reports</button>
          </div>
        } />
    </div>
  )
}

const ChartIndicator = ({ label, color }: { label: string, color: string }) => {
  return (
    <div className="flex items-center gap-2">
      <GoDotFill color={color} />
      <p className="text-sm font-semibold text-gray-500">{label}</p>
    </div>
  )
}


export default SuperAdminDashboard





type ChartDataItem = {
  label: string;
  value: number;
};

type ChartConfigType = {
  [key: string]: {
    color: string;
    label: string;
  };
};

type TimeRange = 'today' | 'week' | 'month' | 'year';