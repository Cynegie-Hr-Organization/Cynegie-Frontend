"use client";
import Modal from "@/app/_components/employee/modal";
import Button from "@/app/_components/shared/button-group/button";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { route } from "@/constants";
import { FetchParams } from "@/types";
import { currencyFormatter, sum } from "@/utils";
import { Divider, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createPayroll,
  CreatePayrollPayload,
  editPayroll,
  getMyEmployees,
  getPayroll,
} from "../api";

type MappedEmployee = {
  id: string | null;
  name: string;
  departmentId: string;
  departmentName: string;
  grossPay: number;
  deduction: number;
  netPay: number;
};

const HrAdminCreatePayrollPage = ({
  editPayrollId,
}: {
  editPayrollId?: string;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const [payrollName, setPayrollName] = useState("");
  const [payrollPeriod, setPayrollPeriod] = useState(
    editPayrollId
      ? {
          startDate: dayjs().toISOString(),
          endDate: dayjs().toISOString(),
        }
      : { startDate: "", endDate: "" },
  );
  const [paymentDate, setPaymentDate] = useState(
    editPayrollId ? "0000-00-00" : "",
  );

  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
    search: undefined,
  });

  const { data: myEmployeesData } = useQuery({
    queryKey: ["myEmployees", fetchParams],
    queryFn: () => getMyEmployees(fetchParams),
  });

  const { data: selectedPayrollData } = useQuery({
    queryKey: ["payroll", editPayrollId],
    ...(editPayrollId && { queryFn: () => getPayroll(editPayrollId) }),
  });

  const [employees, setEmployees] = useState<MappedEmployee[]>();
  const [editEmployees, setEditEmployees] = useState<MappedEmployee[]>();

  const [checkedRows, setCheckedRows] = useState<
    (MappedEmployee | Record<string, any>)[]
  >([]);

  const [departmentFilter, setDepartmentFilter] = useState<string>();
  const [usedDepartmentFilter, setUsedDepartmentFilter] = useState<string>();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedPayrollData) {
      setPayrollName(selectedPayrollData.data.payrollName);
      setPayrollPeriod({
        startDate: dayjs(selectedPayrollData.data.startDate).format(
          "YYYY-MM-DD",
        ),
        endDate: dayjs(selectedPayrollData.data.endDate).format("YYYY-MM-DD"),
      });
      setPaymentDate(
        dayjs(selectedPayrollData.data.paymentDate).format("YYYY-MM-DD"),
      );
      if (employees) {
        setEditEmployees(employees);
        const employeeIds = selectedPayrollData.data.employees as string[];
        setCheckedRows(
          employees.filter((employee) =>
            employeeIds.includes(employee.id ?? ""),
          ),
        );
      }
    }
  }, [selectedPayrollData]);

  useEffect(() => {
    if (myEmployeesData) {
      if (myEmployeesData.data) {
        setEmployees(
          myEmployeesData.data.map((employee) => ({
            id: employee.id,
            name:
              employee.personalInfo.firstName +
              " " +
              employee.personalInfo.lastName,
            departmentId: employee.employmentInformation.department.id,
            departmentName:
              employee.employmentInformation.department.departmentName,
            grossPay: employee.grossPay,
            deduction: employee.totalDeductions,
            netPay: employee.netPay,
          })),
        );
      }
    }
  }, [myEmployeesData]);

  useEffect(() => {
    if (employees) {
      if (selectedPayrollData) {
        setEditEmployees(employees);
      }
    }
  }, [selectedPayrollData, employees]);

  const enableButton = () => {
    if (
      payrollName.length != 0 &&
      checkedRows.length > 0 &&
      payrollPeriod.startDate.length != 0 &&
      payrollPeriod.endDate.length != 0 &&
      paymentDate.length != 0 &&
      payrollPeriod.startDate != "Invalid Date" &&
      payrollPeriod.endDate != "Invalid Date" &&
      payrollPeriod.startDate <= payrollPeriod.endDate
    ) {
      return true;
    } else {
      return false;
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [createLoading, setCreateLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const createPayrollMutation = useMutation({
    mutationFn: (payload: CreatePayrollPayload) => createPayroll(payload),
    onMutate: () => setCreateLoading(true),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["payrolls"] });
      setCreateLoading(false);
      setOpenSuccessModal(true);
    },
    onError: () => {
      setCreateLoading(false);
    },
  });

  const editPayrollMutation = useMutation({
    mutationFn: (payload: CreatePayrollPayload) =>
      editPayroll(selectedPayrollData?.data.id ?? "", payload),
    onMutate: () => setCreateLoading(true),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["payrolls"] });
      queryClient.invalidateQueries({ queryKey: ["payroll", editPayrollId] });
      setCreateLoading(false);
      setOpenSuccessModal(true);
    },
    onError: () => {
      setCreateLoading(false);
    },
  });

  return (
    <div>
      {activeTab == 0 && (
        <Page
          backText="Back to Payroll Management"
          title={editPayrollId ? "Edit Payroll" : "Create Payroll"}
          onBackTextClick={() =>
            router.push(route.hrAdmin.payroll.overview.home)
          }
        >
          <Form
            isCard
            gridItemSize={{ xs: 12, md: 4 }}
            {...(editPayrollId && {
              loading: selectedPayrollData ? false : true,
            })}
            gridSpacing={3}
            inputFields={[
              {
                label: "Payroll Name",
                type: "text",
                placeholder: "Enter",
                value: payrollName,
                setValue: (arg) => {
                  if (typeof arg === "string" && arg !== undefined) {
                    setPayrollName(arg);
                  }
                },
              },
              {
                label: "Payroll Period",
                type: "date-range",
                getDateRange: (range) =>
                  setPayrollPeriod({
                    startDate: dayjs(range.startDate).format("YYYY-MM-DD"),
                    endDate: dayjs(range.endDate).format("YYYY-MM-DD"),
                  }),
                ...((editPayrollId || payrollPeriod.startDate.length > 1) && {
                  dateRangeValue: [
                    dayjs(payrollPeriod.startDate).toDate(),
                    dayjs(payrollPeriod.endDate).toDate(),
                  ],
                }),
              },
              {
                label: "Payment Date",
                type: "date",
                ...(editPayrollId
                  ? { value: paymentDate }
                  : { defaultValue: paymentDate }),
                getDate: (date) =>
                  setPaymentDate(dayjs(date).format("YYYY-MM-DD")),
              },
            ]}
          />
          <Table
            hasCheckboxes
            hasPagination={false}
            title="Select Employees for Payroll Cycle"
            headerRowData={[
              "Employee Name",
              "Department",
              "Gross Pay",
              "Deduction",
              "Net Pay",
            ]}
            fieldTypes={[
              ...Array(2).fill(FieldType.text),
              ...Array(3).fill(FieldType.naira),
            ]}
            bodyRowData={editPayrollId ? editEmployees : employees}
            displayedFields={[
              "name",
              "departmentName",
              "grossPay",
              "deduction",
              "netPay",
            ]}
            onSearch={(query) =>
              setFetchParams({ ...fetchParams, search: query })
            }
            getCheckedRows={(rows) => setCheckedRows(rows)}
            defaultCheckedRows={checkedRows}
          />
        </Page>
      )}
      {activeTab == 1 && (
        <Page
          backText={`Back to ${editPayrollId ? "Edit" : "Create"} Payroll`}
          title="Review Payroll"
          onBackTextClick={() => setActiveTab(0)}
        >
          <Form
            isCard
            gridItemSize={{ xs: 12, md: 4 }}
            gridSpacing={3}
            inputFields={[
              {
                label: "Payroll Name",
                type: "text",
                placeholder: "Enter",
                value: payrollName,
                setValue: (arg) => {
                  if (typeof arg === "string") setPayrollName(arg);
                },
                disabled: true,
              },
              {
                label: "Payroll Period",
                type: "date-range",
                disabled: true,
                getDateRange: (range) =>
                  setPayrollPeriod({
                    startDate: dayjs(range.startDate).format("YYYY-MM-DD"),
                    endDate: dayjs(range.endDate).format("YYYY-MM-DD"),
                  }),
                placeholder: `${dayjs(payrollPeriod.startDate).format(
                  "DD MMM",
                )} - ${dayjs(payrollPeriod.endDate).format("DD MMM YYYY")}`,
              },
              {
                label: "Payment Date",
                type: "date",
                value: paymentDate,
                getDate: (date) =>
                  setPaymentDate(dayjs(date).format("YYYY-MM-DD")),
                disabled: true,
              },
            ]}
          />
          <Table
            hasActionsColumn
            hasPagination={false}
            headerRowData={[
              "Employee Name",
              "Department",
              "Gross Pay",
              "Net Pay",
              "Bonus",
              "Untaxed Bonus",
              "Deductions",
              "Prorate Deduction",
              "Tax",
              "Overtime",
            ]}
            fieldTypes={[
              ...Array(2).fill(FieldType.text),
              ...Array(7).fill(FieldType.naira),
              FieldType.text,
            ]}
            bodyRowData={myEmployeesData?.data
              .map((employee) => ({
                id: employee.id,
                name:
                  employee.personalInfo.firstName +
                  " " +
                  employee.personalInfo.lastName,
                departmentId: employee.employmentInformation.department.id,
                departmentName:
                  employee.employmentInformation.department.departmentName,
                grossPay: employee.grossPay,
                netPay: employee.netPay,
                bonus: 0,
                untaxedBonus: 0,
                deductions: employee.totalDeductions,
                prorateDeductions: 0,
                tax: 0,
                overtime: employee.compensation.overtime,
              }))
              .filter((employee) =>
                checkedRows?.map((row) => row.id).includes(employee.id),
              )
              .filter((employee) =>
                employee.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .filter((employee) =>
                employee.departmentName
                  .toLowerCase()
                  .includes(usedDepartmentFilter?.toLowerCase() ?? ""),
              )}
            displayedFields={[
              "name",
              "departmentName",
              "grossPay",
              "netPay",
              "bonus",
              "untaxedBonus",
              "deductions",
              "prorateDeductions",
              "tax",
              "overtime",
            ]}
            onSearch={(query) => setSearchQuery(query)}
            formFilter={{
              inputFields: [
                {
                  label: "Department",
                  type: "select",
                  placeholder: departmentFilter,
                  value: departmentFilter,
                  setValue: (arg) => {
                    if (typeof arg === "string") setDepartmentFilter(arg);
                  },
                  selectValControlledFromOutside: true,
                  options: [...new Set(checkedRows)].map((employee) => ({
                    label: employee.departmentName,
                    value: employee.id,
                  })),
                },
              ],
            }}
            onFilterClick={() => setUsedDepartmentFilter(departmentFilter)}
            onResetClick={() => {
              setDepartmentFilter(undefined);
              setUsedDepartmentFilter(undefined);
            }}
            getCheckedRows={(rows) => setCheckedRows(rows)}
            actions={[
              { name: "Adjust Compenstation", onClick: () => {} },
              {
                name: "Remove Employee",
                onClick: () => {},
                onDataReturned: (id) =>
                  setCheckedRows(
                    checkedRows.filter((checkedRow) => checkedRow.id !== id),
                  ),
              },
            ]}
            fieldToReturnOnActionItemClick="id"
          />
        </Page>
      )}
      {activeTab == 2 && (
        <Page
          backText="Back to Payroll Review"
          onBackTextClick={() => setActiveTab(1)}
          title="Payroll Summary"
        >
          <Stack
            gap={2}
            sx={{
              backgroundColor: "#0035C3",
              borderRadius: "10px",
              padding: "30px",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 400, color: "#FFF" }}>
              Total Debit
            </div>
            <div style={{ fontSize: "28px", fontWeight: 500, color: "#FFF" }}>
              --
            </div>
          </Stack>
          <Stack className="common-card" px={4} gap={3} pt={5}>
            <div
              style={{ color: "#101928", fontWeight: 500, fontSize: "20px" }}
            >
              Detail Payment
            </div>
            <Stack gap={2}>
              {[
                {
                  label: "Total Gross Pay",
                  value: checkedRows.map((employee) => employee.grossPay),
                },
                { label: "Total Tax Deductions", value: "--" },
                { label: "Total Pension Deductions", value: "--" },
                { label: "Total Other Deductions", value: "--" },
                { label: "Total Bonuses", value: "--" },
              ].map((item, index) => (
                <Stack key={index} direction="row" alignItems="center">
                  <div
                    style={{
                      flexGrow: 1,
                      color: "#101928",
                      fontWeight: 400,
                      fontSize: "16px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: "#101928",
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    {typeof item.value === "string"
                      ? item.value
                      : currencyFormatter.format(sum(item.value))}
                  </div>
                </Stack>
              ))}
            </Stack>
            <Divider />
            <Stack direction="row" alignItems="center">
              <div
                style={{
                  flexGrow: 1,
                  color: "#101928",
                  fontWeight: 400,
                  fontSize: "16px",
                }}
              >
                Total Payroll Cost
              </div>
              <div
                style={{
                  color: "#101928",
                  fontWeight: 700,
                  fontSize: "28px",
                }}
              >
                --
              </div>
            </Stack>
          </Stack>
        </Page>
      )}
      <Page>
        <div className="flex justify-center sm:justify-end mt-[-70]">
          {/** TODO: Add Save and Continue Later Button */}
          <Button
            type={
              enableButton()
                ? createLoading
                  ? ButtonType.disabledLoading
                  : ButtonType.contained
                : ButtonType.disabled
            }
            text={
              activeTab < 2
                ? "Continue"
                : createLoading
                  ? ""
                  : editPayrollId
                    ? "Edit Payroll"
                    : "Finalize Payroll"
            }
            onClick={() => {
              if (activeTab < 2) {
                window.scrollTo({
                  top: 0,
                });
                setActiveTab(activeTab + 1);
              } else {
                if (editPayrollId) {
                  editPayrollMutation.mutateAsync({
                    payrollName: payrollName,
                    startDate: payrollPeriod.startDate,
                    endDate: payrollPeriod.endDate,
                    status: "pending",
                    paymentDate: paymentDate,
                    employees: checkedRows.map((row) => row.id),
                  });
                } else {
                  createPayrollMutation.mutateAsync({
                    payrollName: payrollName,
                    startDate: payrollPeriod.startDate,
                    endDate: payrollPeriod.endDate,
                    status: "pending",
                    paymentDate: paymentDate,
                    employees: checkedRows.map((row) => row.id),
                  });
                }
              }
            }}
          />
        </div>
      </Page>
      <Modal
        open={openSuccessModal}
        onClose={() => {}}
        hasHeading={false}
        centerImage="/icons/success-tick.svg"
        centerTitle="You're all set"
        centerMessage={` ${
          editPayrollId
            ? "The payroll has been"
            : `Payroll ${dayjs(payrollPeriod.startDate).format(
                "DD MMM",
              )} - ${dayjs(payrollPeriod.endDate).format(
                "DD MMM YYYY",
              )} has been`
        } ${editPayrollId ? " edited successfully" : "sent for approval"}`}
        centerButton
        buttonOne={{
          type: ButtonType.contained,
          text: "Back to Payroll Overview",
          onClick: () => router.push(route.hrAdmin.payroll.overview.home),
        }}
      />
    </div>
  );
};

export default HrAdminCreatePayrollPage;
