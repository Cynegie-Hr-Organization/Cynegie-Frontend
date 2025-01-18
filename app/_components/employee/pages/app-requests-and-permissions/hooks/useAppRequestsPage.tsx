import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import {
  getAllMyAppRequest,
  getApps,
  requestApp,
} from "@/app/api/services/employee/app-request";
import { AppRequestStatusMap } from "@/constants";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ModalProps } from "../../../modal/types";

const useAppRequestsPage = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [fetchedApps, setFetchedApps] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    appId: "",
    reasonForRequest: "",
  });

  // Fetch apps data when the component mounts
  useEffect(() => {
    const fetchApps = async () => {
      const fetchedApps = await getApps();
      setFetchedApps(fetchedApps);
      setLoading(false);
    };

    fetchApps();
  }, []);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitRequest = async () => {
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

  // Fetch app requests using useQuery
  const {
    data: appRequests,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["app-requests"], // Unique query key
    queryFn: async () => {
      const response = await getAllMyAppRequest("desc", 1, 10);
      return response.data.items;
    },
    refetchOnWindowFocus: false, // Prevent refetching on window focus
    staleTime: 60000, // Cache for 1 minute
  });

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

  const tableProps: TableProps = {
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: ["Request ID", "App Name", "Access Level", "Request Date"],
    bodyRowData: isLoading
      ? Array(5).fill({
          requestId: <Skeleton width={100} />,
          appName: <Skeleton width={150} />,
          accessLevel: <Skeleton width={100} />,
          requestDate: <Skeleton width={120} />,
        })
      : appRequests?.map((request) => ({
          requestId: request.id,
          appName: request.appId.appName,
          accessLevel: request.status,
          requestDate: new Date(request.requestDate).toLocaleDateString(),
        })) || [],
    fieldTypes: [
      ...Array(2).fill(FieldType.text),
      FieldType.status,
      FieldType.text,
    ],

    statusMap: AppRequestStatusMap,
    displayedFields: ["requestId", "appName", "accessLevel", "requestDate"],
    actions: [
      { name: "View Details", onClick: () => setOpenDetailsModal(true) },
    ],
    filters: [{ name: "Access Level", items: ["All", "Admin", "Read"] }],
  };

  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: "App Request",
    subtitle: "Fill in the details below to return an app",
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
          value: formData.appId,
          setValue: (value: string | number | undefined) =>
            handleInputChange("appId", value ?? ""),
          disabled: loading,
        },
        {
          label: "Reason",
          type: "text",
          placeholder: "Clear description of why you are returning it",
          value: formData.reasonForRequest,
          setValue: (value: string | number | undefined) =>
            handleInputChange("reasonForRequest", value ?? ""),
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
      details: [
        {
          name: "Assigned To",
          value: "Salem David",
        },
        {
          name: "App Name",
          value: "Figma",
        },
        {
          name: "Request Id",
          value: "W88401231AX",
        },
        {
          name: "App Details",
          value:
            "Figma app aims to streamline and optimize human resource processes by providing an all-in-one platform for managing employee records, payroll, recruitment, performance evaluations, and compliance tracking.",
        },
      ],
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
      onClick: () => {
        setOpenSuccessModal(false);
      },
    },
    centerButton: true,
  };

  const modalsProps = [requestModalProps, detailsModalProps, successModalProps];

  return { pageProps, tableProps, modalsProps };
};

export default useAppRequestsPage;
