"use client";

import Modal from "@/app/_components/employee/modal";
import SvgIcon from "@/app/_components/icons/container";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import TabFormat from "@/app/_components/shared/tab-format";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import Toast from "@/app/_components/shared/toast";
import { icon } from "@/constants";
import { FetchParams } from "@/types";
import { currencyFormatter } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  approveAdvanceRequest,
  getAllSalaryAdvanceRequests,
  getSalaryAdvanceSummary,
  rejectAdvanceRequest,
} from "../../overview/api";

const INIT_FETCH_PARAMS: FetchParams = {
  page: 1,
  limit: 10,
  sortOrder: "asc",
};

interface MappedPendingRequest {
  id: string;
  employeeName: string;
  requestedAmount: number;
  requestedDate: string;
  repaymentTerms: string;
}

interface MappedApprovedRequest {
  id: string;
  employeeName: string;
  advanceTaken: number;
  repaymentStatus: string;
  amountRepaid: number;
  nextPaymentDate: string;
}

const HrAdminPayrollSalaryAdvancePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mutationLoading, setMutationLoading] = useState(false);

  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

  const [openApproveToast, setOpenApproveToast] = useState(false);
  const [openRejectToast, setOpenRejectToast] = useState(false);

  const [selectedRequestId, setSelectedRequestId] = useState("");

  const [pendingFetchParams, setPendingFetchParams] = useState<
    FetchParams & { status: string }
  >({ ...INIT_FETCH_PARAMS, status: "pending" });
  const [approvedFetchParams, setApprovedFetchParams] = useState<
    FetchParams & { status: string }
  >({ ...INIT_FETCH_PARAMS, status: "approved" });

  const [pendingRequests, setPendingRequests] =
    useState<MappedPendingRequest[]>();
  const [approvedRequests, setApprovedRequests] =
    useState<MappedApprovedRequest[]>();

  const { data: summaryData } = useQuery({
    queryKey: ["salary-advance", "summary"],
    queryFn: () => getSalaryAdvanceSummary(),
  });

  const { data: pendingRequestsData } = useQuery({
    queryKey: ["salary-advance", "requests", "pending", pendingFetchParams],
    queryFn: () => getAllSalaryAdvanceRequests(pendingFetchParams),
  });

  const { data: approvedRequestsData } = useQuery({
    queryKey: ["salary-advance", "requests", "approved", approvedFetchParams],
    queryFn: () => getAllSalaryAdvanceRequests(approvedFetchParams),
  });

  const approveAdvanceRequestMutation = useMutation({
    mutationFn: (id: string) => approveAdvanceRequest(id),
    onMutate: () => setMutationLoading(true),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["salary-advance"] });
      setOpenApproveModal(false);
      setMutationLoading(false);
      setOpenApproveToast(true);
    },
    onError: () => {
      setMutationLoading(false);
    },
  });

  const rejectAdvanceRequestMutation = useMutation({
    mutationFn: (id: string) => rejectAdvanceRequest(id),
    onMutate: () => setMutationLoading(true),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["salary-advance"] });
      setOpenRejectModal(false);
      setMutationLoading(false);
      setOpenRejectToast(true);
    },
    onError: () => {
      setMutationLoading(false);
    },
  });

  useEffect(() => {
    if (pendingRequestsData) {
      setPendingRequests(
        pendingRequestsData.requests.map((request) => ({
          id: request._id,
          employeeName: request.employeeId.firstName,
          requestedAmount: request.advanceTaken,
          requestedDate: "N/A",
          repaymentTerms: "N/A",
        })),
      );
    } else {
      setPendingRequests(undefined);
    }
  }, [pendingRequestsData]);

  useEffect(() => {
    if (approvedRequestsData) {
      setApprovedRequests(
        approvedRequestsData.requests.map((request) => ({
          id: request._id,
          employeeName: request.employeeId.firstName,
          advanceTaken: request.advanceTaken,
          repaymentStatus: `${request.repaymentStatus}`,
          amountRepaid: request.amountRepaid,
          nextPaymentDate: `${dayjs(request.nextPaymentDate).format(
            "DD MMMM YYYY",
          )}`,
        })),
      );
    } else {
      setApprovedRequests(undefined);
    }
  }, [approvedRequestsData]);

  return (
    <Page
      title="Salary Advance"
      backText="Back to Benefits"
      onBackTextClick={() =>
        router.push("/hr-admin/payroll/benefits-management")
      }
    >
      <CardGroup
        gridItemSize={{ xs: 12, md: 4 }}
        loading={summaryData ? false : true}
        cardValueBelow
        cardLargeLabelText
        cards={[
          {
            labelText: "Total Advances Disbursed",
            value: `${currencyFormatter.format(
              summaryData?.approvedTotalAdvanceTaken ?? 0,
            )}`,
            icon: <SvgIcon path={icon.paperMoney} width={16} height={16} />,
            iconColorVariant: "info",
          },
          {
            labelText: "Outstanding Payments",
            value: "N/A",
            icon: <SvgIcon path={icon.paperMoney} width={16} height={16} />,
            iconColorVariant: "success",
          },
          {
            labelText: "Pending Requests",
            value: `${summaryData?.pendingCount}`,
            icon: <SvgIcon path={icon.paperMoney} width={16} height={16} />,
            iconColorVariant: "warning",
          },
        ]}
      />
      <TabFormat
        tabs={[
          {
            name: "Approved",
            component: (
              <Table
                hasActionsColumn
                headerRowData={[
                  "Employee Name",
                  "Advance Taken",
                  "Repayment Status",
                  "Amount Repaid",
                  "Next Payment Date",
                ]}
                fieldTypes={[
                  FieldType.text,
                  FieldType.naira,
                  FieldType.text,
                  FieldType.naira,
                  FieldType.text,
                ]}
                displayedFields={[
                  "employeeName",
                  "advanceTaken",
                  "repaymentStatus",
                  "amountRepaid",
                  "nextPaymentDate",
                ]}
                bodyRowData={approvedRequests}
                actions={[
                  {
                    name: "Adjust Repayment Details",
                    onClick: () => {},
                  },
                ]}
                paginationMeta={{
                  page: approvedRequestsData?.currentPage,
                  limit: approvedRequestsData?.pageSize,
                  totalPages: approvedRequestsData?.totalPages,
                  itemCount: approvedRequestsData?.totalRequests,
                  itemsOnPage: approvedRequestsData?.requests.length,
                  loading: approvedRequestsData ? false : true,
                  onChangeLimit: (limit) =>
                    setApprovedFetchParams({
                      ...approvedFetchParams,
                      limit: limit,
                    }),
                  onPrevClick: () =>
                    setApprovedFetchParams({
                      ...approvedFetchParams,
                      page: approvedFetchParams.page - 1,
                    }),
                  onNextClick: () =>
                    setApprovedFetchParams({
                      ...approvedFetchParams,
                      page: approvedFetchParams.page + 1,
                    }),
                }}
                fieldToReturnOnActionItemClick="id"
              />
            ),
          },
          {
            name: "Pending",
            component: (
              <Table
                hasActionsColumn
                headerRowData={[
                  "Employee Name",
                  "Requested Amount",
                  "Requested Date",
                  "Repayment Terms",
                ]}
                fieldTypes={[
                  FieldType.text,
                  FieldType.naira,
                  ...Array(2).fill(FieldType.text),
                ]}
                displayedFields={[
                  "employeeName",
                  "requestedAmount",
                  "requestedDate",
                  "repaymentTerms",
                ]}
                bodyRowData={pendingRequests}
                actions={[
                  {
                    name: "Approve",
                    onClick: () => {},
                    onDataReturned: (id) => {
                      if (typeof id === "string") {
                        setSelectedRequestId(id);
                        setOpenApproveModal(true);
                      }
                    },
                  },
                  {
                    name: "Reject",
                    onClick: () => {},
                    onDataReturned: (id) => {
                      if (typeof id === "string") {
                        setSelectedRequestId(id);
                        setOpenRejectModal(true);
                      }
                    },
                  },
                ]}
                paginationMeta={{
                  page: pendingRequestsData?.currentPage,
                  totalPages: pendingRequestsData?.totalPages,
                  limit: pendingRequestsData?.pageSize,
                  itemCount: pendingRequestsData?.totalRequests,
                  itemsOnPage: pendingRequestsData?.requests.length,
                  loading: pendingRequestsData ? false : true,
                  onChangeLimit: (limit) =>
                    setPendingFetchParams({
                      ...pendingFetchParams,
                      limit: limit,
                    }),
                  onPrevClick: () =>
                    setPendingFetchParams({
                      ...pendingFetchParams,
                      page: pendingFetchParams.page - 1,
                    }),
                  onNextClick: () =>
                    setPendingFetchParams({
                      ...pendingFetchParams,
                      page: approvedFetchParams.page + 1,
                    }),
                }}
                fieldToReturnOnActionItemClick="id"
              />
            ),
          },
        ]}
      />

      {openApproveModal && (
        <Modal
          open={openApproveModal}
          onClose={() => {}}
          hasHeading={false}
          centerTitle="Approve Request"
          centerMessage="Are you sure you want to approve the request"
          buttonOne={{
            type: mutationLoading ? ButtonType.disabled : ButtonType.outlined,
            text: "Cancel",
            onClick: () => setOpenApproveModal(false),
          }}
          buttonTwo={{
            type: mutationLoading
              ? ButtonType.disabledLoading
              : ButtonType.contained,
            text: mutationLoading ? "" : "Approve",
            onClick: () =>
              approveAdvanceRequestMutation.mutateAsync(selectedRequestId),
          }}
        />
      )}

      {openRejectModal && (
        <Modal
          open={openRejectModal}
          onClose={() => {}}
          hasHeading={false}
          centerTitle="Reject Request"
          centerMessage="Are you sure you want to reject the request"
          buttonOne={{
            type: mutationLoading ? ButtonType.disabled : ButtonType.outlined,
            text: "Cancel",
            onClick: () => setOpenRejectModal(false),
          }}
          buttonTwo={{
            type: mutationLoading
              ? ButtonType.disabledLoading
              : ButtonType.contained,
            text: mutationLoading ? "" : "Reject",
            onClick: () =>
              rejectAdvanceRequestMutation.mutateAsync(selectedRequestId),
          }}
        />
      )}

      {openApproveToast && (
        <Toast
          open={openApproveToast}
          onClose={() => setOpenApproveToast(false)}
          icon={icon.checkCircle}
          status="Successful"
          message="Request approved successfully"
          type="success"
        />
      )}
      {openRejectToast && (
        <Toast
          open={openRejectToast}
          onClose={() => setOpenRejectToast(false)}
          icon={icon.checkCircle}
          status="Successful"
          message="Request rejected successfully"
          type="success"
        />
      )}
    </Page>
  );
};

export default HrAdminPayrollSalaryAdvancePage;
