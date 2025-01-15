/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { create360Feedback } from "@/app/api/services/performance/360-feedback";
import { getTemplates } from "@/app/api/services/performance/template";
import useFetchDepartment from "@/utils/usefetchDepartment";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

const MultiStepFeedbackForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    assessmentName: "",
    employees: [],
    dueDate: "",
    template: "",
    department: [],
    feedbackProviders: [],
    startDate: "",
    endDate: "",
    anonymousCycle: false,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      feedbackName: formData.assessmentName,
      employees: formData.employees,
      department: formData.department,
      feedbackProviders: formData.feedbackProviders,
      startDate: formData.startDate,
      endDate: formData.endDate,
      anonymousCycle: formData.anonymousCycle,
      feedbackDetails: [
        {
          feedbackNature: "PEER",
          template: formData.template,
        },
      ],
    };

    try {
      console.log(payload);
      const response = await create360Feedback(payload);
      console.log(response);
      if (response.status === 201) {
        toast.success("Feedback created successfully:", response.data);
        router.push("/hr-admin/performance/360-feedback");
      } else {
        toast.error("Failed to create feedback:", response);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback:");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {step === 1 && (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

const StepOne = ({ formData, setFormData, nextStep }: any) => {
  const { employees } = useFetchEmployees();
  const { department } = useFetchDepartment();

  return (
    <>
      <h1 className="text-lg font-semibold">New 360 Feedback Cycle</h1>
      <CardLayout bg="bg-white p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <p className="text-lg font-semibold">Feedback Cycle Details</p>
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <AppInputText
                label="Feedback Cycle Name"
                placeholder="Enter Name"
                value={formData.assessmentName}
                id="assessment-name"
                onChange={(e) =>
                  setFormData({ ...formData, assessmentName: e.target.value })
                }
              />
              <AppMultipleSelect
                label="Department"
                placeholder="Select Department"
                items={department.map((dept) => ({
                  label: dept.departmentName,
                  value: dept.id as string,
                }))}
                selectedValues={formData.department}
                onSelectionChange={(values: string[]) =>
                  setFormData({
                    ...formData,
                    department: [...new Set(values)],
                  })
                }
                width="w-full"
                noResultsText="No departments found"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <AppMultipleSelect
                label="Employees"
                placeholder="Select Employees"
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
                noResultsText="No employees found"
              />
              <AppMultipleSelect
                label="Feedback Providers"
                placeholder="Select Feedback Providers"
                items={employees.map((emp: any) => ({
                  label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                  value: emp.id as string,
                }))}
                selectedValues={formData.feedbackProviders}
                onSelectionChange={(values: string[]) =>
                  setFormData({
                    ...formData,
                    feedbackProviders: [
                      ...formData.feedbackProviders,
                      ...values,
                    ],
                  })
                }
                width="w-full"
                noResultsText="No feedback providers found"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <AppDatePicker
                label="Start Date"
                placeholder="Select Date"
                selectedDate={
                  formData.startDate ? new Date(formData.startDate) : undefined
                }
                setSelectedDate={(value) =>
                  setFormData({
                    ...formData,
                    startDate: value?.toISOString() ?? "",
                  })
                }
              />
              <AppDatePicker
                label="End Date"
                placeholder="Select Date"
                selectedDate={
                  formData.endDate ? new Date(formData.endDate) : undefined
                }
                setSelectedDate={(value) =>
                  setFormData({
                    ...formData,
                    endDate: value?.toISOString() ?? "",
                  })
                }
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="anonymous-feedback"
              name="anonymous-feedback"
              checked={formData.anonymousCycle}
              onChange={(e) =>
                setFormData({ ...formData, anonymousCycle: e.target.checked })
              }
            />
            <label
              htmlFor="anonymous-feedback"
              className="text-sm text-gray-500"
            >
              Enable anonymous feedback for this cycle
            </label>
          </div>
        </div>
      </CardLayout>
      <div className="flex flex-col md:flex-row justify-end gap-4">
        <AppButton
          label="Save & Continue Later"
          className="btn-secondary"
          onClick={() => { }}
        />
        <AppButton label="Next" className="btn-primary" onClick={nextStep} />
      </div>
    </>
  );
};

const StepTwo = ({
  formData,
  setFormData,
  prevStep,
  handleSubmit,
  isSubmitting,
}: any) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getTemplates();
        console.log(response);
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

  return (
    <>
      <h3 className="font-semibold text-lg">Feedback Criteria</h3>
      <CardLayout className="space-y-6">
        <CriteriaCard
          title="Peer Feedback"
          subtitle="Peers will review who they are selected for"
        >
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
                template: values[0],
              })
            }
            width="w-full"
            noResultsText="No templates found"
          />
        </CriteriaCard>
      </CardLayout>
      <div className="flex justify-between gap-4">
        <AppButton label="Back" className="btn-secondary" onClick={prevStep} />
        <AppButton
          label="Submit"
          className="btn-primary w-full md:w-[230px]"
          onClick={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </>
  );
};

const CriteriaCard = ({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) => {
  const router = useRouter();

  return (
    <div className="border border-gray-300 p-6 space-y-6">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div>{children}</div>
      <AppButton
        label="Preview"
        className="font-bold py-0 px-0 w-max md:w-max disabled:text-gray-500 text-primary"
        onClick={() => {
          router.push("/hr-admin/performance/self-assessment/template-preview");
        }}
      />
    </div>
  );
};

export default MultiStepFeedbackForm;
