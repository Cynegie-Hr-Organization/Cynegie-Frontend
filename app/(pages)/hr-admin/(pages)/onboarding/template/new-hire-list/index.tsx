/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import React, { useState } from "react";
import CardLayout from "@/app/_components/shared/cards";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { useRouter } from "next/dist/client/components/navigation";
import AppMenubar from "@/app/_components/shared/menubar";






const TemplateTable = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Ayomide Alibaba",
      department: "Admin",
      position: "Admin Officer",
      startDate: "21st June, 2024",
      template: "Standard Onboarding Template",
    },
    {
      id: 2,
      name: "Ayomide Alibaba",
      department: "Admin",
      position: "Admin Officer",
      startDate: "21st June, 2024",
      template: "IT Department Template",
    },
    {
      id: 3,
      name: "Oluwatobi Johnson",
      department: "IT",
      position: "Software Engineer",
      startDate: "5th July, 2024",
      template: "Software Onboarding Template",
    },
    {
      id: 4,
      name: "Chiamaka Okoro",
      department: "HR",
      position: "HR Manager",
      startDate: "12th July, 2024",
      template: "HR Department Template",
    },
  ]);


  const handleDelete = (id: number) => {
    setTemplates((prevProspects) => prevProspects.filter((item) => item.id !== id));
  };

  return (
    <CardLayout className='bg-white overflow-x-scroll space-y-8' bg='p-4 md:p-6'>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
        </div>

        <button type="button" className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
          <LuListFilter /> Filter
        </button>
      </div>

      <div className='-mx-4 md:-mx-6'>
        <table className='w-full border-collapse'>
          <thead className='bg-[#F7F9FC]'>
            <tr>
              <th className='pl-4 md:pl-6 py-3 text-left'>
                <input type='checkbox' />
              </th>
              <th className="px-4 py-3 text-left">Template Name</th>
              <th className="px-4 py-3 text-left">Creator</th>
              <th className="px-4 py-3 text-left">Last Modified</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {templates.length === 0 ? (
              <tr>
                <td colSpan={5} className='text-center p-6'>
                  <p className="text-sm py-6 border border-dashed border-[#E4E7EC] rounded-lg">No templates available.</p>
                </td>
              </tr>
            ) : (
              templates.map((item) => (
                <tr key={item.id} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                  <td className='pl-4 md:pl-6 py-4'>
                    <input type='checkbox' className='border-gray-300' />
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>{item.template}</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>{item.name}</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>{item.startDate}</p>
                  </td>
                  <td className='p-4'>
                    <ActionMenu onDelete={() => handleDelete(item.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CardLayout>
  );
};

const ActionMenu = ({ onDelete }: { onDelete: () => void }) => {
  const router = useRouter();
  return (
    <AppMenubar
      menuItems={[
        <button className='w-full h-full text-left'>Edit Template</button>,
        <button className="w-full h-full text-left" onClick={() => router.push(`/hr-admin/onboarding/template/new-template/templateId`)}>Preview Template</button>,
        <button onClick={onDelete} className='text-red-500 w-full h-full text-left'>Delete Task</button>
      ]}>
      <PiDotsThreeVerticalBold />
    </AppMenubar>
  );
};

export default TemplateTable;
