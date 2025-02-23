import { AppModal } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "@mui/material";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuCirclePlus } from "react-icons/lu";
import { PiCalendar } from "react-icons/pi";
import { ReusableSelect } from "./components/ReusableSelect";

const NewTrainingModule = () => {
  return (
    <div className="flex flex-col bg-gray-50 p-3">
      <div className="flex items-center justify-between mb-[13px]">
        <p className="text-sm font-semibold mb-1">
          To Do&lsquo;s <span className="text-gray-400">(0)</span>
        </p>

        <AddTrainingModuleModal>
          <button className="capitalize flex items-center justify-center gap-x-2 outline-none border-none bg-primary text-white rounded-lg px-[12.33px] py-[9px] font-bold">
            <span> Add Training Module</span>
            <LuCirclePlus />
          </button>
        </AddTrainingModuleModal>
      </div>

      <div className="space-y-4">
        <div className="bg-white h-8 rounded-lg flex items-center justify-center">
          <GoPlus />
        </div>
        <Task />
        <Task />
        <Task />
      </div>
    </div>
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
    <div className="p-[14px] bg-white rounded-lg h-max w-full lg:hidden space-y-3">
      <div className=" flex items-start justify-between">
        <ViewTaskModal>
          <p className="font-semibold cursor-pointer">
            Cybersecurity Awareness Trainingn
          </p>
        </ViewTaskModal>

        <div className="flex items-center gap-x-1 text-xs text-[#64748B] bg-[#F8FAFC] p-1 rounded-lg">
          <PiCalendar />
          Nov 30
        </div>

        <div>
          <div className="flex">
            {[
              "/image/persons/person-1.png",
              "/image/persons/person-2.png",
              "/image/persons/person-1.png",
            ].map((imageSrc, index) => (
              <Avatar
                key={index}
                src={imageSrc}
                sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }}
              />
            ))}
          </div>
        </div>

        <PopoverMenu />
      </div>

      <p className="text-xs text-[#64748B] font-medium">
        Prepare and configure the new hire&apos;s workstation with all required
        hardware and software.
      </p>
    </div>
  );
};

const DesktopTask = () => {
  return (
    <div className="bg-white rounded-lg h-20 w-full hidden lg:block max-h-[100px]">
      <div className="p-[14px] flex items-center justify-between">
        <ViewTaskModal>
          <div className="cursor-pointer max-w-[398px]">
            <p className="font-semibold truncate">
              Cybersecurity Awareness Training
            </p>

            <p className="text-xs text-[#64748B] font-medium truncate">
              Prepare and configure the new hire&apos;s workstation with all
              required hardware and software. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aut voluptatibus harum voluptatem.
              Laborum illo minus cumque nihil, delectus labore ullam fuga
              obcaecati animi fugit blanditiis, unde impedit, veniam ipsa ea!
              Aliquam, omnis. Illo nobis ullam temporibus sapiente molestias
              voluptate veritatis voluptas vero. Ipsa, quas deserunt error
              commodi porro amet rerum omnis consequatur mollitia eos cupiditate
              praesentium dolor. Eius, consequatur sapiente. Voluptatum expedita
              enim fuga, laboriosam saepe esse culpa! Adipisci nulla officia
              odit asperiores assumenda unde, quam vero. Aut sequi in ducimus
              quod mollitia perferendis, est eaque dolorum, ex corrupti eos!
            </p>
          </div>
        </ViewTaskModal>

        <div className="flex items-center gap-x-1 text-xs text-[#64748B] bg-[#F8FAFC] p-1 rounded-lg">
          <PiCalendar />
          Nov 30
        </div>
        <div>
          <div className="flex">
            {[
              "/image/persons/person-1.png",
              "/image/persons/person-2.png",
              "/image/persons/person-1.png",
            ].map((imageSrc, index) => (
              <Avatar
                key={index}
                src={imageSrc}
                sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }}
              />
            ))}
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
        <button className="cursor-pointer outline-none p-1">
          <HiDotsHorizontal />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-max bg-white space-y-2 cursor-pointer rounded-lg flex flex-col items-start text-[#475367]">
        <EditTrainingModuleModal>
          <button type="button" className="text-nowrap text-sm">
            Edit Training Module
          </button>
        </EditTrainingModuleModal>

        <button type="button" className="text-red-500 text-nowrap text-sm">
          Delete Training Module
        </button>
      </PopoverContent>
    </Popover>
  );
}

