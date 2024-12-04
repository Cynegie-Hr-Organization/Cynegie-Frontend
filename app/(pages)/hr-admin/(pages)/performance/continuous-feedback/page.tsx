"use client"

import { LuPlusCircle, LuTrash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import ContinuousFeedbackTable from "./table";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import AppButton from "@/app/_components/shared/button";
import { DrawerDialog } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import InputText, { InputTextArea } from "@/app/_components/shared/input-text";
import { AppFileUpload } from "@/app/_components/shared/file-upload";

const ContinuousFeedbackPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader />
      <ContinuousFeedbackTable />
    </div>
  )
}


const PageHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-y-4">
      <div>
        <h3 className="text-xl font-bold text-black">Continuous Feedback</h3>
        <p className="text-sm text-gray-500">Manage Feedback of all employee in your organization</p>
      </div>

      <div className="flex items-center gap-x-2">
        <AppDropdownMenu
          width="w-max"
          trigger={
            <button className="bg-white text-gray-500 border border-gray-400 flex items-center justify-center gap-x-2 capitalize outline-none rounded-lg px-[12.33px] py-[9px] font-bold ">
              Actions <IoIosArrowDown />
            </button>
          }
          menuItems={
            <div className="p-2">
              <span className="lg:hidden flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">Add New Feedback</span>
              <RecognizeAchievementModal trigger={
                <span className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                  Recognize Achievement
                </span>
              } />
              <span className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">Personal Goal</span>
              <span className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">Team Goals</span>
              <span className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">Request Feedback</span>
              <DeleteModal trigger={
                <span className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 text-red-500">
                  Delete Feedback
                </span>
              } />
            </div>
          }
        />

        <AppButton
          label="Give Feedback"
          rightIcon={<LuPlusCircle />}
          className="bg-primary text-white border border-primary lg:flex hidden"
        // onClick={() => router.push("/hr-admin/performance/goals/create")}
        />
      </div>
    </div>
  )
}

const RecognizeAchievementModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={<DialogTitle className="text-lg font-bold text-center">
        <span className="flex flex-col items-center justify-center gap-y-2">
          <span>Recognize Achievement</span>
          <span className="text-sm text-gray-400 max-w-[367px] text-center">
            Fill the details below
          </span>
        </span>
      </DialogTitle>}
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton label="Cancel" className="btn-secondary" />
          <AppButton label="Submit" className="btn-inactive" />
        </div>
      }
    >
      <form action="">
        <div className="space-y-4">
          <InputText
            label="Employee"
            id="employee"
            placeholder="Select Employee"
            requiredField
            value={""}
            onChange={(e) => { }}
          />

          <InputText
            label="Recognition Type"
            id="recognition-type"
            placeholder="Select Recognition type"
            requiredField
            value={""}
            onChange={(e) => { }}
          />

          <InputText
            label="Date Of Recognition"
            id="date-of-recognition"
            placeholder="Select Date of Recognition"
            requiredField
            value={""}
            onChange={(e) => { }}
          />

          <InputTextArea
            label="Comments"
            id="comment"
            placeholder="Enter your comment here"
            requiredField
            value={""}
            onChange={(e) => { }}
          />

          <AppFileUpload
            label="Attachment"
            onChange={(e) => { }}
          />
        </div>
      </form>
    </DrawerDialog>
  )
}


const DeleteModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={<DialogTitle className="text-lg font-bold text-center">
        <span className="flex flex-col items-center justify-center gap-y-6">
          <DeleteSvg />
          <span className="flex flex-col items-center justify-center gap-y-2">
            <span>Are you sure you want to delete this feedback?</span>
            <span className="text-sm text-gray-400 max-w-[367px] text-center">
              Deleting this feedback will remove all associated reviews, feedback, and data permanently
            </span>
          </span>
        </span>
      </DialogTitle>}
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton label="Cancel" className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full" />
          <AppButton label="Delete Feedback" className="bg-red-700 text-white md:w-max w-full border border-red-700" leftIcon={<LuTrash />} />
        </div>
      }
    >
      <></>
    </DrawerDialog>
  )
}

const DeleteSvg = () => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="50" fill="#FBEAE9" />
      <rect x="7" y="7" width="86" height="86" rx="43" fill="#EB9B98" />
      <g opacity="0.7">
        <rect x="15" y="17" width="70" height="70" rx="35" fill="#D42620" />
        <path d="M40.9266 40.3329C40.2106 39.617 39.0498 39.617 38.3338 40.3329C37.6179 41.0489 37.6179 42.2097 38.3338 42.9257L47.4084 52.0002L38.3338 61.0747C37.6179 61.7907 37.6179 62.9515 38.3338 63.6675C39.0498 64.3834 40.2106 64.3834 40.9266 63.6675L50.0011 54.5929L59.0756 63.6675C59.7916 64.3834 60.9524 64.3834 61.6684 63.6675C62.3843 62.9515 62.3843 61.7907 61.6684 61.0747L52.5938 52.0002L61.6684 42.9257C62.3843 42.2097 62.3843 41.0489 61.6684 40.3329C60.9524 39.617 59.7916 39.617 59.0756 40.3329L50.0011 49.4075L40.9266 40.3329Z" fill="white" />
      </g>
    </svg>
  )
}

export default ContinuousFeedbackPage;