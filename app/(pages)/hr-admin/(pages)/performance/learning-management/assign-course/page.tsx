"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewSelfAssessmentPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    assessmentName: "",
    department: "",
    employees: [""],
    dueDate: "",
    template: "",
  });

  return (
    <div className="space-y-8">
      <h1 className="text-lg font-semibold">New Assessment</h1>

      <CardLayout bg="bg-white p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold">Course Details</h2>

          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <AppInputText
                label="Assessment Name"
                placeholder="Enter Name"
                value={formData.assessmentName}
                id="assessment-name"
                onChange={(e) =>
                  setFormData({ ...formData, assessmentName: e.target.value })
                }
              />

              <AppSelect
                listItems={[
                  { label: "Department 1", value: "department-1" },
                  { label: "Department 2", value: "department-2" },
                  { label: "Department 3", value: "department-3" },
                ]}
                label="Department"
                placeholder="Department"
                onChange={(value) =>
                  setFormData({ ...formData, department: value })
                }
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
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    employees: [...formData.employees, value],
                  })
                }
              />

              <AppDatePicker
                label="Due Date"
                placeholder="Select Date"
                selectedDate={
                  formData.dueDate ? new Date(formData.dueDate) : new Date()
                }
                setSelectedDate={(value) =>
                  setFormData({
                    ...formData,
                    dueDate: value?.toISOString() ?? "",
                  })
                }
              />
            </div>

            <AppSelect
              listItems={[
                { label: "Template 1", value: "template-1" },
                { label: "Template 2", value: "template-2" },
                { label: "Template 3", value: "template-3" },
              ]}
              label="Template"
              placeholder="Select Template"
              onChange={(value) =>
                setFormData({ ...formData, template: value })
              }
            />
          </div>

          <AppButton
            label="Preview"
            className="font-bold py-0 px-0 w-max md:w-max disabled:text-gray-500 text-primary"
            onClick={() => {
              router.push(
                "/hr-admin/performance/self-assessment/template-preview",
              );
            }}
          />
        </div>
      </CardLayout>

      <div className="flex flex-col md:flex-row justify-end gap-4">
        <AppButton
          label="Save & Continue Later"
          className="btn-secondary"
          onClick={() => { }}
        />
        <AppButton
          label="Submit"
          className="disabled:btn-inactive btn-primary"
          onClick={() => {
            router.push("/hr-admin/performance/self-assessment");
          }}
        />
      </div>
    </div>
  );
};

export default NewSelfAssessmentPage;
