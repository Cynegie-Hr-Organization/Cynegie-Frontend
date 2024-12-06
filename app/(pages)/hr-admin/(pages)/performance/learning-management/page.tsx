"use client"

import AppButton from "@/app/_components/shared/button"
import Link from "next/link"
import LearningManagementTable from "./table"
import { useRouter } from "next/dist/client/components/navigation"
import { DrawerDialog } from "@/components/drawer/modal"
import { AppSelect } from "@/app/_components/shared/select"
import InputText, { InputTextArea } from "@/app/_components/shared/input-text"
import { ReactNode, useState } from "react"
import { AppDatePicker } from "@/app/_components/shared/date-picker"
import { DialogTitle } from "@/components/ui/dialog"
import AppRadio from "@/app/_components/shared/radio"
import { AppFileUpload } from "@/app/_components/shared/file-upload"

const SelfAssessmentPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Management"
        description="Access employee training summary in your organization"
        buttonLabel="Assign Course"
      />

      <LearningManagementTable />
    </div>
  )
}


const PageHeader = ({ title, description, buttonLabel }: { title: string, description: string, buttonLabel: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <AssignCourseModal trigger={<AppButton label={buttonLabel} className="btn-primary w-full" />} />
    </div>
  )
}


const AssignCourseModal = ({ trigger }: { trigger: ReactNode }) => {
  const [formData, setFormData] = useState({
    assessmentName: "",
    department: "",
    employees: [""],
    startDate: "",
    endDate: "",
    uploadCourse: false,
    externalLink: false,
  })

  return <DrawerDialog trigger={trigger}
    header={
      <DialogTitle>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-black">Assign Course</h3>
          <p className="text-sm text-gray-500">Fill the details below</p>
        </div>
      </DialogTitle>
    }
    footer={
      <div className="flex justify-center gap-2">
        <AppButton label="Cancel" className="btn-secondary" />
        <AppButton label="Assign Course" className="btn-primary" />
      </div>
    }
  >
    <div className="grid gap-6 py-4">
      <AppSelect
        listItems={[
          { label: "Department 1", value: "department-1" },
          { label: "Department 2", value: "department-2" },
          { label: "Department 3", value: "department-3" },
        ]}
        label="Employee Name"
        placeholder="Employee Name"
        onChange={(value) => setFormData({ ...formData, department: value })}
      />
      <InputText
        label="Course Title"
        placeholder="Course Title"
        value={formData.assessmentName}
        id="course-title"
        onChange={(e) => setFormData({ ...formData, assessmentName: e.target.value })}
      />
      <InputTextArea
        label="Course Description"
        placeholder="Course Description"
        value={formData.assessmentName}
        id="course-title"
        onChange={(e) => setFormData({ ...formData, assessmentName: e.target.value })}
      />

      <div className="flex flex-col gap-4">
        <AppRadio
          id="upload-course"
          label="Upload course"
          checked={formData.uploadCourse}
          onChange={(value) => setFormData({
            ...formData,
            uploadCourse: (value as boolean),
            externalLink: false
          })}
        />

        <AppRadio
          id="external-link"
          label="External Link"
          checked={formData.externalLink}
          onChange={(value) => setFormData({
            ...formData,
            externalLink: (value as boolean),
            uploadCourse: false
          })}
        />
      </div>

      {formData.uploadCourse && (
        <div>
          <AppFileUpload onChange={(files) => console.log(files)} />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <AppDatePicker
          label="Start Date"
          placeholder="Select Date"
          selectedDate={formData.startDate ? new Date(formData.startDate) : new Date()}
          setSelectedDate={(value) => setFormData({ ...formData, startDate: value?.toISOString() ?? "" })}
        />

        <AppDatePicker
          label="End Date"
          placeholder="Select Date"
          selectedDate={formData.endDate ? new Date(formData.endDate) : new Date()}
          setSelectedDate={(value) => setFormData({ ...formData, endDate: value?.toISOString() ?? "" })}
        />
      </div>

    </div>
  </DrawerDialog>
}

export default SelfAssessmentPage