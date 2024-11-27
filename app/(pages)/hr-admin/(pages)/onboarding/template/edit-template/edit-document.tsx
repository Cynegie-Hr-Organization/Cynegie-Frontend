'use client'

import { LuListFilter } from "react-icons/lu";
import { Avatar } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import { ReusableSelect } from './components/ReusableSelect';
import { CiCalendarDate } from "react-icons/ci";


const NewDocument = () => {
  return (
    <div className='flex flex-col bg-gray-50 p-3'>
      <p className='text-sm font-semibold mb-1'>
        Uploaded Documents <span className='text-gray-400'>(0)</span>
      </p>

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
    </div>
  )
}


export default NewDocument;