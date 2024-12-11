"use client"

import { IoIosArrowDown } from "react-icons/io";
import AppButton from "@/app/_components/shared/button";
import { useRouter } from "next/navigation";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import FinanceAdminBudgetTable from "./table";
import { ReactNode } from "react";
import { DrawerDialog } from "@/components/drawer/modal";
import InputText, { InputTextArea } from "@/app/_components/shared/input-text";
import { DialogTitle } from "@/components/ui/dialog";
import { AppSelect } from "@/app/_components/shared/select";
import { AppDatePicker } from "@/app/_components/shared/date-picker";






const FinanceAdminDashboardBudgetManagement = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Budget Management"
        description="Manage your budgets and transactions here"
        buttonLabel="Add New"
      />

      <FinanceAdminBudgetTable />
    </div>
  )
}


const PageHeader = ({ title, description, buttonLabel }: {
  title: string,
  description: string,
  actionButtonLabel?: string,
  buttonLabel: string,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-black font-roboto">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex items-center gap-4">
        <NewBudgetModal trigger={<AppButton label={buttonLabel} className="btn-primary w-full hidden md:block" />} />
      </div>
    </div>
  )
}



const NewBudgetModal = ({ trigger }: { trigger: ReactNode }) => {
  return (
    <DrawerDialog trigger={trigger}
      header={
        <DialogTitle>
          <p className="font-roboto text-xl font-bold">New Budget</p>
        </DialogTitle>
      }
      footer={<div className="flex items-center justify-center gap-4">
        <AppButton label="Cancel" className="btn-secondary w-[296px]" />
        <AppButton label="Save" className="btn-primary w-[296px]" />
      </div>}>

      <form>
        <div className="space-y-4">
          <InputText label="Name" placeholder="Enter name" onChange={() => { }} value={""} id={"name"} requiredField={true} type={"text"} />
          <AppSelect label="Department" placeholder="Select department" onChange={() => { }} requiredField={true} listItems={[
            { label: "Department 1", value: "department-1" },
            { label: "Department 2", value: "department-2" },
            { label: "Department 3", value: "department-3" },
          ]} />
          <InputText label="Total Allocation" placeholder="0" onChange={() => { }} value={""} id={"total-allocation"} requiredField={true} type={"number"} />
          <InputTextArea label="Description" placeholder="Enter description" onChange={() => { }} value={""} id={"description"} requiredField={true} type={"text"} />
          <AppDatePicker
            label="Start Date"
            placeholder="Date"
            selectedDate={new Date()}
            setSelectedDate={(date) => { }}
            requiredField
          />
          <AppDatePicker
            label="End Date"
            placeholder="Date"
            selectedDate={new Date()}
            setSelectedDate={(date) => { }}
            requiredField
          />
        </div>
      </form>
    </DrawerDialog>
  )
}




export default FinanceAdminDashboardBudgetManagement;