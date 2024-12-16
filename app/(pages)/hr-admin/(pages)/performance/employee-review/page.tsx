'use client'

import { IoIosArrowForward } from "react-icons/io"
import AppButton from "../../../../../_components/shared/button"
import CardLayout from "@/app/_components/shared/cards"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { FiDownload } from "react-icons/fi"
import GoalsTable from "./goal-table"
import PerformanceTable from "./performance-table"
import { useTabNavigation } from "@/app/hooks/useTabNavigation"
import { useRouter } from "next/navigation"




type Tab = "performance" | "goal";

const EmployeeReviewPage = () => {
  const router = useRouter();
  const TABS: Tab[] = ["goal", "performance"];

  const {
    activeStep,
    setActiveStep,
    refs,
    containerRef,
    sliderRef,
  } = useTabNavigation<Tab>({
    steps: TABS,
    initialStep: "goal",
  });


  const renderActiveComponent = () => {
    switch (activeStep) {
      case "performance":
        return <PerformanceTable />;
      case "goal":
        return <GoalsTable />;
      default:
        return <GoalsTable />;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <Breadcrumb />
        <AppButton label="Close Review" className="btn-primary !px-4" onClick={() => router.back()} />
      </div>


      <CardLayout className="mt-6 p-6 lg:p-[55px] space-y-12">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-6 gap-y-4">
          <EmployeeDetailShort title="Employee Name" subTitle="Okeke Adaeze" />
          <EmployeeDetailShort title="Job Title " subTitle="Sales Associate " />
          <EmployeeDetailShort title="Department" subTitle="Sales" />
          <EmployeeDetailShort title="Reviewer" subTitle="John Edward" />
          <EmployeeDetailShort title="Status" subTitle="Completed" subTextStyle="text-green-700" />
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-6 gap-y-4">
          <EmployeeDetailShort title="Cycle Name" subTitle="Okeke Adaeze" />
          <EmployeeDetailShort title="Cycle Start Date" subTitle="Sales Associate " />
          <EmployeeDetailShort title="Cycle End Date" subTitle="Sales" />
          <EmployeeDetailShort title="Overall Rating" subTitle="John Edward" />
        </div>

        <div className="space-y-12">
          <EmployeeDetailLong title="Reviewer Feedback" subTitle="Okeke exceeded expectations on sales targets but could improve customer satisfaction " />
          <EmployeeDetailLong title="Employee Self Assessment e" subTitle="Sales Associate " />
          <EmployeeDetailLong title="Manager Assessment " subTitle="Sales" />
          <EmployeeDetailLong
            title="Attachments"
            subTitle={
              <span className="text-sm font-medium text-primary flex items-center gap-x-2 rounded-full bg-primary/10 px-2 py-1 w-max">
                Sales report Q1. PDF
                <span className="text-primary text-lg"><FiDownload /></span>
              </span>
            }
          />
        </div>
      </CardLayout>


      <div className="space-y-4 mt-7">
        <div ref={containerRef} className='flex gap-4 text-sm mb-4 pl-4 relative w-max'>
          {/* <div className='absolute bottom-0 inset-x-0 w-full h-[1px] bg-gray-200' /> */}
          <div
            ref={sliderRef}
            className={`absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out`}
          />
          {TABS.map((tab, index) => (
            <button
              key={tab}
              ref={refs.current[index]}
              type='button'
              data-step={tab}
              className={`p-4 ${activeStep === tab ? "text-primary" : "text-gray-500"}`}
              onClick={() => setActiveStep(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        {renderActiveComponent()}
      </div>
    </div>
  )
}




const EmployeeDetailLong = ({ subTextStyle = "text-sm", title, subTitle }: { subTextStyle?: string, title?: string, subTitle?: string | ReactNode }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-black">{title}</p>
      <p className={cn(subTextStyle)}>{subTitle}</p>
    </div>
  )
}

const EmployeeDetailShort = ({ subTextStyle = "text-sm", title, subTitle }: { subTextStyle?: string, title?: string, subTitle?: string }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-bold text-gray-500">{title}</p>
      <p className={cn(subTextStyle)}>{subTitle}</p>
    </div>
  )
}

const Breadcrumb = () => {
  return (
    <h3 className="text-sm font-bold flex items-center gap-x-2">
      Review cycle
      <span className="text-primary flex items-center gap-x-2">
        <IoIosArrowForward />Okeke Adaeze</span>
    </h3>
  )
}

export default EmployeeReviewPage
