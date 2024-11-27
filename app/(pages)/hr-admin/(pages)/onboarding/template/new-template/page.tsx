import CardLayout from "@/app/_components/shared/cards";
import { LuListFilter, LuPlusCircle } from "react-icons/lu";
import { GoDotFill, GoPlus } from "react-icons/go";
import { PiCalendar } from "react-icons/pi";
import { Avatar } from "@mui/material";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from "@/components/ui/select";
import { CiCalendarDate } from "react-icons/ci";
import { ReactNode } from "react";






const CreateNewTemplate = () => {
  return (
    <form className='mb-12'>
      <h3>Create New Template</h3>

      <CardLayout className='mt-6 space-y-6'>
        <div className='flex flex-col'>
          <label htmlFor='template-name' className='text-sm font-semibold mb-1'>
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Template Name
            </span>
          </label>
          <input
            name='template-name'
            type='text'
            className='border outline-none rounded-lg p-2'
            placeholder='Template Name'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='template-name' className='text-sm font-semibold mb-1'>
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Description
            </span>
          </label>
          <textarea
            name='template-name'
            className='border outline-none rounded-lg p-2 resize-none'
            placeholder='Description'
          />
        </div>
      </CardLayout>

      <CardLayout className='mt-8 space-y-6 lg:p-6' bg='bg-none lg:bg-white border-none p-0'>
        <div className='mt-6'>
          <div className='flex flex-col bg-gray-50 p-3'>
            <div className='flex items-center justify-between mb-[13px]'>
              <p className='text-sm font-semibold mb-1'>
                To Do&lsquo;s <span className='text-gray-400'>(0)</span>
              </p>

              <EditModal triggers={
                <button className='capitalize flex items-center justify-center gap-x-2 outline-none border-none bg-primary text-white rounded-lg px-[12.33px] py-[9px] font-bold'>
                  <span> Add Task</span>
                  <LuPlusCircle />
                </button>
              } />
            </div>
            <div className='space-y-4'>
              <div className='bg-white h-8 rounded-lg flex items-center justify-center'>
                <GoPlus />
              </div>
              <Task />
              <Task />
              <Task />
            </div>
          </div>
        </div>
      </CardLayout>

      <div className='flex flex-col md:flex-row items-center justify-end gap-4 mt-10'>
        <button className='capitalize w-full md:w-[230px] flex items-center justify-center gap-x-2 outline-none border border-gray-400 bg-white rounded-lg px-[12.33px] py-[9px] font-bold'>
          Save & Continue Later
        </button>
        <button className='capitalize w-full md:w-[230px] gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold'>
          Next
        </button>
      </div>
    </form>
  );
};




const Task = () => {
  return (
    <>
      <MobileTask />
      <DesktopTask />
    </>
  );
};

const MobileTask = () => {
  return (
    <div className='p-[14px] bg-white rounded-lg h-max w-full lg:hidden space-y-3'>
      <div className=' flex items-center justify-between'>

        <ViewModal>
          <div>
            <p className='font-semibold'>Set Up Workstation</p>

            <p className='flex items-center text-[11px] text-primary font-medium'>
              <GoDotFill />
              <span>Design</span>
            </p>
          </div>
        </ViewModal>
        <div className='flex items-center gap-x-1 text-xs text-[#64748B] bg-[#F8FAFC] p-1 rounded-lg'>
          <PiCalendar />
          Nov 30
        </div>
        <div>
          <div className='flex'>
            {["/image/persons/person-1.png", "/image/persons/person-2.png", "/image/persons/person-1.png"].map(
              (imageSrc, index) => (
                <Avatar key={index} src={imageSrc} sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }} />
              ),
            )}
          </div>
        </div>
        <PopoverMenu />
      </div>
      <p className='text-[#64748B] text-xs'>
        Prepare and configure the new hire&apos;s workstation with all required hardware and software.
      </p>
    </div>
  );
};

const DesktopTask = () => {
  return (
    <div className='bg-white rounded-lg h-20 w-full hidden lg:block cursor:pointer'>
      <div className='p-[14px] flex items-center justify-between'>
        <ViewModal>
          <div>
            <p className='font-semibold'>Set Up Workstation</p>

            <p className='flex items-center text-[11px] text-primary font-medium'>
              <GoDotFill />
              <span>Design</span>
            </p>
          </div>
        </ViewModal>
        <p className='text-[#64748B] text-xs'>
          Prepare and configure the new hire&apos;s workstation with all required hardware and software.
        </p>
        <div className='flex items-center gap-x-1 text-xs text-[#64748B] bg-[#F8FAFC] p-1 rounded-lg'>
          <PiCalendar />
          Nov 30
        </div>
        <div>
          <div className='flex'>
            {["/image/persons/person-1.png", "/image/persons/person-2.png", "/image/persons/person-1.png"].map(
              (imageSrc, index) => (
                <Avatar key={index} src={imageSrc} sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }} />
              ),
            )}
          </div>
        </div>
        <PopoverMenu />
      </div>
    </div>
  );
};

function PopoverMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='cursor-pointer outline-none p-1'>
          <HiDotsHorizontal />
        </button>
      </PopoverTrigger>

      <PopoverContent className='w-40 bg-white space-y-2 cursor-pointer rounded-lg flex flex-col items-start text-[#475367]'>
        <EditModal triggers={
          <button>Edit Task</button>
        } />
        <button className='text-red-500'>Delete Task</button>
      </PopoverContent>
    </Popover>
  );
}

function EditModal({ triggers }: { triggers: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggers}
      </DialogTrigger>
      <DialogContent className="bg-white overflow-y-scroll max-h-[665px] scale-90">
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className=''>
              <p className='font-semibold'>Add Task</p>
              <p className='font-normal text-sm'>Add and create task</p>
            </DialogTitle>
            {/* <DialogCancel className='border-none rounded-full h-10 w-10 bg-gray-200'>
              <IoCloseOutline />
            </DialogCancel> */}
          </div>
        </DialogHeader>

        <form className="">
          <div className="flex items-center justify-between gap-x-10">
            <input type='text' placeholder='write a task name' className='font-bold text-xl outline-none border-none' />
            <Select>
              <SelectTrigger className='w-max gap-x-2 border-none bg-black text-white'>
                <SelectValue placeholder='To Do' />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value='apple' className="hover:bg-primary hover:text-white">To do</SelectItem>
                  <SelectItem value='banana' className="hover:bg-primary hover:text-white">In progress</SelectItem>
                  <SelectItem value='blueberry' className="hover:bg-primary hover:text-white">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="border border-[#F1F5F9] rounded-xl mt-8">
            <p className="px-4 py-2 font-bold">Details</p>
            <hr className="border-t border-[#F1F5F9]" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between px-4 py-6 text-xs text-[#94A3B8]">
              <div className="space-y-3">
                <p className="text-xs">ASSIGNEED TO</p>
                <div className="flex items-center justify-center gap-x-3 py-1">
                  <span className="border border-dashed rounded-full p-1 text-[#64748B] border-[#64748B]"> <BsPerson /></span>No assignee
                </div>
              </div>
              <div className="space-y-3">
                <p>CREATED</p>
                <div className="flex text-nowrap items-center justify-center gap-x-2 bg-[#F8FAFC] text-[#0F172A] p-2 rounded-lg text-xs">
                  <CiCalendarDate className="font-bold" />
                  Nov 29, 2021
                </div>
              </div>
              <div className="space-y-3">
                <p>LABELS</p>
                <Select>
                  <SelectTrigger className='border-none p-0 text-cyan-400 flex items-center justify-start gap-x-2 w-max'>
                    <SelectValue placeholder='IT Support' />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectItem value='apple' className="hover:bg-primary hover:text-white">IT Support</SelectItem>
                      <SelectItem value='banana' className="hover:bg-primary hover:text-white">IT Support</SelectItem>
                      <SelectItem value='blueberry' className="hover:bg-primary hover:text-white">IT Support</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3 text-xs">
                <p>DUE DATE</p>
                <div className="flex items-center justify-center gap-x-2 py-1">
                  <span className="border border-dashed rounded-full p-1 text-[#64748B] border-[#64748B]">
                    <BsPerson />
                  </span>
                  No due date
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm mt-8">
            <div className='flex flex-col'>
              <label htmlFor='template-desc' className='text-sm font-semibold mb-1'>
                <span className="block font-semibold">
                  Description
                </span>
              </label>
              <textarea
                name='template-desc'
                className='border-none focus:border outline-none rounded-lg p-2 resize-none placeholder:text-[#94A3B8]'
                placeholder='Add more details to this task...'
              />
            </div>
          </div>

          <div className="flex itemcenter text-sm mt-8 gap-x-4">
            <p className="font-semibold">Subtask</p>
            <button className="border-none outline-none text-primary"> + Add</button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex itemcenter justify-between text-sm mt-8 gap-x-4">
              <p className="font-semibold">Activity</p>
              <button className="border-none outline-none text-primary flex items-center justify-center gap-x-2"> <LuListFilter /> Newest first</button>
            </div>
            <div className="flex gap-x-4">
              <Avatar src="/image/persons/person-1.png" />
              <label htmlFor="comment" className="hidden"></label>
              <div className="w-full space-y-2">
                <input
                  name='comment'
                  type='text'
                  className='border outline-none rounded-lg p-2 w-full'
                  placeholder='Add a comment...'
                />
                <p className="font-normal"><span className="font-semibold">Pro tip:</span> press <span className="font-semibold">M</span> to comment</p>
              </div>
            </div>

          </div>
          <button className='capitalize w-full mt-5 gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold'>
            Next
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ViewModal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white overflow-y-scroll max-h-[665px] scale-90">
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className=''>
              <p className='font-semibold'>View Task</p>
              <p className='font-normal text-sm'>view task details</p>
            </DialogTitle>
            {/* <DialogCancel className='border-none rounded-full h-10 w-10 bg-gray-200'>
            <IoCloseOutline />
          </DialogCancel> */}
          </div>
        </DialogHeader>

        <form className="">
          <div className="flex items-center justify-between gap-x-10">
            <p className="font-semibold">Set Up Workstation</p>
            <Select>
              <SelectTrigger className='w-max gap-x-2 border-none bg-black text-white'>
                <SelectValue placeholder='To Do' />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value='apple' className="hover:bg-primary hover:text-white">To do</SelectItem>
                  <SelectItem value='banana' className="hover:bg-primary hover:text-white">In progress</SelectItem>
                  <SelectItem value='blueberry' className="hover:bg-primary hover:text-white">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="border border-[#F1F5F9] rounded-xl mt-8">
            <p className="px-4 py-2 font-bold">Details</p>
            <hr className="border-t border-[#F1F5F9]" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between px-4 py-6 text-xs text-[#94A3B8]">
              <div className="space-y-3">
                <p className="">ASSIGNEED TO</p>
                <div className='flex'>
                  {["/image/persons/person-1.png", "/image/persons/person-2.png", "/image/persons/person-1.png"].map(
                    (imageSrc, index) => (
                      <Avatar key={index} src={imageSrc} sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }} />
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <p>CREATED</p>
                <div className="flex text-nowrap items-center justify-center gap-x-2 bg-[#F8FAFC] text-[#0F172A] p-2 rounded-lg text-sm">
                  <CiCalendarDate className="font-bold" />
                  Nov 29, 2021
                </div>
              </div>
              <div className="space-y-3">
                <p>LABELS</p>
                <Select>
                  <SelectTrigger className='border-none p-0 text-cyan-400 flex items-center justify-start gap-x-2 w-max'>
                    <SelectValue placeholder='IT Support' />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectItem value='apple' className="hover:bg-primary hover:text-white">IT Support</SelectItem>
                      <SelectItem value='banana' className="hover:bg-primary hover:text-white">IT Support</SelectItem>
                      <SelectItem value='blueberry' className="hover:bg-primary hover:text-white">IT Support</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3 text-sm">
                <p>DUE DATE</p>
                <div className="flex items-center justify-center gap-x-2 py-1 text-nowrap">
                  <span className="border border-dashed rounded-full p-1 text-[#64748B] border-[#64748B]">
                    <BsPerson />
                  </span>
                  No due date
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm mt-8">
            <div className='flex flex-col'>
              <label htmlFor='template-desc' className='text-sm font-semibold mb-1'>
                <span className="block font-semibold">
                  Description
                </span>
              </label>
              <textarea
                name='template-desc'
                className='border-none focus:border outline-none rounded-lg p-2 resize-none placeholder:text-[#94A3B8]'
                placeholder='Add more details to this task...'
              />
            </div>
          </div>

          <div className="flex itemcenter text-sm mt-8 gap-x-4">
            <p className="font-semibold">Subtask</p>
            <button className="border-none outline-none text-primary"> + Add</button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex itemcenter justify-between text-sm mt-8 gap-x-4">
              <p className="font-semibold">Activity</p>
              <button className="border-none outline-none text-primary flex items-center justify-center gap-x-2"> <LuListFilter /> Newest first</button>
            </div>
            <div className="flex gap-x-4">
              <Avatar src="/image/persons/person-1.png" />
              <label htmlFor="comment" className="hidden"></label>
              <div className="w-full space-y-2">
                <input
                  name='comment'
                  type='text'
                  className='border outline-none rounded-lg p-2 w-full'
                  placeholder='Add a comment...'
                />
                <p className="font-normal"><span className="font-semibold">Pro tip:</span> press <span className="font-semibold">M</span> to comment</p>
              </div>
            </div>

          </div>
          <button className='capitalize w-full mt-5 gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold'>
            Next
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewTemplate;
