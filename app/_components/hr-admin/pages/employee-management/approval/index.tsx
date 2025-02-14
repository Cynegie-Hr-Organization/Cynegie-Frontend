"use client";
import Modal from "@/app/_components/employee/modal";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import useHandleRowChecks from "@/app/_components/shared/table/hooks/useHandleRowChecks";
import { FieldType } from "@/app/_components/shared/table/types";
import Toast from "@/app/_components/shared/toast";
import { icon, route } from "@/constants";
import { FetchParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllLeaves } from "../../payroll-management/pages/overview/api";
import useApprovalConfirmationModal from "./hooks/useApprovalConfirmationModal";

type MappedLeaveRequest = {
  requestType: string;
  employeeName: string;
  staffId: string;
  department: string;
  requestDetails: string;
  requestDate: string;
  status: string;
};

const HrAdminEmployeeManagementApproval = () => {
  const router = useRouter();
  const { checkedRows, setCheckedRows, clearChecks, resetChecks } =
    useHandleRowChecks();
  const {
    openConfirmationModal,
    setOpenConfirmationModal,
    confirmationModalProps,
  } = useApprovalConfirmationModal();
  const [openToast, setOpenToast] = useState(false);

  // const [requests] = useState(
  //   Array(5)
  //     .fill({
  //       requestType: "Leave Request",
  //       employeeName: "Ayomide Alibaba",
  //       staffID: "CYN0235",
  //       department: "Product",
  //       requestDetails: "Annual Leave (5 days)",
  //       requestDate: "Oct 12, 2024",
  //       status: "Pending",
  //     })
  //     .map((item, index) => ({ id: index + 1, ...item }))
  // );

  const [fetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
  });

  const { data: leaveRequestsData } = useQuery({
    queryKey: ["leave-records", fetchParams],
    queryFn: () => getAllLeaves(fetchParams),
  });

  const [leaveRequests, setLeaveRequests] = useState<MappedLeaveRequest[]>();

  useEffect(() => {
    if (leaveRequestsData) {
      setLeaveRequests(
        leaveRequestsData.data
          ? leaveRequestsData.data?.map((record) => ({
              requestType: "Leave Request",
              employeeName: `${record.employee.personalInfo.firstName} ${record.employee.personalInfo.lastName}`,
              staffId: record.employee.employmentInformation.staffId,
              department:
                record.employee.employmentInformation.department.departmentName,
              requestDetails: record.leaveType.name,
              requestDate: dayjs(record.createdAt).toISOString(),
              status: record.status,
            }))
          : []
      );
    } else {
      setLeaveRequests(undefined);
    }
  }, [leaveRequestsData]);

  return (
    <Page
      title="Approval Management"
      subtitle="Manage and Approve all requests pending HR review"
      hasButtons
      leftButton={{
        type:
          checkedRows.length > 0 ? ButtonType.outlined : ButtonType.disabled,
        text: "Reject All",
        onClick: () => resetChecks(),
      }}
      rightButton={{
        type:
          checkedRows.length > 0 ? ButtonType.contained : ButtonType.disabled,
        text: "Approve All",
        onClick: () => setOpenConfirmationModal(true),
      }}
    >
      <Table
        hasCheckboxes
        hasActionsColumn
        headerRowData={[
          "Request Type",
          "Employee Name",
          "Staff ID",
          "Department",
          "Request Details",
          "Request Date",
          "Status",
        ]}
        fieldTypes={[...Array(6).fill(FieldType.text), FieldType.status]}
        displayedFields={[
          "requestType",
          "employeeName",
          "staffId",
          "department",
          "requestDetails",
          "requestDate",
          "status",
        ]}
        bodyRowData={leaveRequests}
        formFilter={{
          inputFields: [
            {
              label: "Request Type",
              type: "select",
              placeholder: "Select",
              options: [{ label: "Leave Request", value: 0 }],
            },
            {
              label: "Department",
              type: "select",
              placeholder: "Select",
              options: [{ label: "HR", value: 0 }],
            },
            {
              label: "Date",
              type: "date",
            },
            {
              label: "Status",
              type: "select",
              placeholder: "Select",
              options: [
                { label: "Approved", value: 2 },
                { label: "Rejected", value: 1 },
                { label: "Pending", value: 0 },
              ],
            },
          ],
        }}
        statusMap={{
          approved: "success",
          pending: "warning",
          rejected: "error",
        }}
        fieldActionMap={{
          Pending: [
            {
              name: "View Details",
              onClick: () =>
                router.push(
                  route.hrAdmin.employeeManagement.approvalManagement
                    .requestDetails
                ),
            },
            {
              name: "Approve",
              onClick: () => setOpenToast(true),
            },
            {
              name: "Reject",
              onClick: () => {},
            },
          ],
        }}
        fieldToGetAction="status"
        getCheckedRows={setCheckedRows}
        clearChecks={clearChecks}
      />
      {openConfirmationModal && (
        <Modal
          {...confirmationModalProps}
          buttonTwo={{
            ...confirmationModalProps.buttonTwo,
            onClick: () => {
              resetChecks();
              setOpenConfirmationModal(false);
              setOpenToast(true);
            },
          }}
        />
      )}
      {openToast && (
        <Toast
          open={openToast}
          icon={icon.checkCircle}
          type="success"
          onClose={() => setOpenToast(false)}
          status="Successful"
          message="Request(s) approved successfully!"
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeManagementApproval;
