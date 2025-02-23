import SvgIcon from "@/app/_components/icons/container";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { CardGroupProps } from "@/app/_components/shared/section-with-cards/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";

import { icon, route } from "@/constants";
import Skeleton from "@mui/material/Skeleton";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InputFieldValue, ModalProps } from "../../../modal/types";
import { FetchParams } from "@/types";
import { debounce } from "lodash";
import { formatDate } from "@/lib/utils";
import {
  getAllBenefits,
  getAllMyBenefitsRequests,
  getBenefitRequestById,
  requestBenefit,
} from "@/app/api/services/employee/benefits";

const INIT_FETCH_PARAMS: FetchParams = {
  page: 1,
  limit: 10,
  sortOrder: "desc",
};

const useBenefitsPage = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [allBenefits, setAllBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [benefit, setBenefit] = useState<string | number | undefined>("");
  const [provider, setProvider] = useState<string | number | undefined>("");
  const [coveragePlan, setCoveragePlan] = useState<string | number | undefined>(
    "",
  );
  const [monthlyCost, setMonthlyCost] = useState<string | number | undefined>(
    "",
  );
  const [benefitDetails, setBenefitDetails] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<InputFieldValue>();

  const [fetchParams, setFetchParams] = useState<
    FetchParams & { status?: InputFieldValue }
  >(INIT_FETCH_PARAMS);

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setFetchParams((prev) => ({ ...prev, search: value || undefined }));
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const router = useRouter();

  useEffect(() => {
    const fetchBenefits = async () => {
      const fetchedBenefits = await getAllBenefits();
      console.log(`Benefits All `, fetchedBenefits);
      setAllBenefits(fetchedBenefits);
      setLoading(false);
    };

    fetchBenefits();
  }, []);

  const handleSubmitRequest = async () => {
    const payload = {
      benefit,
      provider,
      coveragePlan,
      monthlyCost: Number(monthlyCost),
    };
    console.log(payload);
    try {
      const response = await requestBenefit(payload);
      console.log(response);
      if (response?.createdAt.length > 0) {
        setOpenRequestModal(false);
        setOpenSuccessModal(true);
        refetch();
      } else {
        toast.error("Request failed:", response?.message || "Unknown error");
      }
    } catch (error) {
      toast.error("Request failed:", (error as any).message || "Unknown error");
    }
  };

  const {
    data: benefitsRequests,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["benefitsRequest", { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllMyBenefitsRequests(fetchParams);
      return response;
    },
    refetchOnWindowFocus: false, // Prevent refetching on window focus
    staleTime: 60000, // Cache for 1 minute
  });

  const fetchBenefitDetailsMutation = useMutation({
    mutationFn: (id: string | number) => getBenefitRequestById(id),
    onSuccess: (data) => {
      setBenefitDetails(data);
      setOpenDetailsModal(true);
    },
    onError: (error) => {
      console.error("Failed to fetch benefit details:", error);
      toast.error("Failed to fetch benefit details.");
    },
  });

  const handleViewDetails = (id: string | number) => {
    fetchBenefitDetailsMutation.mutate(id);
  };

  const isFormComplete = () => {
    return benefit && provider && coveragePlan && monthlyCost;
  };

  const pageProps: PageProps = {
    title: "Benefits",
    subtitle: "All your benefits below",
    hasButtons: true,
    leftButton: {
      type: ButtonType.outlined,
      text: "Salary Advance",
      onClick: () => router.push(route.employee.benefits.salaryAdvance),
    },
    rightButton: {
      type: ButtonType.contained,
      text: "Request Benefits",
      onClick: () => setOpenRequestModal(true),
    },
  };

  const giftIcon = <SvgIcon path={icon.gift} width={16} height={16} />;

  const cardGroupProps: CardGroupProps = {
    gridItemSize: { xs: 12, sm: 6, md: 3 },
    cards: [
      {
        labelText: "Total Benefits Enrolled",
        value: benefitsRequests?.total || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "success",
        loading: isLoading,
      },
      {
        labelText: "Approved Benefits",
        value: benefitsRequests?.statusCount.approved || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "info",
        loading: isLoading,
      },
      {
        labelText: "Pending Benefits",
        value: benefitsRequests?.statusCount?.pending || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "warning",
        loading: isLoading,
      },
      {
        labelText: "Rejected Benefits",
        value: benefitsRequests?.statusCount?.rejected || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "error",
        loading: isLoading,
      },
    ],
  };

  const tableProps: TableProps = {
    hasActionsColumn: true,
    headerRowData: ["Benefit Name", "Provider", "Coverage Plan"],
    bodyRowData: isLoading
      ? Array(5).fill({
          name: <Skeleton />,
          type: <Skeleton />,
          provider: <Skeleton />,
          coveragePlan: <Skeleton />,
        })
      : benefitsRequests?.data?.map((request) => ({
          id: request.id,
          name: request.benefit?.name,
          provider: request.provider,
          coveragePlan: request.coveragePlan,
        })) || [],
    fieldTypes: Array(4).fill(FieldType.text),
    displayedFields: ["name", "provider", "coveragePlan"],
    actions: [
      {
        name: "View Details",
        onDataReturned(id) {
          handleViewDetails(id);
        },
        onClick: () => {},
      },
    ],
    onSearch: handleSearch,
    fieldToReturnOnActionItemClick: "id",
    paginationMeta: {
      page: benefitsRequests?.page,
      totalPages: benefitsRequests?.total,
      limit: benefitsRequests?.limit,
      itemCount: benefitsRequests?.total,
      itemsOnPage: benefitsRequests?.data.length,
      loading: isLoading,
      onChangeLimit: (limit) => setFetchParams((prev) => ({ ...prev, limit })),
      onPrevClick: () =>
        setFetchParams((prev) => ({ ...prev, page: prev.page - 1 })),
      onNextClick: () =>
        setFetchParams((prev) => ({ ...prev, page: prev.page + 1 })),
    },
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
  };

  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: "Request Benefit",
    subtitle: "Request benefit below",
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          label: "Benefit Type",
          type: "select",
          options: allBenefits.map((benefit) => ({
            label: benefit.label,
            value: benefit.value,
          })),
          value: benefit,
          setValue: setBenefit,
          disabled: loading,
        },
        {
          label: "Provider",
          type: "text",
          placeholder: "Provider",
          value: provider,
          setValue: setProvider,
        },
        {
          label: "Coverage Detail",
          type: "text",
          placeholder: "Sample description here",
          value: coveragePlan,
          setValue: setCoveragePlan,
        },
        {
          label: "Monthly Cost",
          type: "text",
          placeholder: "",
          value: monthlyCost,
          setValue: setMonthlyCost,
        },
      ],
    },
    buttonOne: {
      type: isFormComplete() ? ButtonType.contained : ButtonType.disabled,
      text: "Request Benefit",
      onClick: handleSubmitRequest,
    },
    centerButton: true,
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: "View Details",
    subtitle: "View details below",
    detailGroup: {
      spaceBetweenLayout: true,
      details: benefitDetails
        ? [
            {
              name: "Benefit Name",
              value: benefitDetails.benefit.name,
            },

            {
              name: "Provider",
              value: benefitDetails.provider,
            },
            {
              name: "Start Date",
              value: formatDate(benefitDetails.createdAt),
            },
            {
              name: "Status",
              value: benefitDetails.status,
            },
            // {
            //   name: "Employee Contribution",
            //   value: benefitDetails.employeeContribution,
            // },
          ]
        : [],
    },
    buttonOne: {
      type: ButtonType.outlinedBlue,
      text: "Contact HR",
      onClick: () => setOpenDetailsModal(false),
    },
    centerButton: true,
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

  return { pageProps, cardGroupProps, tableProps, modalsProps };
};

export default useBenefitsPage;
