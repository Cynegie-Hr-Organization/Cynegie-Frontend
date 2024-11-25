import CardLayout from "@/app/_components/shared/cards";
import { LuPlusCircle } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const CreateNewTemplate = () => {
  return (
    <form className='mb-12'>
      <h3>Create New Template</h3>

      <CardLayout className='mt-6 space-y-6'>
        <div className='flex flex-col'>
          <label htmlFor='template-name' className='text-sm font-semibold mb-1'>
            <span className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block">
              {" "}
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
              {" "}
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

      <CardLayout className='mt-8 space-y-6'>
        <div className='mt-6'>
          <div className='flex flex-col bg-gray-50 p-3 h-[276px]'>
            <div className='flex items-center justify-between mb-[13px]'>
              <p className='text-sm font-semibold mb-1'>
                To Do&lsquo;s <span className='text-gray-400'>(0)</span>
              </p>
              <button className='capitalize flex items-center justify-center gap-x-2 outline-none border-none bg-primary text-white rounded-lg px-[12.33px] py-[9px] font-bold'>
                <span> Add Task</span>
                <LuPlusCircle />
              </button>
            </div>
            <div className='bg-white h-8 rounded-lg flex items-center justify-center'>
              <GoPlus />
            </div>
          </div>
        </div>
      </CardLayout>

      <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-10">
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

export default CreateNewTemplate;
