"use client";
import ButtonGroup from "@/app/_components/shared/button-group";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { FetchParams } from "@/types";
import { Divider, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyEmployees } from "../api";

type MappedEmployee = {
  id: string | null;
  name: string;
  department: string;
  grossPay: string;
  deduction: string;
  netPay: string;
};

const HrAdminCreatePayrollPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const [payrollName, setPayrollName] = useState("");
  const [payrollPeriod, setPayrollPeriod] = useState({
    startDate: "",
    endDate: "",
  });
  const [paymentDate, setPaymentDate] = useState("");

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

  const [employees, setEmployees] = useState<MappedEmployee[]>();

  const [checkedRows, setCheckedRows] = useState<MappedEmployee[]>([]);

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
            department: employee.employmentInformation.department,
            grossPay: `₦${0}`,
            deduction: `₦${0}`,
            netPay: `₦${0}`,
          }))
        );
      }
    }
  }, [myEmployeesData]);

  const enableButton = () => {
    if (
      payrollName.length != 0 &&
      checkedRows.length > 0 &&
      payrollPeriod.startDate.length != 0 &&
      payrollPeriod.endDate.length != 0 &&
      paymentDate.length != 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  //Mutation Payload
  // {
  //   payrollName: payrollName,
  //   startDate: payrollPeriod.startDate,
  //   endDate: payrollPeriod.endDate,
  //   status: "pending",
  //   paymentDate: paymentDate,
  //   employees: checkedRows.map((row) => row.id),
  // }

  return (
    <>
      {activeTab == 0 && (
        <Page
          backText="Back to Payroll Management"
          title="Create Payroll"
          onBackTextClick={() => router.push("/hr-admin/payroll/overview")}
        >
          <Form
            isCard
            gridItemSize={{ xs: 12, md: 4 }}
            gridSpacing={3}
            inputFields={[
              {
                name: "Payroll Name",
                type: "text",
                placeholder: "Enter",
                value: payrollName,
                setValue: setPayrollName,
              },
              {
                name: "Payroll Period",
                type: "date-range",
                getDateRange: (range) =>
                  setPayrollPeriod({
                    startDate: dayjs(range.startDate).format("YYYY-MM-DD"),
                    endDate: dayjs(range.endDate).format("YYYY-MM-DD"),
                  }),
                ...(payrollPeriod.startDate.length > 1 && {
                  dateRangeDefaultValue: [
                    dayjs(payrollPeriod.startDate).toDate(),
                    dayjs(payrollPeriod.endDate).toDate(),
                  ],
                }),
              },
              {
                name: "Payment Date",
                type: "date",
                defaultValue: paymentDate,
                getDate: (date) =>
                  setPaymentDate(dayjs(date).format("YYYY-MM-DD")),
              },
            ]}
          />
          <Table
            hasCheckboxes
            title="Select Employees for Payroll Cycle"
            headerRowData={[
              "Employee Name",
              "Department",
              "Gross Pay",
              "Deduction",
              "Net Pay",
            ]}
            fieldTypes={Array(5).fill(FieldType.text)}
            bodyRowData={employees}
            displayedFields={[
              "name",
              "department",
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
          backText="Back to Create Payroll"
          title="Review Payroll"
          onBackTextClick={() => setActiveTab(0)}
        >
          <Form
            isCard
            gridItemSize={{ xs: 12, md: 4 }}
            gridSpacing={3}
            inputFields={[
              {
                name: "Payroll Name",
                type: "text",
                placeholder: "Enter",
                value: payrollName,
                setValue: setPayrollName,
                disabled: true,
              },
              {
                name: "Payroll Period",
                type: "date-range",
                disabled: true,
                getDateRange: (range) =>
                  setPayrollPeriod({
                    startDate: dayjs(range.startDate).format("YYYY-MM-DD"),
                    endDate: dayjs(range.endDate).format("YYYY-MM-DD"),
                  }),
                placeholder: `${dayjs(payrollPeriod.startDate).format(
                  "DD MMM"
                )} - ${dayjs(payrollPeriod.endDate).format("DD MMM YYYY")}`,
              },
              {
                name: "Payment Date",
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
            fieldTypes={Array(10).fill(FieldType.text)}
            bodyRowData={myEmployeesData?.data
              .map((employee) => ({
                id: employee.id,
                name:
                  employee.personalInfo.firstName +
                  " " +
                  employee.personalInfo.lastName,
                department: employee.employmentInformation.department,
                grossPay: `₦${0}`,
                netPay: `₦${0}`,
                bonus: `₦${0}`,
                untaxedBonus: `₦${0}`,
                deductions: `₦${0}`,
                prorateDeductions: `₦${0}`,
                tax: `₦${0}`,
                overtime: employee.compensation.overtime,
              }))
              .filter((employee) =>
                checkedRows?.map((row) => row.id).includes(employee.id)
              )}
            displayedFields={[
              "name",
              "department",
              "grossPay",
              "netPay",
              "bonus",
              "untaxedBonus",
              "deductions",
              "prorateDeductions",
              "tax",
              "overtime",
            ]}
            onSearch={(query) =>
              setFetchParams({ ...fetchParams, search: query })
            }
            getCheckedRows={(rows) => setCheckedRows(rows)}
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
              N1,286,000.00
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
                { label: "Total Gross Pay", value: "N1,440,000.00" },
                { label: "Total Tax Deductions", value: "N144,000.00" },
                { label: "Total Pension Deductions", value: "N90,000.00" },
                { label: "Total Other Deductions", value: "N23,000.00" },
                { label: "Total Bonuses", value: "N62,000.00" },
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
                    {item.value}
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
                N1,286,000.00
              </div>
            </Stack>
          </Stack>
        </Page>
      )}
      <div className="mt-[-30] mb-10">
        <ButtonGroup
          leftButton={{
            type: ButtonType.outlined,
            text: "Save & Continue Later",
            onClick: () => {},
          }}
          rightButton={{
            type: enableButton() ? ButtonType.contained : ButtonType.disabled,
            text: "Continue",
            onClick: () => setActiveTab(activeTab + 1),
          }}
          position="end"
        />
      </div>
    </>
  );
};

export default HrAdminCreatePayrollPage;
