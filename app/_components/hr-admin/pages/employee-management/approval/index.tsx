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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  bulkApprove,
  bulkReject,
  getAllLeaves,
  post,
} from "../../payroll-management/pages/overview/api";

type MappedLeaveRequest = {
  id: string;
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
  const { checkedRows, setCheckedRows, clearChecks } = useHandleRowChecks();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [approveClicked, setApproveClicked] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [isBulkApproval, setIsBulkApproval] = useState(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    const _checkedRows = checkedRows as MappedLeaveRequest[];
    setCheckedIds(_checkedRows.map((row) => row.id));
  }, [checkedRows]);

  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
  });

  const { data: leaveRequestsData } = useQuery({
    queryKey: ["leave-records", fetchParams],
    queryFn: () => getAllLeaves(fetchParams),
  });

  const [leaveRequests, setLeaveRequests] = useState<MappedLeaveRequest[]>();
  const [selectedRequestId, setSelectedRequestId] = useState("");

  useEffect(() => {
    if (leaveRequestsData) {
      setLeaveRequests(
        leaveRequestsData.data
          ? leaveRequestsData.data.map((record) => ({
              id: record.id,
              requestType:
                "Leave Request" /*Inform backend team to return the correct value*/,
              employeeName: `${record.employee?.personalInfo?.firstName} ${record.employee?.personalInfo?.lastName}`,
              staffId: record.employee.employmentInformation?.staffId,
              department:
                record.employee.employmentInformation?.department
                  .departmentName,
              requestDetails: `${record.leaveType.name} (${record.leaveType.numberOfDays} days)`,
              requestDate: dayjs(record.createdAt).format("MMM D, YYYY"),
              status: record.status,
            }))
          : []
      );
    } else {
      setLeaveRequests(undefined);
    }
  }, [leaveRequestsData]);

  const queryClient = useQueryClient();

  const approveRejectMutation = useMutation({
    mutationFn: (endpoint: string) =>
      isBulkApproval
        ? approveClicked
          ? bulkApprove({ leaveIds: checkedIds })
          : bulkReject({ leaveIds: checkedIds })
        : post(endpoint),
    onMutate: () => setMutationLoading(true),
    onSuccess: (res) => {
      if (Object.keys(res).includes("error")) {
        setMutationLoading(false);
        alert("An error occurred");
      } else {
        queryClient.resetQueries({ queryKey: ["leave-records", fetchParams] });
        setApproveClicked(false);
        setMutationLoading(false);
        setOpenConfirmationModal(false);
        setOpenToast(true);
      }
    },
    onError: () => {
      setMutationLoading(false);
      alert("An error occured");
    },
  });

  return (
    <Page
      title="Approval Management"
      subtitle="Manage and Approve all requests pending HR review"
      hasButtons
      leftButton={{
        type:
          checkedRows.length > 0 ? ButtonType.outlined : ButtonType.disabled,
        text: "Reject All",
        onClick: () => {
          setIsBulkApproval(true);
          setOpenConfirmationModal(true);
        },
      }}
      rightButton={{
        type:
          checkedRows.length > 0 ? ButtonType.contained : ButtonType.disabled,
        text: "Approve All",
        onClick: () => {
          setIsBulkApproval(true);
          setApproveClicked(true);
          setOpenConfirmationModal(true);
        },
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
          pending: [
            {
              name: "View Details",
              onClick: () => {},
              onDataReturned: (id) =>
                router.push(
                  `${route.hrAdmin.employeeManagement.approvalManagement.requestDetails}/${id}`
                ),
            },
            {
              name: "Approve",
              onClick: () => {
                setApproveClicked(true);
                setOpenConfirmationModal(true);
              },
              onDataReturned: (id) => {
                if (typeof id === "string") {
                  setSelectedRequestId(id);
                }
              },
            },
            {
              name: "Reject",
              onClick: () => {
                setOpenConfirmationModal(true);
              },
              onDataReturned: (id) => {
                if (typeof id === "string") {
                  setSelectedRequestId(id);
                }
              },
            },
          ],
          approved: [
            {
              name: "View Details",
              onClick: () => {},
              onDataReturned: (id) =>
                router.push(
                  `${route.hrAdmin.employeeManagement.approvalManagement.requestDetails}/${id}`
                ),
            },
          ],
          rejected: [
            {
              name: "View Details",
              onClick: () => {},
              onDataReturned: (id) =>
                router.push(
                  `${route.hrAdmin.employeeManagement.approvalManagement.requestDetails}/${id}`
                ),
            },
          ],
        }}
        fieldToGetAction="status"
        fieldToReturnOnActionItemClick="id"
        getCheckedRows={setCheckedRows}
        clearChecks={clearChecks}
        paginationMeta={{
          page: leaveRequestsData?.currentPage,
          limit: fetchParams.limit,
          itemsOnPage: leaveRequestsData?.data.length,
          itemCount: leaveRequestsData?.count,
          loading: leaveRequestsData ? false : true,
          onChangeLimit: (limit) =>
            setFetchParams((prev) => {
              return { ...prev, limit: limit };
            }),
          onPrevClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page - 1 }),
          onNextClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page + 1 }),
        }}
      />
      {openConfirmationModal && (
        <Modal
          {...{
            open: openConfirmationModal,
            onClose: () => {
              if (approveClicked) {
                if (!mutationLoading) {
                  setApproveClicked(false);
                  setIsBulkApproval(false);
                }
              }
              if (!mutationLoading) {
                setOpenConfirmationModal(false);
              }
            },
            hasHeading: false,
            centerTitle: approveClicked ? "Approve Request" : "Reject Request",
            centerMessage: approveClicked
              ? "Are you sure you want to approve the request"
              : "Are you sure you want to reject the request",
            buttonOne: {
              type: mutationLoading ? ButtonType.disabled : ButtonType.outlined,
              text: "Cancel",
              onClick: () => {
                if (approveClicked) {
                  setApproveClicked(false);
                }
                if (isBulkApproval) {
                  setIsBulkApproval(false);
                }
                setOpenConfirmationModal(false);
              },
            },
            buttonTwo: {
              text: mutationLoading ? "" : "Confirm",
              type: mutationLoading
                ? ButtonType.disabledLoading
                : ButtonType.contained,
              onClick: () => {
                approveRejectMutation.mutateAsync(
                  `leave/${selectedRequestId}/${
                    approveClicked ? "approve" : "reject"
                  }`
                );
              },
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
          message={`Request(s) ${
            approveClicked ? "approved" : "rejected"
          } successfully!`}
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeManagementApproval;
