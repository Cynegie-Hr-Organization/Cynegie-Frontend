import { LuListFilter } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { PiCalendar } from "react-icons/pi";
import { Avatar } from "@mui/material";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { ReusableSelect } from './components/ReusableSelect';
import { CiCalendarDate } from "react-icons/ci";
import { ReactNode } from "react";
import { DrawerDialog } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";

const NewTask = () => {
  return (
    <div className='flex flex-col bg-gray-50 p-3'>
      <p className='text-sm font-semibold mb-1'>
        To Do&lsquo;s <span className='text-gray-400'>(0)</span>
      </p>


      <div className='space-y-4'>
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  )
}


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

        <ViewTaskModal>
          <div className="cursor-pointer">
            <p className='font-semibold'>Set Up Workstation</p>

            <p className='flex items-center text-[11px] text-primary font-medium'>
              <GoDotFill />
              <span>Design</span>
            </p>
          </div>
        </ViewTaskModal>

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
    <div className='bg-white rounded-lg h-20 w-full hidden lg:block'>
      <div className='p-[14px] flex items-center justify-between'>
        <ViewTaskModal>
          <div className="cursor-pointer">
            <p className='font-semibold'>Set Up Workstation</p>

            <p className='flex items-center text-[11px] text-primary font-medium'>
              <GoDotFill />
              <span>Design</span>
            </p>
          </div>
        </ViewTaskModal>
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
        <EditTaskModal triggers={
          <button>Edit Task</button>
        } />
        <button className='text-red-500'>Delete Task</button>
      </PopoverContent>
    </Popover>
  );
}




function EditTaskModal({ triggers }: { triggers: ReactNode }) {
  return (
    <DrawerDialog
      trigger={triggers}

      header={
        <DialogTitle className=''>
          <p className='font-semibold'>Edit Task</p>
          <p className='font-normal text-sm'>Edit and update task</p>
        </DialogTitle>
      }


      footer={
        <button className='capitalize w-full mt-5 gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold'>
          Edit Task
        </button>
      }
    >
      <form className="">
        <div className="flex items-center justify-between gap-x-10">
          <input type='text' placeholder='write a task name' className='font-bold text-xl outline-none border-none' />
          <ReusableSelect
            placeholder='To Do'
            items={['To do', 'In progress', 'Completed']}
            triggerClassName='w-max gap-x-2 border-none bg-black text-white'
          />
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
              <ReusableSelect
                plainSelect
                placeholder='IT Support'
                items={['IT Support', 'HR Support', 'Finance Support']}
                triggerClassName='border-none p-0 text-cyan-400 flex items-center justify-start gap-x-2 w-max'
              />
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
              <p className="font-normal">
                <span className="font-semibold">Pro tip:</span> press <span className="font-semibold">M</span> to comment
              </p>
            </div>
          </div>
        </div>
      </form>
    </DrawerDialog>
  );
}

function ViewTaskModal({ children }: { children: ReactNode }) {
  return (
    <DrawerDialog
      trigger={children}

      header={
        <DialogTitle className=''>
          <p className='font-semibold'>View Task</p>
          <p className='font-normal text-sm'>View task details</p>
        </DialogTitle>
      }
    >
      <>
        <div className="flex items-center justify-between gap-x-10">
          <p className="font-semibold">Set Up Workstation</p>
          <ReusableSelect
            plainSelect
            placeholder='To Do'
            items={['To do', 'In progress', 'Completed']}
            triggerClassName='w-max gap-x-2 border-none bg-black text-white'
          />
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
              <ReusableSelect
                plainSelect
                placeholder='IT Support'
                items={['IT Support', 'HR Support', 'Finance Support']}
                triggerClassName='border-none p-0 text-cyan-400 flex items-center justify-start gap-x-2 w-max'
              />
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
            <button className="border-none outline-none text-primary flex items-center justify-center gap-x-2">
              <LuListFilter /> Newest first</button>
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
      </>
    </DrawerDialog>
  )
}


export default NewTask;