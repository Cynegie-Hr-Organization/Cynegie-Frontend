"use client";
import ButtonGroup from "@/app/_components/shared/button-group";
import Form from "@/app/_components/shared/form";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { route } from "@/constants";
import { PayrollSettings } from "@/types";
import { ChevronRight } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getPayrollSettings, setPayrollSettings } from "../overview/api";

const HrAdminPayrollSettingsPage = () => {
  const {
    register,
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm();

  const { data: payrollSettingsData } = useQuery({
    queryKey: ["payroll-settings"],
    queryFn: () => getPayrollSettings(),
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const queryLoading = payrollSettingsData ? false : true;
  const [mutationLoading, setMutationLoading] = useState(false);

  const payrollSettingsMutation = useMutation({
    mutationFn: (payload: PayrollSettings) => setPayrollSettings(payload),
    onMutate: () => setMutationLoading(true),
    onSuccess: (res) => {
      if (
        Object.keys(res).includes("error") ||
        res.statusCode === 500 ||
        res.statusCode === 401
      ) {
        alert("An error occured");
      } else {
        setMutationLoading(false);
        queryClient.resetQueries({ queryKey: ["payroll-settings"] });
        alert("Payroll settings edited successfully");
      }
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const sections = [
    "General",
    "Overtime",
    "Deduction and Contribution",
    "Leave",
    "Payroll Approval",
    "Prorated Payment",
  ];

  const fieldLabels = {
    general: {
      payPeriod: "Pay Period Setup",
      payDate: "Pay Date",
    },
    overtime: {
      rate: "Overtime Rate",
      maximumAllowed: "Maximum Overtime Allowed",
    },
    deductionAndContributions: {
      tax: "Tax Deductions",
      pension: "Pension Contributions",
      healthInsurance: "Health Insurance",
      transportation: "Transportation Allowance",
    },
    leave: {
      unpaid: "Unpaid Leave Deduction",
      sickLeavePolicies: "Sick Leave Policies",
    },
    approval: {
      levels: "Approval Levels",
      notifyApprovers: "Notify Approvers",
    },
    prorated: {
      rules: "Proration Rules",
      enable: "Enable Proration",
    },
  };

  const dropdownComponents = [
    <Form
      key={0}
      register={register}
      control={control}
      errors={errors}
      gridItemSize={{ xs: 12, sm: 6 }}
      gridSpacing={3}
      loading={queryLoading}
      inputFields={[
        {
          label: fieldLabels.general.payPeriod,
          type: "select",
          hookFormField: true,
          defaultValue: payrollSettingsData?.general.payPeriod,
          required: true,
          options: [
            {
              label: "Monthly",
              value: "monthly",
            },
            {
              label: "Biweekly",
              value: "biweekly",
            },
            {
              label: "Weekly",
              value: "weekly",
            },
            {
              label: "Semi Monthly",
              value: "semi_monthly",
            },
          ],
        },
        {
          label: fieldLabels.general.payDate,
          type: "date",
          required: true,
          hookFormField: true,
          defaultValue: payrollSettingsData?.general.payDate,
        },
      ]}
    />,
    <Form
      key={1}
      register={register}
      control={control}
      errors={errors}
      gridItemSize={{ xs: 12, sm: 6 }}
      gridSpacing={3}
      loading={queryLoading}
      inputFields={[
        {
          label: fieldLabels.overtime.rate,
          type: "text",
          required: true,
          defaultValue: payrollSettingsData?.overtime.rate.toString(),
          endAdornment: <p>NGN/hour</p>,
        },
        {
          label: fieldLabels.overtime.maximumAllowed,
          type: "select",
          required: true,
          hookFormField: true,
          defaultValue: payrollSettingsData?.overtime.maximumAllowed,
          options: [
            { label: "10 hours/week", value: 10 },
            { label: "15 hours/week", value: 15 },
            { label: "20 hours/week", value: 20 },
            { label: "Custom", value: "custom" },
          ],
        },
      ]}
    />,
    <Form
      key={2}
      register={register}
      control={control}
      errors={errors}
      gridItemSize={{ xs: 12, sm: 6 }}
      gridSpacing={3}
      loading={queryLoading}
      inputFields={[
        {
          label: fieldLabels.deductionAndContributions.tax,
          type: "text",
          required: true,
          placeholder: "Enter",
          defaultValue:
            payrollSettingsData?.deductionAndContributions.tax.toString(),
          endAdornment: <p>%</p>,
        },
        {
          label: fieldLabels.deductionAndContributions.pension,
          type: "text",
          required: true,
          placeholder: "Enter",
          defaultValue:
            payrollSettingsData?.deductionAndContributions.pension.toString(),
          endAdornment: <p>%</p>,
        },
        {
          label: fieldLabels.deductionAndContributions.healthInsurance,
          type: "text",
          required: true,
          placeholder: "Enter",
          defaultValue:
            payrollSettingsData?.deductionAndContributions.healthInsurance.toString(),
          endAdornment: <p>%</p>,
        },
        {
          label: fieldLabels.deductionAndContributions.transportation,
          type: "text",
          required: true,
          placeholder: "Enter",
          defaultValue:
            payrollSettingsData?.deductionAndContributions.transportation.toString(),
          endAdornment: <p>%</p>,
        },
      ]}
    />,
    <Form
      key={3}
      register={register}
      control={control}
      errors={errors}
      gridItemSize={{ xs: 12, sm: 6 }}
      gridSpacing={3}
      loading={queryLoading}
      inputFields={[
        {
          label: fieldLabels.leave.unpaid,
          type: "text",
          required: true,
          placeholder: "Enter",
          defaultValue: payrollSettingsData?.leave.unpaidDeduction.toString(),
          endAdornment: <p>%</p>,
        },
        {
          label: fieldLabels.leave.sickLeavePolicies,
          type: "text",
          required: true,
          placeholder: "Enter",
          defaultValue: payrollSettingsData?.leave.sickLeavePolicies,
        },
      ]}
    />,
    <Form
      key={4}
      register={register}
      control={control}
      errors={errors}
      gridItemSize={{ xs: 12 }}
      gridSpacing={3}
      loading={queryLoading}
      inputFields={[
        {
          label: fieldLabels.approval.levels,
          type: "multi-select",
          required: true,
          controllerRules: {
            required: true,
          },
          options: [
            { label: "Level 1 Finance Admin", value: "finance_admin" },
            { label: "Level 2 Super Admin", value: "super_admin" },
          ],
          hookFormField: true,
          defaultValue: payrollSettingsData?.approval.levels.map((level) => ({
            label:
              level === "finance_admin"
                ? "Level 1 Finance Admin"
                : "Level 2 Super Admin",
            value: level,
          })),
        },
        {
          label: fieldLabels.approval.notifyApprovers,
          type: "switch",
          defaultChecked: payrollSettingsData?.approval.notifyApprovers,
        },
      ]}
    />,
    <Form
      key={5}
      register={register}
      control={control}
      errors={errors}
      gridItemSize={{ xs: 12 }}
      gridSpacing={3}
      loading={queryLoading}
      inputFields={[
        {
          label: fieldLabels.prorated.rules,
          type: "text",
          required: true,
          placeholder: "Enter",
          defaultValue: payrollSettingsData?.proratedPayment.rules,
        },
        {
          label: fieldLabels.prorated.enable,
          type: "switch",
          defaultChecked: payrollSettingsData?.proratedPayment.enable,
        },
      ]}
    />,
  ];

  const dropdowns = [
    useState(true),
    useState(true),
    useState(true),
    useState(true),
    useState(true),
    useState(true),
  ];

  const onCancel = () => router.push(route.hrAdmin.payroll.overview.home);

  const onSave = () =>
    payrollSettingsMutation.mutateAsync({
      general: {
        payPeriod: getValues(fieldLabels.general.payPeriod),
        payDate: dayjs(getValues(fieldLabels.general.payDate)).toISOString(),
      },
      overtime: {
        rate: Number(getValues(fieldLabels.overtime.rate)),
        maximumAllowed: Number(getValues(fieldLabels.overtime.maximumAllowed)),
      },
      deductionAndContributions: {
        tax: Number(getValues(fieldLabels.deductionAndContributions.tax)),
        pension: Number(
          getValues(fieldLabels.deductionAndContributions.pension)
        ),
        healthInsurance: Number(
          getValues(fieldLabels.deductionAndContributions.healthInsurance)
        ),
        transportation: Number(
          getValues(fieldLabels.deductionAndContributions.transportation)
        ),
      },
      leave: {
        unpaidDeduction: Number(getValues(fieldLabels.leave.unpaid)),
        sickLeavePolicies: getValues(fieldLabels.leave.sickLeavePolicies),
      },
      approval: {
        levels: getValues(fieldLabels.approval.levels).map(
          (levels: { label: string; value: string }) => levels.value
        ),
        notifyApprovers: getValues(fieldLabels.approval.notifyApprovers),
      },
      proratedPayment: {
        rules: getValues(fieldLabels.prorated.rules),
        enable: getValues(fieldLabels.prorated.enable),
      },
    });

  const cancelButton = {
    type: mutationLoading ? ButtonType.disabled : ButtonType.outlined,
    text: "Cancel",
    onClick: onCancel,
  };

  const saveButton = {
    type: queryLoading
      ? ButtonType.disabled
      : isValid
      ? mutationLoading
        ? ButtonType.disabledLoading
        : ButtonType.contained
      : ButtonType.disabled,
    text: mutationLoading ? "" : "Save",
    onClick: onSave,
  };

  return (
    <Stack gap={4} mb={10} mt={6}>
      <div className="section-heading">Payroll Settings</div>
      <div style={{ padding: "30px" }} className="common-card">
        <Stack gap={2}>
          {sections.map((item, index) => {
            const [isOpen, setIsOpen] = dropdowns[index];

            return (
              <Stack
                sx={{
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  padding: "20px",
                }}
                key={index}
              >
                <Stack direction="row" alignItems="center" mb={isOpen ? 3 : 0}>
                  <div style={{ flexGrow: 1 }}>{`${item} Settings`}</div>
                  <ChevronRight
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                      transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
                      cursor: "pointer",
                    }}
                  />
                </Stack>
                {isOpen && <>{dropdownComponents[index]}</>}
              </Stack>
            );
          })}
        </Stack>
      </div>
      <ButtonGroup
        leftButton={cancelButton}
        rightButton={saveButton}
        position="end"
      />
    </Stack>
  );
};

export default HrAdminPayrollSettingsPage;
