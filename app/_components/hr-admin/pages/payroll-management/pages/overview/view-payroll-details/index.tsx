"use client";

import SvgIcon from "@/app/_components/icons/container";
import DetailGroup from "@/app/_components/shared/detail-group";
import Page from "@/app/_components/shared/page";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { icon, route } from "@/constants";
import { getHumanReadableDateRange } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { viewPayroll } from "../api";

type MappedEmployee = {
  employeeName: string;
  department: string;
  grossPay: string;
  deduction: string;
  netPay: string;
  overtimePay: string;
  status: string;
};

const ViewPayrollDetailsPage = () => {
  const { slug } = useParams();
  const router = useRouter();

  const { data: payrollData } = useQuery({
    queryKey: ["payroll", slug],
    ...(typeof slug === "string" && { queryFn: () => viewPayroll(slug) }),
  });

  const [employees, setEmployees] = useState<MappedEmployee[]>();

  useEffect(() => {
    if (payrollData) {
      setEmployees(
        payrollData.data.employeesInfo?.map((employee) => ({
          employeeName: `${employee.employeeInfo.personalInfo.firstName} ${employee.employeeInfo.personalInfo.lastName}`,
          department: employee.employeeInfo.employmentInformation,
          grossPay: "N/A",
          deduction: "N/A",
          netPay: "N/A",
          overtimePay: "N/A",
          status: "pending",
        }))
      );
    } else {
      setEmployees(undefined);
    }
  }, [payrollData]);
  return (
    <Page
      backText="Back to Payroll Management"
      onBackTextClick={() => router.push(route.hrAdmin.payroll.overview.home)}
      title="Payroll Details"
    >
      <DetailGroup
        loading={payrollData ? false : true}
        isCard
        gridItemSize={{ xs: 12, sm: 3, md: 4, lg: 2 }}
        details={[
          {
            name: "Payroll Name",
            value: payrollData?.data.payrollName,
          },
          {
            name: "Payroll Period",
            value: getHumanReadableDateRange(
              payrollData?.data.startDate,
              payrollData?.data.endDate
            ),
          },
          {
            name: "Approval Date",
            value: dayjs(payrollData?.data.approvalDate).format("MMM DD YYYY"),
          },
          {
            name: "Payment Date",
            value: dayjs(payrollData?.data.paymentDate).format("MMM DD YYYY"),
          },
          {
            name: "Status",
            value: payrollData?.data?.status,
            type: "status",
            statusMap: { pending: "warning" },
          },
        ]}
      />
      <CardGroup
        cardValueBelow
        gridItemSize={{ xs: 12, sm: 6, md: 4, lg: 4 }}
        cards={[
          {
            hasIcon: true,
            icon: <SvgIcon path={icon.userGroupTwo} width={16} height={16} />,
            iconColorVariant: "purple",
            labelText: "Total Employees",
            value: `${payrollData?.data?.totalEmployees}`,
          },
          {
            hasIcon: true,
            icon: <SvgIcon path={icon.paperMoney} width={16} height={16} />,
            iconColorVariant: "success",
            labelText: "Total Gross Pay",
            value: `₦${payrollData?.data?.totalGrossPay}`,
          },
          {
            hasIcon: true,
            icon: <SvgIcon path={icon.paperMoney} width={16} height={16} />,
            iconColorVariant: "grey",
            labelText: "Total Net Pay",
            value: `₦${payrollData?.data?.totalNetPay}`,
          },
        ]}
      />
      <Table
        title="Employees in Payroll"
        headerRowData={[
          "Employee Name",
          "Department",
          "Gross Pay",
          "Deduction",
          "Net Pay",
          "Overtime Pay",
          "Status",
        ]}
        fieldTypes={[...Array(6).fill(FieldType.text), FieldType.status]}
        displayedFields={[
          "employeeName",
          "department",
          "grossPay",
          "deduction",
          "netPay",
          "overtimePay",
          "status",
        ]}
        bodyRowData={employees}
        statusMap={{ pending: "warning" }}
      />
    </Page>
  );
};

export default ViewPayrollDetailsPage;
