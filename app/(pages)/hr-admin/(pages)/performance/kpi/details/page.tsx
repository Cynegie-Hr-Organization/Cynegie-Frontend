"use client"

import { GradientLineChart } from "@/app/_components/hr-admin/pages/dashboard/chart";
import AppButton from "@/app/_components/shared/button";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { AppBarChart } from "../barchart";
import { PieChart2 } from "./piechart2";
import { GoDotFill } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { DrawerDialog } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import { AppSelect } from "@/app/_components/shared/select";




const KpiDetailsPage = () => {
  const router = useRouter()
  const handleClick = () => router.push("/hr-admin/performance/kpi")

  return (
    <div className="space-y-6 mb-12">
      <button className="flex items-center gap-2" onClick={handleClick}>
        <IoIosArrowBack className="text-xl" />
        <h2 className="text-gray-500 text-base">Back to KPI</h2>
      </button>

      <PageHeader
        title="KPI Details"
        buttonLabel="Export Data"
      />

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-8 space-y-2">
            <div className="common-card space-y-6">
              <div className="space-y-2">
                <p className="text-lg font-semibold">Training Completion Rate</p>
                <p className="text-sm text-gray-500">Measures the percentage of employee who have completed their assigned training program</p>
              </div>
              <p className="flex items-center gap-6">Current value <span className="font-bold text-primary">78%</span></p>
            </div>


            <div className="common-card flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Training Completion Rate</p>
                <AppSelect
                  width="w-[144.34px]"
                  placeholder="Today"
                  listItems={[
                    { label: "Today", value: "today" },
                    { label: "Last 7 Days", value: "last-7-days" },
                    { label: "Last 30 Days", value: "last-30-days" },
                    { label: "Last 6 Months", value: "last-6-months" },
                  ]}
                  onChange={() => { }}
                />
              </div>
              <div className="max-h-[323.27px] w-full">
                <GradientLineChart />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-y-10 justify-between">
            <p className="text-lg font-semibold">Current Performance Vs Target</p>

            <div className="common-card flex flex-col gap-y-4 h-full">
              <PieChart2 />

              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <GoDotFill className=" text-primary" />
                    <p className="">Current Value</p>
                  </div>
                  <p className="">78%</p>
                </div>


                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <GoDotFill className=" text-[#FF9900]" />
                    <p className="">Target Value</p>
                  </div>
                  <p className="">85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold">Comparison With Target/Benchmark</p>

          <div className="common-card flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
              <AppSelect
                width="w-[144.34px]"
                placeholder="Today"
                listItems={[
                  { label: "Today", value: "today" },
                  { label: "Last 7 Days", value: "last-7-days" },
                  { label: "Last 30 Days", value: "last-30-days" },
                  { label: "Last 6 Months", value: "last-6-months" },
                ]}
                onChange={() => { }}
              />
            </div>
            <AppBarChart />
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
      <DownloadModal trigger={<AppButton label={buttonLabel} className="btn-primary w-full" />} />
    </div>
  )
}

const DownloadModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={<DialogTitle className="text-lg font-bold text-center">Download Report</DialogTitle>}
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton label="Cancel" className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full order-2" />
          <AppButton label="Download" className="bg-primary text-white md:w-[150px] w-full border border-primary order-1" leftIcon={<LuDownload />} />
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500 text-center">Select the format you would like to download your report</p>
        <div className="flex items-center justify-center gap-x-2">
          <input type="radio" id="pdf" name="format" value="pdf" />
          <label htmlFor="pdf">PDF</label>
          <input type="radio" id="excel" name="format" value="excel" />
          <label htmlFor="excel">Excel</label>
        </div>
      </div>
    </DrawerDialog>
  )
}

export default KpiDetailsPage;