"use client";

import React, { useEffect, useState } from "react";
import CardLayout from "@/app/_components/shared/cards";
import { AppRadialChart } from "../radial-chart";
import { Avatar } from "@mui/material";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import GoalDetailTable from "../table";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useParams } from "next/navigation";
import { fetchGoalById } from "@/app/api/services/performance/goals";
import { Goal } from "@/types";

type GoalHeaderDetailProps = {
  label: string;
  value: string;
};

type BreadcrumbProps = {
  goalName: string;
};

const users = ["u", "p", "d", "e", "o"];

const GoalDetailPage = () => {
  const [goalData, setGoalData] = useState<Goal | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { id } = useParams();

  const goalId = typeof id === "string" ? id : "";

  useEffect(() => {
    // Fetch goal data on component mount
    const fetchData = async () => {
      const response = await fetchGoalById(goalId);
      setGoalData(response.data);
    };

    fetchData();
    setIsClient(true);
  }, [goalId]);

  if (!goalData) return <p>Loading...</p>;

  return (
    <div className="space-y-8 py-12">
      <PerformanceReviewCard goalData={goalData} isClient={isClient} />
      <GoalDetailTable
        keyResults={goalData.keyResults}
        milestones={goalData.milestones}
        goaldata={goalData}
      />
    </div>
  );
};

