"use client";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import {
  deleteLeaveRequestById,
  fetchLeaveRequestById,
  getAllLeaveMetrics,
  getAllLeaveRequest,
  getLeaveType,
  requestLeave,
} from "@/app/api/services/employee/leave";
import { getEmployee } from "@/app/api/services/employee";
import { APRStatusMap, color } from "@/constants";
import { FetchParams } from "@/types";
import Skeleton from "@mui/material/Skeleton";
import { useQuery, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InputFieldValue, ModalProps } from "../../../modal/types";
import { LeaveManagementChartProps } from "../chart";
import { SortOrder } from "@/types/enum";

const INIT_FETCH_PARAMS: FetchParams = {
  page: 1,
  limit: 10,
  sortOrder: "desc",
};

const useLeaveManagementPage = () => {
  const [openRequestTimeOffModal, setOpenRequestTimeOffModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLeaveDetailsModal, setOpenLeaveDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [deleteRequestId, setDeleteRequestId] = useState<string | number | null>(null);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [detailsData, setDetailsData] = useState<any | null>(null);
  const [leaveType, setLeaveType] = useState<string | number | undefined>("");
  const [leavePeriod, setLeavePeriod] = useState({ startDate: "", endDate: "" });
  const [reliefOfficer, setReliefOfficer] = useState<string | number | undefined>("");
  const [statusFilter, setStatusFilter] = useState<InputFieldValue>();
  const [employees, setEmployees] = useState<any[]>([]);

  const [fetchParams, setFetchParams] = useState<FetchParams & { status?: InputFieldValue }>(INIT_FETCH_PARAMS);

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setFetchParams((prev) => ({ ...prev, search: value || undefined }));
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const isFormComplete = () => {
    return leaveType && leavePeriod.endDate && leavePeriod.startDate && reliefOfficer;
  };

  const clearForm = () => {
    setLeaveType("");
    setLeavePeriod({ startDate: "", endDate: "" });
    setReliefOfficer("");
  };

  useEffect(() => {
    if (leavePeriod.startDate && leavePeriod.endDate) {
      const start = dayjs(leavePeriod.startDate);
      const end = dayjs(leavePeriod.endDate);
      const days = end.diff(start, "day") + 1; // Include the start date
      setNumberOfDays(days);
    } else {
      setNumberOfDays(0);
    }
  }, [leavePeriod]);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const fetchedLeaveTypes = await getLeaveType();
      setLeaveTypes(fetchedLeaveTypes);
      setLoading(false);
    };
    fetchLeaveTypes();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployee(1, 50, SortOrder.Asc, undefined, "");
      setEmployees(response.data);
       console.log("Fetched employees data:", response);
    };
    fetchEmployees();
  }, []);

  // Define the mutation
  const requestLeaveMutation = useMutation({
    mutationFn: requestLeave,
    onSuccess: (response) => {
      if (response?.status == 201) {
        refetch();
        clearForm();
        setOpenRequestTimeOffModal(false);
        setOpenSuccessModal(true);
      } else if (response.error && response.statusCode) {
        toast.error(response.message);
      }
    },
    onError: (error: any) => {
      console.error("Error while submitting leave request:", error);
      toast.error(error.response.data.message);
    },
  });

  const handleSubmitRequest = () => {
    const payload = {
      leaveType,
      startDate: new Date(leavePeriod.startDate).toISOString(),
      endDate: new Date(leavePeriod.endDate).toISOString(),
      reliefOfficer,
    };
    requestLeaveMutation.mutate(payload);
  };

  const {
    data: leaveRequest,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["leave-requests", { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllLeaveRequest(fetchParams);
      console.log(response);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000, // Cache for 1 minute
  });

  const handleDeleteRequest = async (id: any) => {
    try {
      const response = await deleteLeaveRequestById(id);
      if (response?.message) {
        toast.success("Leave request deleted successfully");
        refetch(); // Refresh the data
        setOpenDeleteModal(false);
      } else {
        console.error("Failed to delete leave request:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const {
    data: leaveMetrics,
  } = useQuery({
    queryKey: ["leave-metrics"],
    queryFn: getAllLeaveMetrics,
    staleTime: 60000, // Cache for 1 minute
  });

  const pageData: PageProps = {
    title: "Leave Management",
    subtitle: "Access your Leave Management",
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: "Request Leave",
      onClick: () => setOpenRequestTimeOffModal(true),
    },
    rightButtonSm: true,
  };

  const colors = [
    color.success.dark,
    color.warning.dark,
    color.info.dark,
    color.error.dark,
  ];

  const chartsData: LeaveManagementChartProps[] =
    leaveMetrics?.data.map((metric: any, index: number) => ({
      title: metric.leaveType,
      usedDays: metric.daysUsed,
      totalDays: metric.daysUsed + metric.daysLeft,
      usedDaysColor: colors[index % colors.length], // Use color based on position
    })) || [];

  const tableData: TableProps = {
    title: "Leave History",
    hasActionsColumn: true,
    headerRowData: ["Request Date", "Leave Type", "Duration", "Status"],
    bodyRowData: isLoading
      ? Array(5).fill({
          requestDate: <Skeleton width={100} />,
          leaveType: <Skeleton width={150} />,
          duration: <Skeleton width={120} />,
          status: <Skeleton width={100} />,
        })
      : leaveRequest?.data?.map((request: any) => ({
          requestId: request?.id,
          requestDate: new Date(request?.startDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          leaveType: request.leaveType?.name,
          duration: `${request?.numberOfDays} days`,
          status: request?.status,
        })) || [],
    fieldTypes: [...Array(3).fill(FieldType.text), FieldType.status],
    displayedFields: ["requestDate", "leaveType", "duration", "status"],
    statusMap: APRStatusMap,
    fieldToGetAction: "status",
    fieldActionMap: {
      Approved: [
        {
          name: "View Request Details",
          onClick: () => setOpenLeaveDetailsModal(true),
          onDataReturned: async (id) => {
            try {
              const data = await fetchLeaveRequestById(id);
              setDetailsData(data);
              setOpenLeaveDetailsModal(true);
            } catch (error) {
              console.error("Failed to fetch leave request details:", error);
            }
          },
        },
      ],
      PENDING: [
        {
          name: "View Request Details",
          onClick: () => setOpenLeaveDetailsModal(true),
          onDataReturned: async (id) => {
            try {
              const data = await fetchLeaveRequestById(id);
              setDetailsData(data);
              setOpenLeaveDetailsModal(true);
            } catch (error) {
              console.error("Failed to fetch leave request details:", error);
            }
          },
        },
        {
          name: "Delete",
          onClick: () => setOpenDeleteModal(true),
          onDataReturned: (id) => {
            setOpenDeleteModal(true);
            setDeleteRequestId(id);
          },
        },
      ],
      Rejected: [
        {
          name: "View Request Details",
          onDataReturned: async (id) => {
            try {
              const data = await fetchLeaveRequestById(id);
              setDetailsData(data);
              setOpenLeaveDetailsModal(true);
            } catch (error) {
              console.error("Failed to fetch leave request details:", error);
            }
          },
          onClick: () => setOpenLeaveDetailsModal(true),
        },
      ],
    },
    fieldToReturnOnActionItemClick: "requestId",
    onSearch: handleSearch,
    formFilter: {
      gridSpacing: 2,
      inputFields: [
        {
          label: "Status",
          type: "select",
          options: [
            { label: "All", value: "" },
            { label: "Approved", value: "APPROVED" },
            { label: "Pending", value: "PENDING" },
            { label: "Rejected", value: "REJECTED" },
          ],
          value: statusFilter,
          setValue: setStatusFilter,
          selectValControlledFromOutside: true,
        },
      ],
    },
    onResetClick: () => {
      setStatusFilter(undefined);
      setFetchParams({ ...fetchParams, status: undefined });
    },
    onFilterClick: () =>
      setFetchParams((prev) => ({ ...prev, status: statusFilter })),
    paginationMeta: {
      page: leaveRequest?.currentPage,
      totalPages: leaveRequest?.totalPages,
      limit: fetchParams.limit,
      itemCount: leaveRequest?.count,
      itemsOnPage: leaveRequest?.data?.length,
      loading: isLoading,
      onChangeLimit: (limit) => setFetchParams((prev) => ({ ...prev, limit })),
      onPrevClick: () =>
        setFetchParams((prev) => ({ ...prev, page: prev.page - 1 })),
      onNextClick: () =>
        setFetchParams((prev) => ({ ...prev, page: prev.page + 1 })),
    },
  };

  const requestTimeOffModalData: ModalProps = {
    open: openRequestTimeOffModal,
    onClose: () => setOpenRequestTimeOffModal(false),
    title: "Request Time Off",
    subtitle: "Fill in the details below to request time off",
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          label: "Type of Leave",
          type: "select",
          selectValControlledFromOutside: false,
          placeholder: "Select",
          options: leaveTypes.map((leave) => ({
            label: leave.label,
            value: leave.value,
          })),
          value: leaveType,
          setValue: setLeaveType,
          disabled: loading,
        },
        {
          label: "Leave Period Start",
          type: "date",
          getDate: (date) =>
            setLeavePeriod((prev) => ({
              ...prev,
              startDate: dayjs(date).format("YYYY-MM-DD"),
            })),
          value: leavePeriod.startDate,
          disabled: loading,
        },
        {
          label: "Leave Period End",
          type: "date",
          getDate: (date) =>
            setLeavePeriod((prev) => ({
              ...prev,
              endDate: dayjs(date).format("YYYY-MM-DD"),
            })),
          value: leavePeriod.endDate,
          disabled: loading,
        },
        {
          label: "Number of Days",
          type: "text",
          value: numberOfDays.toString(),
          disabled: true,
        },
        {
          label: "Relief Officer",
          type: "select",
          placeholder: "Select",
          options: employees.map((employee) => ({
            label: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
            value: employee.id,
          })),
          value: reliefOfficer,
          setValue: setReliefOfficer,
          disabled: loading,
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => setOpenRequestTimeOffModal(false),
    },
    buttonTwo: {
      type: isFormComplete() ? ButtonType.contained : ButtonType.disabled,
      text: "Submit",
      onClick: () => {
        handleSubmitRequest();
      },
    },
  };

  const successModalData: ModalProps = {
    open: openSuccessModal,
    onClose: () => setOpenSuccessModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: "/icons/modal-success.svg",
    centerTitle: "Successful",
    centerMessage:
      "Your time off request has been successfully submitted. You will be notified of the status via email if approved",
    centerButton: true,
    buttonOne: {
      type: ButtonType.contained,
      text: "Continue to Dashboard",
      onClick: () => setOpenSuccessModal(false),
    },
  };

  const deleteModalData: ModalProps = {
    open: openDeleteModal,
    onClose: () => setOpenDeleteModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: "/icons/modal-delete.svg",
    centerTitle: "Delete Request",
    centerMessage:
      "If you delete this leave request, admin will be notified and your request will be withdrawn. You can reapply at any time",
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => setOpenDeleteModal(false),
    },
    buttonTwo: {
      type: ButtonType.deleteContained,
      text: "Delete Leave Request",
      onClick: () => {
        if (deleteRequestId) {
          handleDeleteRequest(deleteRequestId);
        }
      },
    },
  };

  const leaveDetailsModalData: ModalProps = {
    open: openLeaveDetailsModal,
    onClose: () => setOpenLeaveDetailsModal(false),
    title: "View Leave Details",
    subtitle: "Fill in the details below to request time off",
    detailGroup: {
      gridLayout: "view-details",
      details: detailsData
        ? [
            { name: "Leave Type", value: detailsData.leaveType?.name || "N/A" },
            {
              name: "Leave Duration",
              value: detailsData?.numberOfDays || "N/A",
            },
            { name: "Status", value: detailsData?.status || "N/A" },
            {
              name: "Start Date",
              value: new Date(detailsData?.startDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            },
            {
              name: "End Date",
              value: new Date(detailsData?.endDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            },
          ]
        : [],
    },
  };

  const modalsData = [
    requestTimeOffModalData,
    successModalData,
    deleteModalData,
    leaveDetailsModalData,
  ];

  return {
    pageData,
    chartsData,
    tableData,
    modalsData,
  };
};

export default useLeaveManagementPage;