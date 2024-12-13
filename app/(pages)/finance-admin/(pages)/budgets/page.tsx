"use client"

import AppButton from "@/app/_components/shared/button";
import BudgetsTable from "./table";
import { DrawerDialog } from "@/components/drawer/modal";
import { DrawerTitle } from "@/components/ui/drawer";
import { AppSelect } from "@/app/_components/shared/select";
import InputText from "@/app/_components/shared/input-text";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { InputTextArea } from "@/app/_components/shared/input-text";

const BudgetsPage = () => {
  const pageCards = [
    {
      title: "Total Budget Allocated ",
      description: "₦34,886,000",
    },
    {
      title: "Total Budget Spent",
      description: "₦3,000,000",
    },
    {
      title: "Remaining Funds",
      description: "₦27,000,000",
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Budgets Management</h3>
          <p className="text-sm text-gray-500">Manage finance and organization payroll</p>
        </div>
        <AddBudgetModal trigger={<AppButton label="Add New" className="btn-primary hidden md:block" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageCards.map((card, index) => (
          <div className="common-card space-y-5" key={index}>
            <div className="flex items-center gap-2">
              <h3 className="font-roboto lg:text-xs text-sm text-[#848897] font-medium">{card.title}</h3>
            </div>
            <p className="font-roboto text-xl font-bold">{card.description}</p>
          </div>
        ))}
      </div>
      <BudgetsTable />
    </div>
  );
};


const AddBudgetModal = ({ trigger }: { trigger: React.ReactNode }) => {
    return (
      <DrawerDialog trigger={trigger}
        header={
          <DrawerTitle>
            <p className="font-roboto text-xl font-bold">New Budget</p>
          </DrawerTitle>
        }
        footer={<div className="flex items-center justify-center gap-4">
          <AppButton label="Cancel" className="btn-secondary w-[296px]" />
          <AppButton label="Save Budget" className="btn-primary w-[296px]" />
        </div>}>
  
        <form>
          <div className="space-y-4">
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
              setSelectedDate={() => { }}
              requiredField
            />
            <AppDatePicker
              label="End Date"
              placeholder="Date"
              selectedDate={new Date()}
              setSelectedDate={() => { }}
              requiredField
            />
          </div>
        </form>
      </DrawerDialog>
  )
}

export default BudgetsPage;