const PerformanceReviewCard = ({
  goalData,
  isClient,
}: {
  goalData: Goal;
  isClient: boolean;
}) => {
  const colors = {
    grey: "#E6EBF9",
    yellow: "#FFAD33",
    green: "#0F973D",
    blue: "#335DCF",
  };

  return (
    <div className="space-y-4">
      <Breadcrumb goalName={goalData.goalName} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <CardLayout className="flex flex-col lg:flex-row justify-between gap-y-10 col-span-1 lg:col-span-9">
          <div className="flex flex-col gap-y-4 space-y-8 flex-grow">
            <div className="flex flex-col gap-y-2 max-w-[474px]">
              <h3 className="text-sm font-semibold">{goalData.goalName}</h3>
              <p className="text-xs text-gray-700">{goalData.description}</p>
            </div>

            <div className="flex items-center justify-between gap-x-8 text-lg max-w-[474px]">
              <GoalHeaderDetail label="Type" value={goalData.goalType} />
              <GoalHeaderDetail
                label="Due Date"
                value={new Date(goalData.dueDate).toLocaleDateString()}
              />
              <GoalHeaderDetail label="Priority" value={goalData.priority} />
            </div>

            <div className="space-y-3">
              <div className="flex">
                {users.map((userId: string, index: number) => (
                  <Avatar
                    key={index}
                    src={`/image/persons/${userId}.png`}
                    alt={`${userId}`}
                    className="first:ml-0 -ml-4 w-8 h-8"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700">Shared With</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-y-8 h-full">
            <div className="flex flex-col gap-8 lg:items-center">
              <div className="lg:block flex justify-center items-center">
                <div className="h-48 w-48">
                  {isClient && <AppRadialChart />} {/* Add data to the chart */}
                </div>
              </div>

              <p className="text-sm font-semibold text-gray-700 flex items-center gap-x-2">
                <span className="bg-blue-100 rounded-full">
                  <GoDotFill style={{ color: colors.blue }} />
                </span>
                {goalData.status.replace("_", " ")}
              </p>
            </div>
          </div>
        </CardLayout>

        <CardLayout className="flex flex-col gap-y-4 col-span-1 lg:col-span-3">
          <h3 className="text-sm font-semibold">Alignment</h3>
          <div className="flex flex-col gap-y-6 h-full justify-between">
            <div>
              <h3 className="text-sm font-semibold">Aligns To</h3>
              <p className="text-sm text-gray-700">{goalData.alignment}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Supported By</h3>
              <div className="text-sm text-gray-700 flex items-center gap-x-2">
                <HiOutlineUserGroup />
                <div>
                  <p>{goalData.company}</p>
                  <p>Communicating the changes!</p>
                </div>
              </div>
            </div>
          </div>
        </CardLayout>
      </div>
    </div>
  );
};

const Breadcrumb = ({ goalName }: BreadcrumbProps) => {
  return (
    <h3 className="text-sm font-bold flex items-center gap-x-2">
      Goals
      <span className="text-primary flex items-center gap-x-2">
        <IoIosArrowForward /> {goalName}
      </span>
    </h3>
  );
};

const GoalHeaderDetail = ({ label, value }: GoalHeaderDetailProps) => {
  return (
    <div className="flex flex-row gap-x-2 items-center text-sm">
      <p className="text-black font-semibold">{label}:</p>
      <span className="text-gray-700">{value}</span>
    </div>
  );
};

export default GoalDetailPage;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import CardLayout from "@/app/_components/shared/cards";
// import { AppRadialChart } from "../radial-chart";
// import { Avatar } from "@mui/material";
// import { GoDotFill } from 'react-icons/go';
// import { IoIosArrowForward } from 'react-icons/io';
// import GoalDetailTable from '../table';
// import { HiOutlineUserGroup } from 'react-icons/hi';

// // interface IPieChartData {
// //   task: string;
// //   value: number;
// //   fill: string;
// // }

// const GoalDetailPage = () => {
//   return (
//     <div className="space-y-8 py-12">
//       <PerformanceReviewCard />
//       <GoalDetailTable />
//     </div>
//   );
// }

// const PerformanceReviewCard = () => {

//   const colors = { grey: '#E6EBF9', yellow: '#FFAD33', green: '#0F973D', blue: '#335DCF' };

//   // const piechartData: IPieChartData[] = [
//   //   { task: "completed", value: 45, fill: colors.green },
//   //   { task: "active", value: 30, fill: colors.blue },
//   //   { task: "closed", value: 25, fill: colors.yellow },
//   // ]

//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return (

//     <div className="space-y-4">
//       <Breadcrumb />

//       <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
//         <CardLayout className="flex flex-col lg:flex-row justify-between gap-y-10 col-span-1 lg:col-span-9">
//           <div className="flex flex-col gap-y-4 space-y-8 flex-grow">
//             <div className="flex gap-x-8 gap-y-2 text-lg flex-wrap max-w-[474px]">
//               <h3 className="text-sm font-semibold">Increase employee satisfaction</h3>
//               <p className="text-xs text-gray-700">Implement strategies to increase overall employee satisfaction by 20% by the end of the year</p>
//             </div>

//             <div className="flex gap-x-8 gap-y-2 text-lg flex-wrap max-w-[474px]">
//               <GoalHeaderDetail label="Department" value="Human Resources" />
//               <GoalHeaderDetail label="Due Date:" value="12 Dec 2024" />
//               <GoalHeaderDetail label="Priority" value="High" />
//             </div>

//             <div className="space-y-3 ">
//               <div className="flex">
//                 {['/image/persons/person-1.png',
//                   '/image/persons/person-2.png',
//                   '/image/persons/person-3.png',
//                   '/image/persons/person-1.png'
//                 ].map((src, index) => (
//                   <Avatar key={index} src={src} alt="person" className="first:ml-0 -ml-4 w-2 h-2" />
//                 ))}
//               </div>

//               <p className="text-sm text-gray-700">Shared With</p>
//             </div>
//           </div>

//           <div className="flex flex-col justify-center gap-y-8 h-full">
//             <div className="flex flex-col gap-8 lg:items-center">
//               <div className='lg:block flex justify-center items-center'>
//                 <div className="h-48 w-48">
//                   {isClient && <AppRadialChart />}
//                 </div>
//               </div>

//               <p className="text-sm font-semibold text-gray-700 flex items-center gap-x-2">
//                 <span className="bg-blue-100 rounded-full"><GoDotFill style={{ color: colors.blue }} /></span>
//                 On track
//               </p>
//             </div>
//           </div>
//         </CardLayout>

//         <CardLayout className="flex flex-col gap-y-4 col-span-1 lg:col-span-3">
//           <h3 className="text-sm font-semibold">Alignment</h3>
//           <div className='flex flex-col gap-y-6 h-full justify-between'>
//             <div>
//               <h3 className="text-sm font-semibold">Aligns To</h3>
//               <p className="text-sm text-gray-700">Company Goal: Improve  overall emloyee engagement</p>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold">Supported By</h3>
//               <div className="text-sm text-gray-700 flex items-center gap-x-2">
//                 <HiOutlineUserGroup />
//                 <div>
//                   <p>Marketing</p>
//                   <p>Communicating the changes!</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardLayout>
//       </div>
//     </div>
//   );
// };

// const Breadcrumb = () => {
//   return (
//     <h3 className="text-sm font-bold flex items-center gap-x-2">
//       Goals
//       <span className="text-primary flex items-center gap-x-2">
//         <IoIosArrowForward />Increase Employee Satisfaction
//       </span>
//     </h3>
//   )
// }

// const GoalHeaderDetail = ({ label, value }: { label: string, value: string }) => {
//   return (
//     <div className="flex gap-x-2 items-center text-sm">
//       <p className="text-black font-semibold">{label}:</p>
//       <p className="text-gray-700">{value}</p>
//     </div>
//   )
// }

// export default GoalDetailPage;
