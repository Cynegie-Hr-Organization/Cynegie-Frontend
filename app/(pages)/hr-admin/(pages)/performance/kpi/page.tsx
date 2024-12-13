'use client'

import { PageHeader } from "@/app/_components/hr-admin/performance/page-header";
import AppMenubar from "@/app/_components/shared/menubar";
import { ChartConfig } from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GradientLineChart } from "./chart";
import { AppBarChart } from "./barchart";

interface GradientChart {
  completed: number;
  inProgress?: number;
  month?: string;
}

interface CardContent {
  title: string;
  value: string;
  percentage: string;
}

const piechartConfig = {
  total: {
    label: "Total",
    color: "linear-gradient(90deg, #0035C380 0%, #0035C300 100%)",
  },
  completion: {
    label: "80% Completion",
    color: "#0F973D",
  },
  inProgress: {
    label: "20% In Progress",
    color: "#E6EBF9",
  },
} satisfies ChartConfig;

const cardContents: CardContent[] = [
  { title: "Average Performance Rating", value: "4.2/5", percentage: "+0.3%" },
  { title: " Goal Achievement Rate", value: "78%", percentage: "+0.3%" },
  { title: "Employee Engagement Score", value: "72%", percentage: "+0.3%" },
  { title: "Training Completion Rate", value: "85%", percentage: "+0.3%" },
];

const getRandomNumber = (number: number): number => {
  return Math.floor(Math.random() * number);
}

const gradientChartData: GradientChart[] = [
  { month: "Jan", completed: 150, inProgress: getRandomNumber(150) },
  { month: "Feb", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Mar", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Apr", completed: 135, inProgress: getRandomNumber(150) },
  { month: "May", completed: 209, inProgress: getRandomNumber(150) },
  { month: "Jun", completed: 214, inProgress: getRandomNumber(150) },
  { month: "Jul", completed: 300, inProgress: getRandomNumber(150) },
  { month: "Aug", completed: 350, inProgress: getRandomNumber(150) },
  { month: "Sep", completed: 250, inProgress: getRandomNumber(150) },
  { month: "Oct", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Nov", completed: 200, inProgress: getRandomNumber(150) },
  { month: "Dec", completed: 200, inProgress: getRandomNumber(150) }
];

const KpiPage = () => {

  const [chartData, setChartData] = useState<GradientChart[]>([]);

  const fetchData = async (): Promise<GradientChart[]> => {
    return gradientChartData.map(data => ({
      ...data,
      completed: getRandomNumber(100),
      inProgress: getRandomNumber(150),
    }));
  };

  useEffect(() => {
    const loadChartData = async () => {
      const data = await fetchData();
      setChartData(data);
    };

    loadChartData();
  }, []);


  return (
    <div className="space-y-6 mb-12">
      <PageHeader
        title="KPI Dashboard"
        description="Manage employee and organization KPI"
        buttonLabel="View Detailed Report"
        to="/hr-admin/performance/kpi/details"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {cardContents.map((card, index) => (
          <KpiCard key={index} title={card.title} value={card.value} percentage={card.percentage} />
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-x-2">Performance Rating Trends
          <span className="text-gray-500"><IoIosArrowDown /></span>
        </h3>

        <div className="common-card flex flex-col gap-y-4">
          <AppMenubar
            overrideClassName='border-none'
            menuItems={
              <ul className='flex flex-col items-start w-full'>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button className=''>Today</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 7 Days</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 30 Days</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 6 Months</button>
                </li>
              </ul>
            } >
            <p className="text-gray-400 font-bold flex gap-2 items-center rounded-lg px-4 py-2 border">Today <span><IoIosArrowDown /></span></p>
          </AppMenubar>

          <GradientLineChart chartConfig={piechartConfig} chartData={chartData} />
        </div>

        <div className="common-card flex flex-col gap-y-4">
          <AppMenubar
            overrideClassName='border-none'
            menuItems={
              <ul className='flex flex-col items-start w-full'>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button className=''>Today</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 7 Days</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 30 Days</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 6 Months</button>
                </li>
              </ul>
            } >
            <p className="text-gray-400 font-bold flex gap-2 items-center rounded-lg px-4 py-2 border">Today <span><IoIosArrowDown /></span></p>
          </AppMenubar>

          <GradientLineChart
            chartConfig={piechartConfig}
            chartData={chartData}
            areas={[
              { dataKey: "inProgress", stroke: "#E6EBF9" },
              { dataKey: "completed", stroke: "#335DCF" },
            ]}
          />
        </div>

        <div className="common-card flex flex-col gap-y-4">
          <AppMenubar
            overrideClassName='border-none'
            menuItems={
              <ul className='flex flex-col items-start w-full'>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button className=''>Today</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 7 Days</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 30 Days</button>
                </li>
                <li className='w-full hover:bg-gray-100 px-4 py-2 rounded-md'>
                  <button >Last 6 Months</button>
                </li>
              </ul>
            } >
            <p className="text-gray-400 font-bold flex gap-2 items-center rounded-lg px-4 py-2 border">Today <span><IoIosArrowDown /></span></p>
          </AppMenubar>
          <div className="max-h-[400px]">
            <AppBarChart />
          </div>
        </div>
      </div>
    </div>
  )
}

interface KpiCardProps {
  title: string;
  value: string;
  percentage: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, percentage }) => {
  return (
    <div className="common-card text-sm space-y-8">
      <h3 className="font-semibold text-gray-500">{title}</h3>
      <div className="flex items-center justify-between gap-x-2">
        <p className="font-bold">{value}</p>
        <p className=" text-green-500">{percentage} <span className="text-gray-500">Last 6 Months</span></p>
      </div>
    </div>
  )
}

export default KpiPage;