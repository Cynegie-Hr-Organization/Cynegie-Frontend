import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import {
  fetchAppRequestById,
  getAllMyAppRequest,
  getApps,
  requestApp,
} from "@/app/api/services/employee/app-request";
import { AppRequestStatusMap } from "@/constants";
import { FetchParams } from "@/types";
import { ModalProps } from "../../../modal/types";

const useAppRequestsPage = () => {
  // State variables
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [fetchedApps, setFetchedApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [appId, setAppId] = useState<string | number | undefined>("");
  const [reasonForRequest, setReasonForRequest] = useState<
    string | number | undefined
  >("");
  const [detailsData, setDetailsData] = useState<any | null>(null);
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

  // Fetch apps on component mount
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const apps = await getApps();
        setFetchedApps(apps);
      } catch (error) {
        console.error("Failed to fetch apps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  // Submit app request
  const handleSubmitRequest = async () => {
    const formData = { appId, reasonForRequest };
    try {
      const response = await requestApp(formData);
      if (response?.status === 201) {
        setOpenRequestModal(false);
        setOpenSuccessModal(true);
        refetch();
      } else {
        console.error("Request failed:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error while making app request:", error);
    }
  };

  // Fetch app requests
  const {
    data: appRequests,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["app-requests", { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllMyAppRequest(
        fetchParams.sortOrder,
        fetchParams.page,
        fetchParams.limit,
        fetchParams.search
      );
      return response.data.items;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  // Page properties
  const pageProps: PageProps = {
    title: "Your Apps & Request",
    subtitle: "All Apps and Requests Below",
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: "App Request",
      onClick: () => setOpenRequestModal(true),
    },
    rightButtonSm: true,
  };

  // Table properties
  const tableProps: TableProps = {
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: ["Request ID", "App Name", "Status", "Request Date"],
    bodyRowData: isLoading
      ? Array(5).fill({
          requestId: <Skeleton width={100} />,
          appName: <Skeleton width={150} />,
          status: <Skeleton width={100} />,
          requestDate: <Skeleton width={120} />,
        })
      : appRequests?.map((request) => ({
          requestId: request.id,
          appName: request.appId.appName,
          status: request.status,
          requestDate: new Date(request.requestDate).toLocaleDateString(),
        })) || [],
    fieldTypes: [
      ...Array(2).fill(FieldType.text),
      FieldType.status,
      FieldType.text,
    ],
    statusMap: AppRequestStatusMap,
    displayedFields: ["requestId", "appName", "status", "requestDate"],
    actions: [
      {
        name: "View Details",
        onClick: () => setOpenDetailsModal(true),
        onDataReturned: async (id) => {
          try {
            const data = await fetchAppRequestById(id);
            setDetailsData(data.data);
            setOpenDetailsModal(true);
          } catch (error) {
            console.error("Failed to fetch app request details:", error);
          }
        },
      },
    ],
    fieldToReturnOnActionItemClick: "requestId",
    onSearch: handleSearch,
    filters: [{ name: "Access Level", items: ["All", "Admin", "Read"] }],
  };

  // Modal properties
  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: "App Request",
    subtitle: "Fill in the details below to request an app",
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          label: "App Name",
          type: "select",
          options: fetchedApps.map((app) => ({
            label: app.label,
            value: app.value,
          })),
          value: appId,
          setValue: setAppId,
          disabled: loading,
        },
        {
          label: "Reason",
          type: "text",
          placeholder: "Clear description of why you are requesting it",
          value: reasonForRequest,
          setValue: setReasonForRequest,
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => setOpenRequestModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: "Request App",
      onClick: handleSubmitRequest,
    },
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: "App Details",
    subtitle: "View app details below",
    detailGroup: {
      gridLayout: "view-details-two",
      details: detailsData
        ? [
            { name: "Request ID", value: detailsData.id || "N/A" },
            { name: "App Name", value: detailsData.appId?.appName || "N/A" },
            { name: "Access Level", value: detailsData.accessLevel || "N/A" },
            {
              name: "Request Date",
              value:
                new Date(detailsData.requestDate).toLocaleDateString() || "N/A",
            },
            { name: "Status", value: detailsData.status || "N/A" },
          ]
        : [],
    },
  };

  const successModalProps: ModalProps = {
    open: openSuccessModal,
    onClose: () => setOpenSuccessModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: "/icons/modal-success.svg",
    centerTitle: "App Requested",
    centerMessage: "Your request has been sent successfully",
    buttonOne: {
      text: "Return to App Dashboard",
      type: ButtonType.contained,
      onClick: () => setOpenSuccessModal(false),
    },
    centerButton: true,
  };

  const modalsProps = [requestModalProps, detailsModalProps, successModalProps];

  return { pageProps, tableProps, modalsProps };
};

export default useAppRequestsPage;
