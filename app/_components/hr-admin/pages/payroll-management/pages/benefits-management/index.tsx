"use client";

import Modal from "@/app/_components/employee/modal";
import SvgIcon from "@/app/_components/icons/container";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import Toast from "@/app/_components/shared/toast";
import { icon } from "@/constants";
import { FetchParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBenefit, AddBenefitPayload, getBenefits } from "./api";

type MappedBenefit = {
  id: string;
  benefitName: string;
  benefitType: string;
  employeesEnrolled: number;
  pendingApprovals: number;
};

const HrAdminPayrollBenefitsManagementPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showAddBenefitsModal, setShowAddBenefitsModal] = useState(false);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [benefits, setBenefits] = useState<MappedBenefit[]>();
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
    search: "",
  });

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

  const startDate = watch("startDate");
  const endDate = watch("End Date");

  const { data: benefitsData } = useQuery({
    queryKey: ["benefits", fetchParams],
    queryFn: () => getBenefits(fetchParams),
  });

  const addBenefitMutation = useMutation({
    mutationFn: (payload: AddBenefitPayload) => addBenefit(payload),
    onMutate: () => setMutationLoading(true),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["benefits"] });
      setMutationLoading(false);
      setShowAddBenefitsModal(false);
      setShowToast(true);
      reset();
    },
    onError: () => {
      setMutationLoading(false);
    },
  });

  useEffect(() => {
    if (benefitsData) {
      setBenefits(
        benefitsData.data.map((benefitData) => ({
          id: benefitData.id,
          benefitName: benefitData.name,
          benefitType: benefitData.benefitType,
          employeesEnrolled: benefitData.employees.length,
          pendingApprovals: 0,
        }))
      );
    } else {
      setBenefits(undefined);
    }
  }, [benefitsData]);

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
      <Table
        hasActionsColumn
        headerRowData={[
          "Benefit Name",
          "Benefit Type",
          "Employees Enrolled",
          "Pending Approvals",
        ]}
        fieldTypes={Array(4).fill(FieldType.text)}
        displayedFields={[
          "benefitName",
          "benefitType",
          "employeesEnrolled",
          "pendingApprovals",
        ]}
        bodyRowData={benefits}
        actions={[
          {
            name: "View Details",
            onClick: () => {},
            onDataReturned: (id) =>
              router.push(`hr-admin/payroll/benefits/view/${id}`),
          },
          {
            name: "Enroll Employees",
            onClick: () => {},
            onDataReturned: (id) =>
              router.push(`hr-admin/payroll/benefits/enroll/${id}`),
          },
        ]}
        onSearch={(query) =>
          setFetchParams((prev) => ({ ...prev, search: query }))
        }
        paginationMeta={{
          ...benefitsData?.meta,
          itemsOnPage: benefits?.length,
          onChangeLimit: (limit) =>
            setFetchParams((prev) => ({ ...prev, limit: limit })),
          onNextClick: () =>
            setFetchParams((prev) => ({ ...prev, page: prev.page + 1 })),
          onPrevClick: () =>
            setFetchParams((prev) => ({ ...prev, page: prev.page - 1 })),
          loading: benefits ? false : true,
        }}
      />
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
