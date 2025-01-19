import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import {
  fetchDeviceRequestById,
  getAllDeviceRequest,
  requestMaintenaceById,
  returnDeviceById,
} from "@/app/api/services/employee/device-management";
import { formatDate } from "@/lib/utils";
import { FetchParams } from "@/types";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../modal/types";

const useDeviceManagementPage = () => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openMaintenanceModal, setOpenMaintenanceModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);
  const [detailsData, setDetailsData] = useState<any | null>(null);
  const [maintenanceRequestId, setMaintenanceRequestId] = useState<
    string | number | null
  >(null);
  const [reason, setReason] = useState<string | number | undefined>("");

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

  const {
    data: deviceRequest,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["device-requests", { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllDeviceRequest(
        fetchParams.sortOrder,
        fetchParams.page,
        fetchParams.limit,
        fetchParams.search
      );
      console.log(response);
      return response.requests;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000, // Cache for 1 minute
  });

  const handleRequestMaintenace = async (id: any) => {
    try {
      const response = await requestMaintenaceById(id, reason);
      if (response.message) {
        console.log(response);
        toast.success("Request Maintenance successfully");
        refetch(); // Refresh the data
        setOpenReturnModal(false);
      } else {
        console.error(
          "Failed to request maintenance:",
          response?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const pageProps: PageProps = {
    title: "Employee Device Management",
    subtitle: "Access your Employee Device Dashboard",
  };

  const tableProps: TableProps = {
    hasActionsColumn: true,
    headerRowData: ["Device Name", "Status", "Request Date", "Return Date"],
    bodyRowData: isLoading
      ? Array(5).fill({
          name: <Skeleton width={100} />,
          status: <Skeleton width={100} />,
          requestedOn: <Skeleton width={100} />,
          returnedOn: <Skeleton width={100} />,
        })
      : deviceRequest?.map((request: any) => ({
          id: request.id,
          name: request.deviceId.deviceName,
          status: request.status,
          requestedOn: formatDate(request.requestedDate),
          returnedOn: request.returnDate
            ? formatDate(request.returnDate)
            : "N/A",
        })) || [],
    fieldTypes: Array(4).fill(FieldType.text),
    onSearch: handleSearch,
    fieldToReturnOnActionItemClick: "id",
    displayedFields: ["name", "status", "requestedOn", "returnedOn"],
    actions: [
      {
        name: "View Details",
        onDataReturned: async (id) => {
          try {
            console.log("Fetching leave request details:", id);
            const data = await fetchDeviceRequestById(id);
            console.log(data);
            setDetailsData(data);
            setOpenDetailsModal(true);
          } catch (error) {
            console.error("Failed to fetch leave request details:", error);
          }
        },
        onClick: () => setOpenDetailsModal(true),
      },
      {
        name: "Request Maintenance",
        onClick: () => setOpenMaintenanceModal(true),
        onDataReturned: (id) => {
          setOpenMaintenanceModal(true);
          setMaintenanceRequestId(id);
        },
      },
      {
        name: "Return Device",
        onClick: () => {},

        onDataReturned: async (id) => {
          try {
            const response = await returnDeviceById(id);
            console.log(response);

            if (response.data?.status === "RETURNED") {
              toast.success("Device returned successfully");
              refetch();
            } else {
              toast.error("Failed to return device: Unexpected status");
              console.error("Unexpected response:", response);
            }
          } catch (error) {
            console.error("Failed to return device:", error);
            toast.error("Failed to return device");
          }
        },
      },
    ],
  };

  const maintenanceModalProps: ModalProps = {
    open: openMaintenanceModal,
    onClose: () => setOpenMaintenanceModal(false),
    title: "Request Maintenance",
    subtitle: "Fill in the details below to request device maintenance",
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          label: "Reason",
          type: "text",
          placeholder: "Clear description of the issue",
          value: reason,
          setValue: setReason,
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => setOpenMaintenanceModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: "Request Maintenance",
      onClick: () => {
        if (maintenanceRequestId) {
          console.log("click");
          handleRequestMaintenace(maintenanceRequestId);
        }
      },
    },
  };

  const returnModalProps: ModalProps = {
    open: openReturnModal,
    onClose: () => setOpenReturnModal(false),
    title: "Return Device",
    subtitle: "Fill in the details below to return the device",
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          label: "Reason",
          type: "text",
          placeholder: "Clear description of why you are returning it",
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => setOpenReturnModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: "Return Device",
    },
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: "Device Details",
    subtitle: "View device details below",
    detailGroup: {
      gridLayout: "view-details-two",
      details: detailsData
        ? [
            {
              name: "Assigned To",
              value:
                `${detailsData?.employee?.personalInfo?.firstName} ${detailsData?.employee?.personalInfo?.lastName}` ||
                "",
            },
            {
              name: "Device Name",
              value: `${detailsData?.deviceId?.deviceName}` || "",
            },
            {
              name: "Serial Number",
              value: `${detailsData?.id}` || "",
            },
            {
              name: "Device Details",
              value: `${detailsData?.deviceId?.description}` || "",
            },
          ]
        : [
            {
              name: "Assigned To",
              value: "",
            },
            {
              name: "Device Name",
              value: "",
            },
            {
              name: "Serial Number",
              value: "",
            },
            {
              name: "Device Details",
              value: "",
            },
          ],
    },
  };

  const modalsProps = [
    maintenanceModalProps,
    returnModalProps,
    detailsModalProps,
  ];

  return { pageProps, tableProps, modalsProps };
};

export default useDeviceManagementPage;
