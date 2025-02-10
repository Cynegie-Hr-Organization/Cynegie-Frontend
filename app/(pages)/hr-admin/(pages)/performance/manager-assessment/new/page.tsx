/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { createAssessment } from "@/app/api/services/performance/assessments";
import { getTemplates } from "@/app/api/services/performance/template";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    <div className="h-6 bg-gray-300 rounded w-full"></div>
  </div>
);

const ManagerAssessmentPage = () => {
  const router = useRouter();

  const { employees, isFetching: isFetchingEmp } = useFetchEmployees();

  const [templates, setTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<{
    assessmentName: string;
    manager: string;
    employees: string[];
    dueDate: string;
    template: string;
    type: string;
  }>({
    assessmentName: "",
    manager: "",
    employees: [],
    dueDate: "",
    template: "",
    type: "MANAGER",
  });

  const validateForm = () => {
    const { assessmentName, employees, dueDate, template } = formData;
    return assessmentName.trim() && employees.length > 0 && dueDate && template;
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getTemplates();
        if (response.status === 200) {
          setTemplates(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createAssessment(formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Assessment created successfully!");
        router.push("/hr-admin/performance/manager-assessment");
      } else {
        toast.error("Failed to create assessment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewTemplate = () => {
    if (!formData.template) {
      toast.error("Please select a template to preview.");
      return;
    }
    router.push(`/hr-admin/performance/template-preview/${formData.template}`);
  };

  return (
    <div className="space-y-8">
      <p className="text-lg font-semibold">New Manager Assessment</p>

      <CardLayout bg="bg-white p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <p className="text-lg font-semibold">Assessment Details</p>

          {loadingTemplates || isFetchingEmp ? (
            <SkeletonLoader />
          ) : (
            <div className="grid gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <AppInputText
                  label="Assessment Name"
                  placeholder="Enter Name"
                  value={formData.assessmentName}
                  id="assessment-name"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assessmentName: e.target.value,
                    })
                  }
                />
                <AppMultipleSelect
                  label="Manager"
                  placeholder="Select Manager"
                  items={employees.map((emp: any) => ({
                    label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                    value: emp.id as string,
                  }))}
                  selectedValues={formData.manager ? [formData.manager] : []}
                  onSelectionChange={(values: string[]) =>
                    setFormData({
                      ...formData,
                      manager: values[0] || "",
                    })
                  }
                  width="w-full"
                  noResultsText="No Manager found"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <AppMultipleSelect
                  label="Assign Employees"
                  placeholder="Assign Employees"
                  items={employees.map((emp: any) => ({
                    label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                    value: emp.id as string,
                  }))}
                  selectedValues={formData.employees}
                  onSelectionChange={(values: string[]) =>
                    setFormData({
                      ...formData,
                      employees: [...new Set(values)],
                    })
                  }
                  width="w-full"
                  noResultsText="No Employees found"
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
                      dueDate: value?.toISOString() || "",
                    })
                  }
                />
              </div>

              <AppMultipleSelect
                label="Template"
                placeholder="Select Template"
                items={templates.map((template) => ({
                  label: template.templateName,
                  value: template.id,
                }))}
                selectedValues={formData.template ? [formData.template] : []}
                onSelectionChange={(values: string[]) =>
                  setFormData({
                    ...formData,
                    template: values[0] || "",
                  })
                }
                width="w-full"
                noResultsText="No Templates found"
              />
            </div>
          )}

          <AppButton
            label="Preview"
            className="font-bold py-0 px-0 w-max md:w-max disabled:text-gray-500 text-primary"
            onClick={previewTemplate}
          />
        </div>
      </CardLayout>

      <div className="flex flex-col md:flex-row justify-end gap-4">
        <AppButton
          label="Save & Continue Later"
          className="btn-secondary"
          onClick={() => {}}
        />
        <AppButton
          label="Submit"
          className="btn-primary w-full md:w-[230px]"
          onClick={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ManagerAssessmentPage;
