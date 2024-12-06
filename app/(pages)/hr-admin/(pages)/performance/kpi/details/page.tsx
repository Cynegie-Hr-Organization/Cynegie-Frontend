"use client"

import { GradientLineChart } from "@/app/_components/hr-admin/pages/dashboard/chart";
import AppMenubar from "@/app/_components/shared/menubar";
import AppButton from "@/app/_components/shared/button";
import { Box } from "@mui/material";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";




const KpiDetailsPage = () => {
  const router = useRouter()
  const handleClick = () => router.push("/hr-admin/performance/kpi")

  return (
    <div className="space-y-6 mb-12">
      <button className="flex items-center gap-2" onClick={handleClick}>
        <IoIosArrowBack className="text-xl" />
        <h2 className="text-gray-500">Back to KPI</h2>
      </button>

      <PageHeader
        title="KPI Details"
        buttonLabel="Export Data"
      />

      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-8 space-y-2">
            <div className="common-card">
              <p className="text-lg font-semibold">Training Completion Rate</p>
              <p className="text-sm text-gray-500">Last 7 Days</p>
            </div>

            <div className="common-card flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Training Completion Rate</p>
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
                  <p className="text-gray-400 font-bold flex gap-2 items-center rounded-lg px-4 py-2 border">
                    Today
                    <span><IoIosArrowDown /></span>
                  </p>
                </AppMenubar>
              </div>
              <GradientLineChart />
            </div>
          </div>

          <div className="common-card flex items-center gap-2 col-span-4">
            <p className="text-lg font-semibold">Training Completion Rate</p>
            <p className="text-sm text-gray-500">Last 7 Days</p>
          </div>
        </div>
      </div>
    </div >
  )
}


const PageHeader = ({ title, buttonLabel }: {
  title: string, buttonLabel: string
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-black">{title}</h3>
      <AppButton label={buttonLabel} className="btn-primary w-full" />
    </div>
  )
}

export default KpiDetailsPage;