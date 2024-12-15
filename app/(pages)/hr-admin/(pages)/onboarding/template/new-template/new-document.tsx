"use client";

import { LuListFilter, LuPlusCircle } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { Avatar } from "@mui/material";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { ReusableSelect } from "./components/ReusableSelect";
import { CiCalendarDate } from "react-icons/ci";
import { ReactNode } from "react";
import { DrawerDialog } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const NewDocument = () => {
  return (
    <div className="flex flex-col bg-gray-50 p-3">
      <div className="flex items-center justify-between mb-[13px]">
        <p className="text-sm font-semibold mb-1">
          Uploaded Documents <span className="text-gray-400">(0)</span>
        </p>

        <AddDocumentModal>
          <button className="capitalize flex items-center justify-center gap-x-2 outline-none border-none bg-primary text-white rounded-lg px-[12.33px] py-[9px] font-bold">
            <span> Add Document</span>
            <LuPlusCircle />
          </button>
        </AddDocumentModal>
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
    <div className="bg-white rounded-lg h-20 w-full">
      <div className="p-[14px] flex items-start justify-between">
        <ViewTaskModal>
          <div className="cursor-pointer">
            <p className="font-semibold">Employee Handbook</p>

            <p className="flex items-center text-xs font-medium text-[#64748B]">
              A comprehensive guide to company policies, procedures, and
              employee benefits.
            </p>
          </div>
        </ViewTaskModal>
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

      <PopoverContent className="w-40 bg-white space-y-2 cursor-pointer rounded-lg flex flex-col items-start text-[#475367]">
        <EditDocumentModal triggers={<button>Edit Document</button>} />
        <button className="text-red-500">Delete Document</button>
      </PopoverContent>
    </Popover>
  );
}

function AddDocumentModal({ children }: { children: ReactNode }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove),
    );
  };

  return (
    <DrawerDialog
      trigger={children}
      header={
        <DialogTitle className="">
          <p className="font-semibold">Add Document</p>
          <p className="font-normal text-sm">Add and create document</p>
        </DialogTitle>
      }
      footer={
        <button className="capitalize w-full mt-5 gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold">
          Add Document
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
          <p className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block font-semibold text-sm mb-1">
            Document Upload
          </p>

          <div className="flex flex-col border-dashed border-2 outline-none rounded-lg p-2 relative">
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#E6EBF9] rounded-full p-1 text-xs"
                >
                  <span className="mr-2 truncate max-w-[150px] ml-1">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(file)}
                    className="text-primary hover:text-primary"
                  >
                    <IoCloseCircle size={20} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="flex items-center justify-center text-center cursor-pointer outline-none border-none"
              onClick={() =>
                document.getElementById("document-upload")?.click()
              }
            >
              {selectedFiles.length === 0 ? (
                <p className='text-sm text-gray-500'>
                  click to upload
                </p>
              ) : (
                <p className="text-sm text-primary mt-2">+ Add more files</p>
              )}
            </button>

            <input
              id="document-upload"
              name="document-upload"
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <p className="text-xs mt-2">
            Supported file types: PDF. Max file size allowed is 3MB.
          </p>
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
    </DrawerDialog>
  );
}

export function EditDocumentModal({ triggers }: { triggers: ReactNode }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove),
    );
  };
  return (
    <DrawerDialog
      trigger={triggers}
      header={
        <DialogTitle>
          <p>Edit Document</p>
          <p className="font-normal text-sm">Edit and update document</p>
        </DialogTitle>
      }
      footer={
        <button className="capitalize w-full mt-5 gap-x-2 outline-none border border-gray-400 bg-gray-300 rounded-lg px-[12.33px] py-[9px] font-bold">
          Edit Document
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
          <p className="after:content-['*'] after:ml-0.5 after:text-base after:text-red-500 block font-semibold text-sm mb-1">
            Document Upload
          </p>

          <div className="flex flex-col border-dashed border-2 outline-none rounded-lg p-2 relative">
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#E6EBF9] rounded-full p-1 text-xs"
                >
                  <span className="mr-2 truncate max-w-[150px] ml-1">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(file)}
                    className="text-primary hover:text-primary"
                  >
                    <IoCloseCircle size={20} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="flex items-center justify-center text-center cursor-pointer outline-none border-none"
              onClick={() =>
                document.getElementById("document-upload")?.click()
              }
            >
              {selectedFiles.length === 0 ? (
                <p className='text-sm text-gray-500'>
                 click to upload
                </p>
              ) : (
                <p className="text-sm text-primary mt-2">+ Add more files</p>
              )}
            </button>

            <input
              id="document-upload"
              name="document-upload"
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <p className="text-xs mt-2">
            Supported file types: PDF. Max file size allowed is 3MB.
          </p>
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
    </DrawerDialog>
  );
}

function ViewTaskModal({ children }: { children: ReactNode }) {
  return (
    <DrawerDialog
      trigger={children}
      header={
        <DialogTitle className="">
          <p className="font-semibold">View Task</p>
          <p className="font-normal text-sm">View task details</p>
        </DialogTitle>
      }
    >
      <>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Set Up Workstation</p>
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

        <div className="text-sm mt-8">
          <div className="flex flex-col">
            <label
              htmlFor="template-desc"
              className="text-sm font-semibold mb-1"
            >
              <span className="block font-semibold">Description</span>
            </label>
            <textarea
              name="template-desc"
              className="border-none focus:border outline-none rounded-lg p-2 resize-none placeholder:text-[#94A3B8]"
              placeholder="Add more details to this task..."
            />
          </div>
        </div>

        <div className="flex itemcenter text-sm mt-8 gap-x-4">
          <p className="font-semibold">Subtask</p>
          <button className="border-none outline-none text-primary">
            {" "}
            + Add
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex itemcenter justify-between text-sm mt-8 gap-x-4">
            <p className="font-semibold">Activity</p>
            <button className="border-none outline-none text-primary flex items-center justify-center gap-x-2">
              <LuListFilter /> Newest first
            </button>
          </div>
          <div className="flex gap-x-4">
            <Avatar src="/image/persons/person-1.png" />
            <label htmlFor="comment" className="hidden"></label>
            <div className="w-full space-y-2">
              <input
                name="comment"
                type="text"
                className="border outline-none rounded-lg p-2 w-full"
                placeholder="Add a comment..."
              />
              <p className="font-normal">
                <span className="font-semibold">Pro tip:</span> press{" "}
                <span className="font-semibold">M</span> to comment
              </p>
            </div>
          </div>
        </div>
      </>
    </DrawerDialog>
  );
}

export default NewDocument;
