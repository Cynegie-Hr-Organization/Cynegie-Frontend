'use client'

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppInputTextArea } from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { DrawerDialog } from "@/components/drawer/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";







const NewHireList = () => {
  return (
    <CardLayout className="bg-white overflow-x-scroll space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
          />
        </div>

        <AppDropdownMenu trigger={
          <button
            type="button"
            className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
            <LuListFilter /> Filter
          </button>
        }
          menuItems={
            <div className="p-4 space-y-10">
              <div className="space-y-4">
                <AppSelect listItems={[
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" }
                ]}
                  label="Priority"
                  placeholder="High"
                  onChange={(value) => {
                    console.log(value)
                  }} />

                <AppSelect
                  listItems={[
                    { label: "Completed", value: "completed" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Not Started", value: "not-started" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={function (value: string): void {
                    console.log(value)
                  }} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <AppButton label="Reset" className="btn-secondary w-[90px]" />
                <AppButton label="Filter" className="btn-primary w-[90px]" />
              </div>
            </div>
          } />


      </div>

      <div className="-mx-6">
        <table className="w-full border-collapse">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">OnBoarding Template</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr
                  key={idx}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-4 py-4">
                    <input type="checkbox" className="border-gray-300" />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Ayomide Alibaba</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Admin</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Admin Officer</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">21st June, 2024</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">IT Department Template</p>
                  </td>
                  <td className="p-4">
                    <PopoverMenu />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardLayout>
  );
};


function PopoverMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className='cursor-pointer outline-none p-1 border border-gray-300 rounded-lg'>
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className='w-fit p-2 bg-white cursor-pointer rounded-lg flex flex-col items-start text-[#475367]'>
        <button
          className="hover:bg-gray-100 w-full text-left text-sm p-2 rounded-md"
          onClick={() => router.push('/hr-admin/onboarding/template/new-template/1')}>
          View details</button>
        <button
          className="hover:bg-gray-100 w-full text-left text-sm p-2 rounded-md"
          onClick={() => router.push('/hr-admin/onboarding/template/new-template/1')}>
          View Onboarding template</button>
        <SetReminderModal trigger={<button
          className="hover:bg-gray-100 w-full text-left text-sm p-2 rounded-md"
        >
          Send Reminders</button>} />
      </PopoverContent>
    </Popover>
  );
}



const SetReminderModal: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {
  const [isOpen, setIsOPen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
  })


  return (
    <DrawerDialog open={isOpen} setOpen={setIsOPen} trigger={trigger}
      header={
        <span className="flex flex-col">
          <span className="font-roboto text-sm font-bold">Set Reminder</span>
          <span className="font-roboto text-xs font-normal text-gray-500">Set Reminder</span>
        </span>
      }
      footer={
        <div className="flex items-center justify-center gap-4">
          <AppButton label="Cancel" className="btn-secondary w-[296px]" />
          <AppButton label="Add" className="btn-primary w-[296px]" onClick={() => setIsOPen(false)} />
        </div>
      }
    >

      <form>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <AppDatePicker
              label="Set Date"
              selectedDate={formData.startDate !== '' ? new Date(formData.startDate) : undefined}
              setSelectedDate={(date) => { setFormData({ ...formData, startDate: `${date}` }) }}
              requiredField
            />
            <AppDatePicker
              label="Set Date"
              selectedDate={formData.endDate !== '' ? new Date(formData.endDate) : undefined}
              setSelectedDate={(date) => { setFormData({ ...formData, endDate: `${date}` }) }}
              requiredField
            />
          </div>
          <AppInputTextArea
            id="reminder-description"
            label="Reminder Description"
            placeholder="Reminder Description"
            onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
            value={formData.description}
            requiredField
          />
        </div>
      </form>
    </DrawerDialog>
  )
}






export default NewHireList;
