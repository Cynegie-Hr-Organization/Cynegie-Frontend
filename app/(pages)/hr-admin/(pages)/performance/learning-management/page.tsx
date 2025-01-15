"use client";

import AppButton from "@/app/_components/shared/button";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import { AppFileUpload } from "@/app/_components/shared/file-upload";
import AppRadio from "@/app/_components/shared/radio";
import { assignCourse } from "@/app/api/services/performance/learning";
import { DrawerDialog } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LearningManagementTable from "./table";
import AppInputText, { AppInputTextArea } from "@/app/_components/shared/input-text";

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
  );
};

const PageHeader = ({
  title,
  description,
  buttonLabel,
}: {
  title: string;
  description: string;
  buttonLabel: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <AssignCourseModal
        trigger={
          <AppButton label={buttonLabel} className="btn-primary w-full" />
        }
      />
    </div>
  );
};

const AssignCourseModal = ({ trigger }: { trigger: ReactNode }) => {
  const { employees } = useFetchEmployees();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    employees: "",
    startDate: "",
    endDate: "",
    uploadCourse: false,
    externalLink: false,
    courseSource: "",
  });

  const handleSubmit = async () => {

    if (!formData.courseTitle || !formData.employees) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    try {
      const payload = {
        courseTitle: formData.courseTitle,
        courseDescription: formData.courseDescription,
        employee: formData.employees,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        courseSource: formData.uploadCourse ? "upload" : formData.courseSource,
      };

      console.log(payload);

      setIsSubmitting(true);

      const response = await assignCourse(payload);
      console.log(response);
      toast.success("Course assigned successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DrawerDialog
      trigger={trigger}
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
          <AppButton
            label="Cancel"
            className="btn-secondary"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          />
          <AppButton
            label={isSubmitting ? "Submitting..." : "Assign Course"}
            className="btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      }
      open={isOpen}
      setOpen={setIsOpen}
    >
      <div className="grid gap-6 py-4">
        <AppMultipleSelect
          label="Employee Name"
          placeholder="Select Employee"
          items={employees.map((emp: any) => ({
            label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
            value: emp.id as string,
          }))}
          selectedValues={formData.employees ? [formData.employees] : []}
          onSelectionChange={(values: string[]) =>
            setFormData({
              ...formData,
              employees: values[values.length - 1] || "",
            })
          }
          width="w-full"
          noResultsText="No employees found"
        />

        <AppInputText
          label="Course Title"
          placeholder="Course Title"
          value={formData.courseTitle}
          id="course-title"
          onChange={(e) =>
            setFormData({ ...formData, courseTitle: e.target.value })
          }
        />
        <AppInputTextArea
          label="Course Description"
          placeholder="Course Description"
          value={formData.courseDescription}
          id="course-description"
          onChange={(e) =>
            setFormData({ ...formData, courseDescription: e.target.value })
          }
        />

        <div className="flex flex-col gap-4">
          <AppRadio
            id="upload-course"
            label="Upload course"
            checked={formData.uploadCourse}
            onChange={(value) =>
              setFormData({
                ...formData,
                uploadCourse: value as boolean,
                externalLink: false,
                courseSource: "",
              })
            }
          />

          <AppRadio
            id="external-link"
            label="External Link"
            checked={formData.externalLink}
            onChange={(value) =>
              setFormData({
                ...formData,
                externalLink: value as boolean,
                uploadCourse: false,
              })
            }
          />
        </div>

        {formData.uploadCourse && (
          <div>
            <AppFileUpload onChange={(files) => console.log(files)} />
          </div>
        )}

        {formData.externalLink && (
          <AppInputText
            label="Course Source"
            placeholder="Enter course source URL"
            value={formData.courseSource}
            id="course-source"
            onChange={(e) =>
              setFormData({ ...formData, courseSource: e.target.value })
            }
          />
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <AppDatePicker
            label="Start Date"
            placeholder="Select Date"
            selectedDate={
              formData.startDate ? new Date(formData.startDate) : new Date()
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
              formData.endDate ? new Date(formData.endDate) : new Date()
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
    </DrawerDialog>
  );
};

export default SelfAssessmentPage;
