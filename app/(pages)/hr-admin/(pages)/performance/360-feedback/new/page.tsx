"use client"

import AppButton from "@/app/_components/shared/button"
import CardLayout from "@/app/_components/shared/cards"
import { AppDatePicker } from "@/app/_components/shared/date-picker"
import InputText from "@/app/_components/shared/input-text"
import { AppSelect } from "@/app/_components/shared/select"
import { useRouter } from "next/navigation"
import { useState } from "react"

const NewSelfAssessmentPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    assessmentName: "",
    employees: [""],
    dueDate: "",
    template: "",
    department: "",
    feedbackProviders: [""],
    startDate: "",
    endDate: "",
  })

  return (
    <div className="space-y-8">
      <h1 className="text-lg font-semibold">New 360 Feedback Cycle</h1>

      <CardLayout bg="bg-white p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold">Feedback Cycle Details</h2>

          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <InputText
                label="Feedback Cycle Name"
                placeholder="Enter Name"
                value={formData.assessmentName}
                id="assessment-name"
                onChange={(e) => setFormData({ ...formData, assessmentName: e.target.value })}
              />

              <AppSelect
                listItems={[
                  { label: "All", value: "all" },
                  { label: "Finance", value: "finance" },
                  { label: "Marketing", value: "marketing" },
                  { label: "Sales", value: "sales" },
                  { label: "Engineering", value: "engineering" },
                ]}
                label="Department"
                placeholder="Select Department"
                onChange={(value) => setFormData({ ...formData, department: value })}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <AppSelect
                listItems={[
                  { label: "Employee 1", value: "employee-1" },
                  { label: "Employee 2", value: "employee-2" },
                  { label: "Employee 3", value: "employee-3" },
                ]}
                label="Employees"
                placeholder="Select Employees"
                onChange={(value) => setFormData({ ...formData, employees: [...formData.employees, value] })}
              />
              <AppSelect
                listItems={[
                  { label: "All", value: "all" },
                  { label: "Manager", value: "manager" },
                  { label: "Peer", value: "peer" },
                  { label: "Self", value: "self" },
                ]}
                label="Feedback Providers"
                placeholder="Select Feedback Providers"
                onChange={(value) => setFormData({ ...formData, feedbackProviders: [...formData.feedbackProviders, value] })}
              />
            </div>

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


          <div className="flex gap-2 items-center">
            <input type="checkbox" id="anonymous-feedback" name="anonymous-feedback" />
            <label htmlFor="anonymous-feedback" className="text-sm text-gray-500">Enable anonymous feedback for this cycle</label>
          </div>
        </div>
      </CardLayout>

      <div className="flex flex-col md:flex-row justify-end gap-4">
        <AppButton
          label="Save & Continue Later"
          className="btn-secondary"
          onClick={() => { }}
        />
        <AppButton
          label="Next"
          className="disabled:btn-inactive btn-primary"
          onClick={() => { router.push("/hr-admin/performance/360-feedback/new/feedback") }}
        />
      </div>
    </div>
  )
}

export default NewSelfAssessmentPage