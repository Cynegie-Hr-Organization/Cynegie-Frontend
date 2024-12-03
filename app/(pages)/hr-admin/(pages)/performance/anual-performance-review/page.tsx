'use client';

import React, { useEffect, useState } from 'react';
import CardLayout from "@/app/_components/shared/cards";
import { AppPieChart } from "@/app/_components/shared/piechart";
import { ChartConfig } from "@/components/ui/chart";
import { Avatar } from "@mui/material";
import { GoDotFill } from 'react-icons/go';
import { LuListFilter } from 'react-icons/lu';
import { RiSearchLine } from 'react-icons/ri';
import AppMenubar from '@/app/_components/shared/menubar';
import { LuMoreVertical } from 'react-icons/lu';
import { Checkbox } from '@/components/ui/checkbox';

interface IPieChartData {
  task: string;
  value: any;
  fill: string;
}


const piechartConfig = {
  total: {
    label: "Total",
    color: "linear-gradient(90deg, #0035C380 0%, #0035C300 100%)",
  },
  completed: {
    label: "Completed",
    color: "#0F973D",
  },
  due: {
    label: "Due",
    color: "#FFAD33",
  },
  inProgress: {
    label: "In Progress",
    color: "#335DCF",
  },
  notStarted: {
    label: "Not Started",
    color: "#E6EBF9",
  },
} satisfies ChartConfig;


const AnualPerformanceReview = () => {
  return (
    <div className="space-y-8">
      <PerformanceReviewCard />
      <EmployeesTable />
    </div>
  );
}





const PerformanceReviewCard = () => {

  const colors = { grey: '#E6EBF9', yellow: '#FFAD33', green: '#0F973D', blue: '#335DCF' };

  const piechartData: IPieChartData[] = [
    { task: "completed", value: 45, fill: colors.green },
    { task: "active", value: 30, fill: colors.blue },
    { task: "closed", value: 25, fill: colors.yellow },
  ]

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <CardLayout className="flex flex-col lg:flex-row justify-between gap-y-10">

      <div className="flex flex-col gap-y-4 space-y-8 flex-grow">
        <h3 className="font-semibold text-lg">Anual Performance Review 2024</h3>

        <div className="flex gap-x-8 gap-y-4 text-xs flex-wrap">
          <div className="text-sm">
            <p className="font-semibold">Cycle Start Date </p>
            <p> 1 January 2024  </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Cycle End Date</p>
            <p>25 December 2024 </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Review Period</p>
            <p>1 Year</p>
          </div>
        </div>

        <div className="space-y-3 ">
          <div className="flex">
            {['/image/persons/person-1.png',
              '/image/persons/person-2.png',
              '/image/persons/person-3.png',
              '/image/persons/person-1.png',
              '/image/persons/person-2.png',
              '/image/persons/person-3.png',
              '/image/persons/person-1.png',
              '/image/persons/person-2.png',
              '/image/persons/person-3.png',
            ].map((src, index) => (
              <Avatar key={index} src={src} alt="person" className="first:ml-0 -ml-4 w-2 h-2" />
            ))}
          </div>

          <p className="text-sm text-gray-700">100 Employees</p>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-y-8 h-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className='lg:block flex justify-center items-center'>
            <div className="h-48 w-48 bg-gray-100 rounded-full">
              {isClient && <AppPieChart chartData={piechartData} chartConfig={piechartConfig} innerRadius={60} />}
            </div>
          </div>

          <div className="flex flex-col gap-y-2 font-semibold">
            <p className="text-sm text-gray-700 flex items-center gap-x-2"><GoDotFill style={{ color: colors.green }} />20 Completed Reviews</p>
            <p className="text-sm text-gray-700 flex items-center gap-x-2"><GoDotFill style={{ color: colors.blue }} />50 Active Reviews</p>
            <p className="text-sm text-gray-700 flex items-center gap-x-2"><GoDotFill style={{ color: colors.yellow }} />5 Closed Review</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-1 font-semibold">
          <p className="text-sm text-gray-700">Overall Progress</p>

          <div className='h-4 w-full bg-gray-200 rounded-full overflow-hidden'>
            <span className='bg-primary h-full block transition-all duration-300' style={{ width: '50%' }}></span>
          </div>
          <p className='text-sm text-gray-700 text-right uppercase'>50% complete</p>
        </div>
      </div>
    </CardLayout>
  );
};

const EmployeesTable = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-black">Employees </h3>

      <div className="common-card overflow-x-scroll">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
          <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
            <RiSearchLine className="text-gray-400" />
            <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
          </div>

          <button type="button" className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
            <LuListFilter /> Filter
          </button>
        </div>

        <div className='-mx-5 mt-4'>
          <table className='w-full border-collapse'>
            <thead className='bg-[#F7F9FC]'>
              <tr>
                <th className='px-6 py-3 text-left'>
                  <Checkbox className={"rounded-md border-gray-300"} />
                </th>
                <th className='px-4 py-3 text-left'>Employee Name</th>
                <th className='px-4 py-3 text-left'>Reviewer</th>
                <th className='px-4 py-3 text-left'>Goals</th>
                <th className='px-4 py-3 text-left'>KPI</th>
                <th className='px-4 py-3 text-left'>Status</th>
                <th className='px-4 py-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(5)).map((_, idx) => {
                return (
                  <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                    <td className='px-6 py-4'>
                      <Checkbox className={"rounded-md border-gray-300"} />
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm'>Okeke Adaeze</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm'>John Edward</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm'>Increase sales  +2</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm truncate'>Achieve 10% growth in Q1 sales  +2</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap'>In Progress</p>
                    </td>
                    <td className='p-4'>
                      <AppMenubar menuItems={
                        <ul className="flex flex-col w-full text-base">
                          <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md w-full">
                            <button type="button">Edit</button>
                          </li>
                          <li className="hover:text-red-600 cursor-pointer text-red-500 hover:bg-gray-100 px-2 py-1 rounded-md w-full">
                            <button type="button">Delete</button>
                          </li>
                        </ul>
                      }>
                        <LuMoreVertical />
                      </AppMenubar>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnualPerformanceReview;
