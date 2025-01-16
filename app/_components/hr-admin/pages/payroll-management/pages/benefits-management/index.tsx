"use client";

import Modal from "@/app/_components/employee/modal";
import SvgIcon from "@/app/_components/icons/container";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import Toast from "@/app/_components/shared/toast";
import { icon } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PayrollBenefitsManagementTable from "../../tables/benefits-management";
import { addBenefit, AddBenefitPayload } from "./api";

const HrAdminPayrollBenefitsManagementPage = () => {
  const router = useRouter();
  const [showAddBenefitsModal, setShowAddBenefitsModal] = useState(false);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm();

  const addBenefitMutation = useMutation({
    mutationFn: (payload: AddBenefitPayload) => addBenefit(payload), //TODO: Add Mutation Function
    onMutate: () => setMutationLoading(true),
    onSuccess: () => {
      setMutationLoading(false);
      setShowAddBenefitsModal(false);
      setShowToast(true);
      reset();
    },
    onError: () => {
      setMutationLoading(false);
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("End Date");

  useEffect(() => {
    if (startDate != undefined) {
      if (startDate >= endDate) {
        setError("Start Date", {
          message: "Start date cannot be later than end date",
        });
      } else {
        clearErrors("Start Date");
      }
    }
  }, [startDate, endDate]);

  return (
    <Page
      title="Benefits Management"
      hasButtons
      leftButton={{
        type: ButtonType.outlined,
        text: "Salary Advance",
        onClick: () => router.push("/hr-admin/payroll/salary-advance"),
      }}
      rightButton={{
        type: ButtonType.contained,
        text: "Add Benefits",
        onClick: () => setShowAddBenefitsModal(true),
      }}
    >
      <CardGroup
        cardLargeLabelText
        cardValueBelow
        gridItemSize={{ sm: 6, md: 3 }}
        cards={[
          {
            labelText: "Total Benefits",
            value: "10",
            icon: <SvgIcon path="/icons/group.svg" width={16} height={16} />,
            iconColorVariant: "purple",
          },
          {
            labelText: "Employees Enrolled",
            value: "250",
            icon: (
              <SvgIcon path="/icons/paper-money.svg" width={16} height={16} />
            ),
            iconColorVariant: "purple",
          },
          {
            labelText: "Pending Enrollments",
            value: "5",
            icon: (
              <SvgIcon path="/icons/paper-money.svg" width={16} height={16} />
            ),
            iconColorVariant: "purple",
          },
          {
            labelText: "Pending Approvals",
            value: "3",
            icon: (
              <SvgIcon path="/icons/paper-money.svg" width={16} height={16} />
            ),
            iconColorVariant: "purple",
          },
        ]}
      />
      <PayrollBenefitsManagementTable />
      {showAddBenefitsModal && (
        <Modal
          open={showAddBenefitsModal}
          onClose={
            mutationLoading
              ? () => {}
              : () => {
                  setShowAddBenefitsModal(false);
                  reset();
                }
          }
          title="New Benefit"
          onFormSubmit={handleSubmit((values) => {
            addBenefitMutation.mutateAsync({
              name: values["Benefit Name"],
              benefitType: values["Benefit Type"],
              departments: values["Department"].map(
                (department: { label: string; value: string }) =>
                  department.label
              ),
              employmentType: values["Employment Type"],
              jobLevel: values["Job Level"],
              startDate: dayjs(values["Start Date"]).toISOString(),
              endDate: dayjs(values["End Date"]).toISOString(),
              employerContribution: Number(values["Employer Contribution"]),
              employeeContribution: Number(values["Employee Contribution"]),
              status: "pending",
            });
          })}
          formRegister={register}
          formErrors={errors}
          formControl={control}
          forms={[
            {
              gridSpacing: 3,
              gridItemSize: { xs: 12, sm: 6, md: 4, lg: 4 },
              inputFields: [
                {
                  label: "Benefit Name",
                  type: "text",
                  placeholder: "Enter Name",
                  required: true,
                },
                {
                  label: "Benefit Type",
                  type: "select",
                  required: true,
                  placeholder: "Select Type",
                  options: [
                    { label: "Health", value: "health" },
                    { label: "Financial", value: "financial" },
                    { label: "Leave", value: "leave" },
                    { label: "Transportation", value: "transportation" },
                    { label: "Education", value: "education" },
                    { label: "Pension", value: "pension" },
                    { label: "Others", value: "others" },
                  ],
                  hookFormField: true,
                  controllerRules: {
                    required: "Benefit Type is required",
                  },
                },
                {
                  label: "Benefit Provider",
                  type: "text",
                  placeholder: "Enter Name",
                  required: true,
                },
              ],
            },
            {
              title: "Eligibility Criteria",
              gridSpacing: 3,
              gridItemSize: { xs: 12, sm: 6, md: 4, lg: 4 },
              inputFields: [
                {
                  label: "Department",
                  type: "multi-select",
                  placeholder: "Select Department",
                  options: [
                    { label: "Engineering", value: "engineering" },
                    { label: "Product", value: "product" },
                    { label: "Marketing", value: "marketing" },
                  ],
                  hookFormField: true,
                },
                {
                  label: "Employment Type",
                  type: "select",
                  placeholder: "Select Employment Type",
                  options: [
                    { label: "Full Time", value: "full-time" },
                    { label: "Part Time", value: "part-time" },
                    { label: "Contract Workers", value: "contract-workers" },
                  ],
                  hookFormField: true,
                },
                {
                  label: "Job Level",
                  type: "select",
                  placeholder: "Select Job Level",
                  options: [
                    { label: "Junior", value: "junior" },
                    { label: "Mid Level", value: "mid-level" },
                    { label: "Senior", value: "senior" },
                  ],
                  hookFormField: true,
                },
                {
                  label: "Start Date",
                  type: "date",
                  required: true,
                  hookFormField: true,
                  controllerRules: {
                    required: "Start date is required",
                  },
                },
                {
                  label: "End Date",
                  type: "date",
                  required: true,
                  hookFormField: true,
                  controllerRules: {
                    required: "End date is required",
                  },
                },
              ],
            },
            {
              title: "Contribution Details",
              gridSpacing: 3,
              gridItemSize: { xs: 12, sm: 6 },
              inputFields: [
                {
                  label: "Employer Contribution",
                  type: "text",
                  placeholder: "Enter Employer Contribution",
                },
                {
                  label: "Employee Contribution",
                  type: "text",
                  placeholder: "Enter Employer Contribution",
                },
              ],
            },
          ]}
          formButtonGroup={{
            leftButton: {
              type: mutationLoading ? ButtonType.disabled : ButtonType.outlined,
              text: "Cancel",
              onClick: () => {
                setShowAddBenefitsModal(false);
                reset();
              },
            },
            rightButton: {
              type: isValid
                ? mutationLoading
                  ? ButtonType.disabledLoading
                  : ButtonType.contained
                : ButtonType.disabled,
              text: mutationLoading ? "" : "Submit",
              onClick: () => {},
              isSubmit: true,
            },
            position: "center",
          }}
        />
      )}
      {showToast && (
        <Toast
          open={showToast}
          onClose={() => setShowToast(false)}
          icon={icon.checkCircle}
          type="success"
          status="Successful"
          message="Benefit has been successfully added"
        />
      )}
    </Page>
  );
};

export default HrAdminPayrollBenefitsManagementPage;
