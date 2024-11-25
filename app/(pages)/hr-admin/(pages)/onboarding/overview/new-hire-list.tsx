/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import { hiringTabOneData } from "./components/table/data";
import CardLayout from "@/app/_components/shared/cards";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { TextField } from "@mui/material";

const NewHireList = () => {
  return (
    <CardLayout className='bg-white overflow-x-scroll'>
      <div className='w-full flex items-center justify-between flex-grow mb-4'>
        <TextField
          className='max-w-[476px]'
          sx={{
            width: { xs: "90%", sm: "70%", md: "70%" },
            mb: { xs: "15px", md: "0px" },
          }}
          InputProps={{
            sx: {
              height: "35px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 400,
            },
            startAdornment: <RiSearchLine className='mr-2 text-2xl' />,
          }}
          placeholder='Search here...'
        />

        <button className='flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 gap-x-3'>
          <LuListFilter />
          Filter
        </button>
      </div>
      <div className='-mx-6'>
        <table className='w-full border-collapse'>
          <thead className='bg-[#F7F9FC]'>
            <tr>
              <th className='px-4 py-3 text-left'>
                <input type='checkbox' />
              </th>
              <th className='px-4 py-3 text-left'>Name</th>
              <th className='px-4 py-3 text-left'>Department</th>
              <th className='px-4 py-3 text-left'>Position</th>
              <th className='px-4 py-3 text-left'>Start Date</th>
              <th className='px-4 py-3 text-left'>OnBoarding Template</th>
              <th className='px-4 py-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                  <td className='px-4 py-4'>
                    <input type='checkbox' className='border-gray-300' />
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Ayomide Alibaba</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Admin</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Admin Officer</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>21st June, 2024</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>IT Department Template</p>
                  </td>
                  <td className='p-4'>
                    <div className='cursor-pointer border rounded-lg w-max p-1'>
                      <PiDotsThreeVerticalBold />
                    </div>
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

export default NewHireList;