function AddTrainingModuleModal({ children }: { children: ReactNode }) {
  return (
    <AppModal
      trigger={children}
      header={
        <DialogTitle className="">
          <p className="font-semibold">Add Training Module</p>
          <p className="font-normal text-sm">Add and create training module</p>
        </DialogTitle>
      }
      footer={
        <button className="capitalize w-full mt-5 gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold">
          Add Training Module
        </button>
      }
    >
      <form className="h-max overflow-y-scroll space-y-6 mt-6">
        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Module Name
            </span>
          </label>
          <input
            name="template-name"
            type="text"
            className="border outline-none rounded-lg p-2"
            placeholder="Template Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Description
            </span>
          </label>
          <textarea
            name="template-name"
            className="border outline-none rounded-lg p-2 resize-none"
            placeholder="Description"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="">Link URL</span>
          </label>
          <input
            name="template-name"
            type="text"
            className="border outline-none rounded-lg p-2"
            placeholder="URL Input"
          />
        </div>
      </form>
    </AppModal>
  );
}

export function EditTrainingModuleModal({ children }: { children: ReactNode }) {
  return (
    <AppModal
      trigger={children}
      header={
        <DialogTitle className="">
          <p className="font-semibold">Edit Training Module</p>
          <p className="font-normal text-sm">Edit and update training module</p>
        </DialogTitle>
      }
      footer={
        <button className="capitalize w-full mt-5 gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold">
          Edit Training Module
        </button>
      }
    >
      <form className="h-max overflow-y-scroll space-y-6 mt-6">
        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Document Name
            </span>
          </label>
          <input
            name="template-name"
            type="text"
            className="border outline-none rounded-lg p-2"
            placeholder="Template Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              Document Description
            </span>
          </label>
          <textarea
            name="template-name"
            className="border outline-none rounded-lg p-2 resize-none"
            placeholder="Description"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="template-name" className="text-sm font-semibold mb-1">
            <span className="">Link URL</span>
          </label>
          <input
            name="template-name"
            type="text"
            className="border outline-none rounded-lg p-2"
            placeholder="URL Input"
          />
        </div>
      </form>
    </AppModal>
  );
}

function ViewTaskModal({ children }: { children: ReactNode }) {
  return (
    <AppModal
      trigger={children}
      header={
        <DialogTitle className="space-y-1">
          <p className="font-semibold">Training Module</p>
          <p className="font-normal text-sm text-[#64748B]">
            Training module details
          </p>
        </DialogTitle>
      }
    >
      <>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Cybersecurity Awareness Training</p>
          <ReusableSelect
            plainSelect
            placeholder="To Do"
            items={["To do", "In progress", "Completed"]}
            triggerClassName="w-max gap-x-2 border-none bg-black text-white"
          />
        </div>

        <div className="border border-[#F1F5F9] rounded-xl mt-8">
          <p className="px-4 py-2 font-bold">Details</p>
          <hr className="border-t border-[#F1F5F9]" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between px-4 py-6 text-xs text-[#94A3B8]">
            <div className="space-y-3">
              <p className="">ASSIGNEED TO</p>
              <div className="flex">
                {[
                  "/image/persons/person-1.png",
                  "/image/persons/person-2.png",
                  "/image/persons/person-1.png",
                ].map((imageSrc, index) => (
                  <Avatar
                    key={index}
                    src={imageSrc}
                    sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }}
                  />
                ))}
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
                placeholder="IT Support"
                items={["IT Support", "HR Support", "Finance Support"]}
                triggerClassName="border-none p-0 text-cyan-400 flex items-center justify-start gap-x-2 w-max"
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
      </>
    </AppModal>
  );
}

export default NewTrainingModule;
