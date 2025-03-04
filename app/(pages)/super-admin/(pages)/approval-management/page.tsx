"use client";

import ApprovalManagementTable from "@/app/(pages)/super-admin/(pages)/approval-management/table";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { Suspense } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ApprovalManagementPage = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <div className="space-y-8 py-6">
        <div>
          <PageHeader
            title="Approval Management"
            description="Access employee training summary in your organization"
            button1Label="Reject All"
            button2Label="Approve All"
          />
        </div>

        <div>
          <ApprovalManagementTable />
        </div>
      </div>
    </Suspense>
  );
};

const PageHeader = ({
  title,
  description,
  button1Label,
  button2Label,
}: {
  title: string;
  description: string;
  button1Label: string;
  button2Label: string;
}) => {
  return (
    <div className="flex justify-between items-center gap-x-4 md:gap-x-0">
      <div className="">
        <h1 className="text-base font-bold text-gray-900">{title}</h1>
        <p className="md:text-xs text-gray-500">{description}</p>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <AppButton
          label={button1Label}
          className="border-2 border-red-600 w-full text-sm text-red-500"
        />
        <AppButton
          label={button2Label}
          className=" btn-primary w-full text-sm text-white"
        />
      </div>
      <AppDropdownMenu
        width="w-[190px]"
        trigger={
          <button
            type="button"
            className="text-gray-500 font-semibold flex gap-2 items-center border rounded-lg px-4 py-2 md:hidden"
          >
            Action <IoIosArrowDown size={24} />
          </button>
        }
        menuItems={
          <div>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">
              Approve All
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">
              Reject All
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">
              View Details
            </button>
          </div>
        }
      />
    </div>
  );
};

export default ApprovalManagementPage;
