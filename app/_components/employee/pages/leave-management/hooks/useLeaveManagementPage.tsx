import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { LeaveManagementChartProps } from "../chart";
import { APRStatusMap, color } from "@/constants";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { useEffect, useState } from "react";
import { ModalProps } from "../../../modal/types";
import {
  deleteLeaveRequestById,
  fetchLeaveRequestById,
  getAllLeaveRequest,
  getLeaveType,
  requestLeave,
} from "@/app/api/services/employee/leave";
import dayjs from "dayjs";
import { FetchParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const useLeaveManagementPage = () => {
  const [openRequestTimeOffModal, setOpenRequestTimeOffModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLeaveDetailsModal, setOpenLeaveDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [deleteRequestId, setDeleteRequestId] = useState<
    string | number | null
  >(null); // New state for delete request ID

  const [loading, setLoading] = useState<boolean>(true);
  const [detailsData, setDetailsData] = useState<any | null>(null);
  const [leaveType, setLeaveType] = useState<string | number | undefined>("");
  const [leavePeriod, setLeavePeriod] = useState({
    startDate: "",
    endDate: "",
  });
  const [numberOfDays, setNumberOfDays] = useState<string | number | undefined>(
    "",
  );
  const [reliefOfficer, setReliefOfficer] = useState<
    string | number | undefined
  >("");
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "desc",
    search: undefined,
  });

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setFetchParams((prev) => ({ ...prev, search: value || undefined }));
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const isFormComplete = () => {
    return (
      leaveType &&
      leavePeriod.endDate &&
      leavePeriod.startDate &&
      numberOfDays &&
      reliefOfficer
    );
  };

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const fetchedLeaveTypes = await getLeaveType();
      setLeaveTypes(fetchedLeaveTypes);
      setLoading(false);
    };

    fetchLeaveTypes();
  }, []);

  const handleSubmitRequest = async () => {
    const payload = {
      leaveType,
      startDate: new Date(leavePeriod.startDate).toISOString(),
      endDate: new Date(leavePeriod.endDate).toISOString(),
      numberOfDays: Number(numberOfDays),
      reliefOfficer,
    };

    console.log(payload);

    try {
      const response = await requestLeave(payload);
      if (response?.createdAt !== "") {
        refetch();
        setOpenRequestTimeOffModal(false);
        setOpenSuccessModal(true);
      } else {
        console.error("Request failed:", response?.message || "Unknown error");
      }
      setOpenRequestTimeOffModal(false);
      setOpenSuccessModal(true);
    } catch (error) {
      console.error("Error while submitting leave request:", error);
    }
  };

  const {
    data: leaveRequest,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["leave-requests", { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllLeaveRequest(
        fetchParams.sortOrder,
        fetchParams.page,
        fetchParams.limit,
        fetchParams.search,
      );
      console.log(response.data.data);
      return response.data.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000, // Cache for 1 minute
  });

  const handleDeleteRequest = async (id: any) => {
    try {
      const response = await deleteLeaveRequestById(id);
      if (response.message) {
        console.log("Leave request deleted successfully", response);
        toast.success("Leave request deleted successfully");
        refetch(); // Refresh the data
        setOpenDeleteModal(false);
      } else {
        console.error(
          "Failed to delete leave request:",
          response?.message || "Unknown error",
        );
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

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

  const chartsData: LeaveManagementChartProps[] = [
    {
      title: "Maternity/Paternity Leave",
      usedDays: 60,
      totalDays: 60,
      usedDaysColor: color.warning.dark,
    },
    {
      title: "Annual Leave",
      usedDays: 0,
      totalDays: 20,
      usedDaysColor: color.success.dark,
    },
    {
      title: "Sick Leave",
      usedDays: 2,
      totalDays: 10,
      usedDaysColor: color.info.dark,
    },
    {
      title: "Exam Leave",
      usedDays: 1,
      totalDays: 10,
      usedDaysColor: color.error.dark,
    },
  ];

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
      : leaveRequest?.map((request: any) => ({
          requestId: request?.id,
          requestDate: new Date(request?.startDate).toLocaleDateString(
            "en-US",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            },
          ),
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
              console.log("Fetching leave request details:", id);
              const data = await fetchLeaveRequestById(id);
              console.log(data);
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
              console.log("Fetching leave request details:", id);
              const data = await fetchLeaveRequestById(id);
              console.log(data);
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
              console.log("Fetching leave request details:", id);
              const data = await fetchLeaveRequestById(id);
              console.log(data);
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
    filters: [
      {
        name: "Status",
        items: ["All", "Approved", "Pending", "Rejected"],
      },
    ],
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
          name: "Type of Leave",
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
          name: "Leave Period Start",
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
          name: "Leave Period End",
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
          name: "Number of Days",
          type: "text",
          placeholder: "Placeholder",
          value: numberOfDays,
          setValue: setNumberOfDays,
        },
        {
          name: "Relief Officer",
          type: "text",
          placeholder: "Placeholder",
          value: reliefOfficer,
          setValue: setReliefOfficer,
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
      //  type:  ButtonType.contained ,
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
      "If you delete this leave request, admin will be notified and your request wil be withdrawn. You can reapply at anytime",
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
          console.log("click");
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
              value: new Date(detailsData?.startDate).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              ),
            },
            {
              name: "End Date",
              value: new Date(detailsData?.endDate).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              ),
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
