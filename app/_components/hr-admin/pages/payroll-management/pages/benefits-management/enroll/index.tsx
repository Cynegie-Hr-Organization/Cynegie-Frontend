"use client";

import Modal from "@/app/_components/employee/modal";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { icon } from "@/constants";
import { FetchParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyEmployees } from "../../overview/api";
import { enrollToBenefit } from "../api";

type MappedEmployee = {
  id: string | null;
  name: string;
  departmentId: string;
  departmentName: string;
  grossPay: string;
  deduction: string;
  netPay: string;
};

const HrAdminEnrollToBenefitPage: React.FC = () => {
  const { slug } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [employees, setEmployees] = useState<MappedEmployee[]>();
  const [checkedRows, setCheckedRows] = useState<
    (MappedEmployee | Record<string, string>)[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

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

  const enrollEmployeesMutation = useMutation({
    mutationFn: (payload: string[]) =>
      enrollToBenefit(typeof slug === "string" ? slug : "", {
        employeeIds: payload,
      }),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["benefit", slug] });
      setLoading(false);
      setOpenSuccessModal(true);
    },
  });

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
            grossPay: `₦${0}`,
            deduction: `₦${0}`,
            netPay: `₦${0}`,
          })),
        );
      }
    }
  }, [myEmployeesData]);

  return (
    <Page
      title="Benefits Enrollment"
      hasButtons
      rightButton={{
        type:
          checkedRows.length < 1
            ? ButtonType.disabled
            : loading
              ? ButtonType.disabledLoading
              : ButtonType.contained,
        text: loading ? "" : "Enroll Employee",
        onClick:
          checkedRows.length < 1
            ? () => {}
            : () =>
                enrollEmployeesMutation.mutateAsync(
                  checkedRows.map((row) =>
                    typeof row.id === "string" ? row.id : "",
                  ),
                ),
      }}
    >
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
        fieldTypes={Array(5).fill(FieldType.text)}
        bodyRowData={employees}
        displayedFields={[
          "name",
          "departmentName",
          "grossPay",
          "deduction",
          "netPay",
        ]}
        onSearch={(query) => setFetchParams({ ...fetchParams, search: query })}
        getCheckedRows={(rows) => setCheckedRows(rows)}
        defaultCheckedRows={checkedRows}
      />
      <Modal
        hasHeading={false}
        open={openSuccessModal}
        onClose={() => {}}
        centerImage={icon.successTick}
        centerTitle="Enrollment Successful"
        centerButton
        buttonOne={{
          type: ButtonType.contained,
          text: "View Benefit",
          onClick: () =>
            router.push(`/hr-admin/payroll/benefits-management/view/${slug}`),
        }}
      />
    </Page>
  );
};

export default HrAdminEnrollToBenefitPage;
