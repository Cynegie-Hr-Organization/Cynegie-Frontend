"use client";

import SvgIcon from "@/app/_components/icons/container";
import Page from "@/app/_components/shared/page";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { icon } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBenefit } from "../api";

type MappedEmployee = {
  id: string;
  name: string;
  utilization: string;
  startDate: string;
  endDate: string;
};

const HrAdminViewPayrollBenefitPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { data: benefitData } = useQuery({
    queryKey: ["benefit", slug],
    ...(typeof slug === "string" && { queryFn: () => getBenefit(slug) }),
  });

  const [employees, setEmployees] = useState<MappedEmployee[]>();

  useEffect(() => {
    if (benefitData) {
      setEmployees(
        benefitData.benefit.employees.map((employee) => ({
          id: employee.id,
          name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
          utilization: `${
            benefitData.benefit.employeeContribution +
            benefitData.benefit.employerContribution
          }`,
          startDate: "N/A",
          endDate: "N/A",
        }))
      );
    } else {
      setEmployees(undefined);
    }
  }, [benefitData]);

  return (
    <Page
      backText="Back to Benefits"
      title={benefitData?.benefit.name}
      onBackTextClick={() =>
        router.push("/hr-admin/payroll/benefits-management")
      }
    >
      <CardGroup
        gridItemSize={{ xs: 12, md: 4 }}
        loading={benefitData ? false : true}
        cards={[
          {
            icon: <SvgIcon path={icon.userGroupTwo} width={16} height={16} />,
            iconColorVariant: "success",
            labelText: "Total Employees Enrolled",
            value: `${benefitData?.totalEmployees}`,
          },
          {
            icon: <SvgIcon path={icon.paperMoney} width={16} height={16} />,
            iconColorVariant: "success",
            labelText: "Total Utilization",
            value: `${benefitData?.totalUtilization}`,
          },
          {
            icon: <SvgIcon path={icon.paperMoney} width={16} height={16} />,
            iconColorVariant: "success",
            labelText: "Next Expiration",
            value: `${dayjs(benefitData?.benefit.endDate).format(
              "DD MMMM YYYY"
            )}`,
          },
        ]}
      />
      <Table
        hasActionsColumn
        hasCheckboxes
        title="Employees Enrolled"
        headerRowData={[
          "Employee Name",
          "Utilization",
          "Start Date",
          "End Date",
        ]}
        bodyRowData={employees}
        displayedFields={["name", "utilization", "startDate", "endDate"]}
        fieldTypes={Array(4).fill(FieldType.text)}
        actions={[{ name: "Adjust Repayment Details", onClick: () => {} }]}
        hasPagination={false}
      />
    </Page>
  );
};

export default HrAdminViewPayrollBenefitPage;
