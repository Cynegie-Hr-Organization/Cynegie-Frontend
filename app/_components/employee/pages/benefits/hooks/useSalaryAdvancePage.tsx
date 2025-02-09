"use client";
import SvgIcon from "@/app/_components/icons/container";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { CardGroupProps } from "@/app/_components/shared/section-with-cards/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import {
  getAllMySalaryAdvanceRequests,
  getSalaryAdvanceMetrics,
  requestSalaryAdvance,
} from "@/app/api/services/employee/benefits";
import { CPStatusMap, icon, route } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { FetchParams } from "@/types";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputFieldValue, ModalProps } from "../../../modal/types";

const INIT_FETCH_PARAMS: FetchParams = {
  page: 1,
  limit: 10,
  sortOrder: "desc",
};

const useSalaryAdvancePage = () => {
  const router = useRouter();
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [advanceTaken, setAdvanceTaken] = useState<string | number | undefined>(
    "",
  );
  const [installment, setInstallment] = useState<string | number | undefined>(
    "",
  );
  const [paymentFrequency, setPaymentFrequency] = useState<
    string | number | undefined
  >("");
  const [statusFilter, setStatusFilter] = useState<InputFieldValue>();

  const [fetchParams, setFetchParams] =
    useState<FetchParams & { status?: InputFieldValue }>(INIT_FETCH_PARAMS);

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setFetchParams((prev) => ({ ...prev, search: value || undefined }));
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["salary-advance-requests", { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllMySalaryAdvanceRequests(fetchParams);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  const { data: metricsData, isLoading: isMetricsLoading } = useQuery({
    queryKey: ["salary-advance-metrics"],
    queryFn: getSalaryAdvanceMetrics,
    staleTime: 60000,
  });

  const handleFormSubmit = async () => {
    const preparedData = {
      paymentFrequency,
      advanceTaken: Number(advanceTaken),
      installment: Number(installment),
    };

    try {
      const response = await requestSalaryAdvance(preparedData);
      if (response.createdAt !== "") {
        toast({
          title: "Success!",
          description:
            "Your salary advance request has been submitted successfully!",
        });
        setOpenRequestModal(false);
        setOpenSuccessModal(true);
        refetch();
      } else {
        toast({
          title: "Error",
          description: `Request failed: ${
            response?.statusText || "Unknown error"
          }`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
      });
    }

    refetch();
  };

  const pageProps: PageProps = {
    backText: "Back to Benefits",
    onBackTextClick: () => router.push(route.employee.benefits.home),
    title: "Salary Advance",
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: "Request Salary Advance",
      onClick: () => setOpenRequestModal(true),
    },
  };

  const svgIcon = <SvgIcon path={icon.paperMoney} width={16} height={16} />;

  const cardGroupProps: CardGroupProps = {
    gridItemSize: { xs: 12, sm: 6, md: 4 },
    cards: [
      {
        labelText: "Approved Requests",
        value: metricsData?.approvedCount || "0",
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: "info",
        loading: isMetricsLoading,
      },
      {
        labelText: "Pending Requests",
        value: metricsData?.pendingCount || "0",
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: "warning",
        loading: isMetricsLoading,
      },
      {
        labelText: "Rejected Requests",
        value: metricsData?.rejectedCount || "0",
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: "error",
        loading: isMetricsLoading,
      },
    ],
  };

  const tableProps: TableProps = {
    hasActionsColumn: true,
    headerRowData: [
      "Advance Taken",
      "Status",
      "Amount Repaid",
      "Next Payment Date",
    ],
    bodyRowData: isLoading
      ? Array(5).fill({
          advanceTaken: <Skeleton />,
          status: <Skeleton />,
          amountRepaid: <Skeleton />,
          nextPaymentDate: <Skeleton />,
        })
      : Array.isArray(data?.data)
      ? data.data.map((item: any) => ({
          id: item._id,
          advanceTaken: `₦${item.advanceTaken.toLocaleString()}`,
          status: `${item.status}`,
          amountRepaid: `₦${item.amountRepaid.toLocaleString()}`,
          nextPaymentDate: new Date(
            item.nextPaymentDate,
          ).toLocaleDateString(),
        }))
      : [],
    fieldTypes: [
      FieldType.text,
      FieldType.status,
      ...Array(2).fill(FieldType.text),
    ],
    displayedFields: [
      "advanceTaken",
      "status",
      "amountRepaid",
      "nextPaymentDate",
    ],
    statusMap: CPStatusMap,
    actions: [{ name: "No Actions", onClick: () => {} }],
    onSearch: handleSearch,
    formFilter: {
      gridSpacing: 2,
      inputFields: [
        {
          label: "Status",
          type: "select",
          options: [
            { label: "Approved", value: "approved" },
            { label: "Pending", value: "pending" },
            { label: "Rejected", value: "rejected" },
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
      page: data?.meta.page,
      totalPages: data?.meta.pageCount,
      limit: data?.meta.limit,
      itemCount: data?.meta.itemCount,
      itemsOnPage: data?.data.length,
      loading: isLoading,
      onChangeLimit: (limit) => setFetchParams((prev) => ({ ...prev, limit })),
      onPrevClick: () =>
        setFetchParams((prev) => ({ ...prev, page: prev.page - 1 })),
      onNextClick: () =>
        setFetchParams((prev) => ({ ...prev, page: prev.page + 1 })),
    },
  };

  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: "Request Salary Advance",
    subtitle: "Fill in the details below",
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          label: "Advance to be Taken",
          type: "text",
          value: advanceTaken,
          setValue: setAdvanceTaken,
        },
        {
          label: "Installment Amount",
          type: "text",
          value: installment,
          setValue: setInstallment,
        },
        {
          label: "Repayment Frequency",
          type: "select",
          options: [
            { label: "Monthly", value: "MONTHLY" },
            { label: "Quarterly", value: "QUARTERLY" },
          ],
          value: paymentFrequency,
          setValue: setPaymentFrequency,
        },
      ],
    },
    buttonOne: {
      type: ButtonType.contained,
      text: "Submit Request",
      onClick: handleFormSubmit,
    },
    centerButton: true,
  };

  const successModalProps: ModalProps = {
    open: openSuccessModal,
    onClose: () => setOpenSuccessModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: "/icons/modal-success.svg",
    centerTitle: "Advance Requested",
    centerMessage: "Your request has been sent successfully",
    buttonOne: {
      text: "Return to Salary Advance Dashboard",
      type: ButtonType.contained,
      onClick: () => {
        setOpenSuccessModal(false);
      },
    },
    centerButton: true,
  };

  const modalsProps = [requestModalProps, successModalProps];

  return { pageProps, cardGroupProps, tableProps, modalsProps, refetch };
};

export default useSalaryAdvancePage;