"use client";

import { DeleteSvg } from "@/app/_components/icons/custom-icons";
import { AppModal } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { LuPlusCircle, LuTrash } from "react-icons/lu";
import AppButton from "../../../../../_components/shared/button";
import { AppDropdownMenu } from "../../../../../_components/shared/dropdown-menu";
import ReviewTable from "./table";

const PerformanceGoalsPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader />
      <ReviewTable />
    </div>
  );
};

const PageHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-y-4">
      <div>
        <h3 className="text-xl font-bold text-black">Goals Management </h3>
        <p className="text-sm text-gray-500">
          Manage and track goals in your organization
        </p>
      </div>

      <div className="flex items-center gap-x-2">
        <AppDropdownMenu
          width="w-max "
          trigger={
            <button className="bg-white text-gray-500 border border-gray-400 flex items-center justify-center gap-x-2 capitalize outline-none rounded-lg px-[12.33px] py-[9px] font-bold ">
              Actions <IoIosArrowDown />
            </button>
          }
          menuItems={
            <div>
              <div className="lg:hidden flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1">
                <span>Add New Goal</span>
              </div>
              <div className="lg:hidden flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1">
                <span>Company wide Goals</span>
              </div>
              <div className="lg:hidden flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1">
                <span>Personal Goal</span>
              </div>
              <div className="lg:hidden flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1">
                <span>Team Goals</span>
              </div>
              <div className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1">
                <span>Edit Goals</span>
              </div>

              <div className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1">
                <button
                  onClick={() =>
                    router.push("/hr-admin/performance/goals/goal-detail")
                  }
                  className=""
                >
                  View Details
                </button>
              </div>

              <DeleteModal
                trigger={
                  <div className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1 text-red-500">
                    <span>Delete Goal</span>
                  </div>
                }
              />
            </div>
          }
        />

        <AppButton
          label="Add New Goal"
          rightIcon={<LuPlusCircle />}
          className="bg-primary text-white border border-primary lg:flex hidden"
          onClick={() => router.push("/hr-admin/performance/goals/create")}
        />
      </div>
    </div>
  );
};

const DeleteModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <AppModal
      trigger={trigger}
      header={
        <DialogTitle className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2">
              <span>Are you sure you want to delete this goal?</span>
              <span className="text-sm text-gray-400 max-w-[367px] text-center">
                Deleting this goal will remove all associated reviews, feedback,
                and data permanently
              </span>
            </span>
          </span>
        </DialogTitle>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full"
          />
          <AppButton
            label="Delete Goal"
            className="bg-red-700 text-white md:w-max w-full border border-red-700"
            leftIcon={<LuTrash />}
          />
        </div>
      }
    >
      <></>
    </AppModal>
  );
};

export default PerformanceGoalsPage;
