'use client'
import { Avatar, Stack, TextField } from "@mui/material"
import OverViewSection from "./overview-section";
import { ReactNode, Suspense } from "react";
import { RiSearchLine } from "react-icons/ri";
import { GoDotFill, GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuClock } from "react-icons/lu";


const OnBoardingPage = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Stack className="" gap={3}>
        <OverViewSection />
      </Stack>

      <div className="my-12">
        <div className="flex gap-4 text-sm mb-4 pl-4">
          <button className="p-4 text-primary border-b border-primary"> Task List </button>
          <button>New Hire List</button>
        </div>
        <CardLayout>
          <div className="w-full flex items-center justify-between flex-grow mb-4">
            <TextField className="max-w-[476px]"
              sx={{
                width: { xs: '90%', sm: '70%', md: '70%' },
                mb: { xs: '15px', md: '0px' },
              }}
              InputProps={{
                sx: {
                  height: '35px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 400,
                },
                startAdornment: (
                  <RiSearchLine className="mr-2 text-2xl" />
                ),
              }}
              placeholder='Search here...'
            />

            {/* <button className="rounded-lg flex h-max border border-gray-300 bg-transparent">
            <LuListFilter />  Filter
            </button> */}
          </div>
          <div className="grid grid-cols-4 gap-8 p-1 mb-6">
            <div>
              <Taskhead title="to do" count="03" />

              <TaskItem taskTitle="implement" />
              <TaskItem taskTitle="design review" />
            </div>
            <div>
              <Taskhead title="in progress" titleColor="text-blue-500" count="02" />

              <TaskItem taskTitle="UI adjustments" />
              <TaskItem taskTitle="UI adjustments" />
            </div>
            <div>
              <Taskhead title="in review" titleColor="text-amber-500" count="10" />

              <TaskItem taskTitle="UI adjustments" />
              <TaskItem taskTitle="UI adjustments" />
            </div>
            <div>
              <Taskhead title="completed" titleColor="text-green-500" count="10" />

              <TaskItem taskTitle="UI adjustments" />
              {/* <TaskItem taskTitle="UI adjustments" /> */}
            </div>
          </div>
        </CardLayout>
      </div>
    </Suspense >
  )
}

const Taskhead = ({ title, titleColor, count }: { title: string, titleColor?: string, count: string }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className={`capitalize font-bold text-sm ${titleColor}`}>{title} <span className="font-normal text-gray-500">({count})</span></h3>
      <div className="flex gap-x-2 text-gray-400">
        <GoPlus />
        <HiOutlineDotsHorizontal />
      </div>
    </div>
  )
}

const TaskItem = ({ taskTitle }: { taskTitle: string }) => {
  return (
    <div className="text-xs mt-11 space-y-[14.67px]">
      <div className="space-y-2">
        <p className="capitalize text-sm font-semibold">{taskTitle}</p>

        <p className="flex items-center text-[11px] text-primary font-medium">
          <GoDotFill /> <span>Design</span>
        </p>
      </div>
      <p className="text-[#64748B]">It’s just needs to adapt the UI from what you did before</p>
      <hr className="border-t w-full" />

      <div className="flex items-center justify-between">
        <div className="w-max h-max flex items-center gap-x-2 p-[7.33px] rounded-lg bg-[#FDF2F8] text-[#ED4F9D] font-medium">
          <LuClock />
          <span className="">3 days left</span>
        </div>
        <div className='flex'>
          {[
            '/image/persons/person-1.png',
            '/image/persons/person-2.png',
          ].map((imageSrc, index) => (
            <Avatar
              key={index}
              src={imageSrc}
              className="h-6 w-6 first:ml-auto -ml-4"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const CardLayout = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`bg-white border border-1 border-gray-200 p-4 ${className}`}>
      {children}
    </div>
  )
}

export default OnBoardingPage;