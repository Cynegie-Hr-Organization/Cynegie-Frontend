import SvgIcon from "@/app/_components/icons/container";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { CardGroupProps } from "@/app/_components/shared/section-with-cards/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import {
  getAllBenefits,
  getAllBenefitsMetrics,
  getAllMyBenefitsRequest,
  requestbenefits,
} from "@/app/api/services/employee/benefits";
import { icon, route } from "@/constants";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../modal/types";
import { FetchParams } from "@/types";
import { debounce } from "lodash";

const useBenefitsPage = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [allBenefits, setAllBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [benefit, setBenefit] = useState<string | number | undefined>("");
  const [provider, setProvider] = useState<string | number | undefined>("");
  const [coveragePlan, setCoveragePlan] = useState<string | number | undefined>(
    ""
  );
  const [monthlyCost, setMonthlyCost] = useState<string | number | undefined>(
    ""
  );
// Debounced search
  const debouncedSearch = debounce((value: string) => {
    setFetchParams((prev) => ({ ...prev, search: value || undefined }));
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const [fetchParams, setFetchParams] = useState<FetchParams>({
      page: 1,
      limit: 10,
      sortOrder: 'desc',
      search: undefined,
  });
  


  const router = useRouter();

  useEffect(() => {
    const fetchBenefits = async () => {
      const fetchedBenefits = await getAllBenefits();
      console.log(fetchedBenefits);
      setAllBenefits(fetchedBenefits);
      setLoading(false);
    };

    fetchBenefits();
  }, []);


  const { data: benefitsMetrics, isLoading: isMetricsLoading } = useQuery({
    queryKey: ['benefitsMetrics'],
    queryFn: async () => {  
      const response = await getAllBenefitsMetrics(); 
      return response;
      },
    staleTime: 3000,
    refetchOnWindowFocus: false,
  });
  console.log(benefitsMetrics);
  
  const handleSubmitRequest = async () => {
    const payload = {
      benefit,
      provider,
      coveragePlan,
      monthlyCost: Number(monthlyCost),
    };
    console.log(payload);
    try {
      const response = await requestbenefits(payload);
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
  queryKey: ['benefitsRequest', { ...fetchParams }],
  queryFn: async () => {
    const response = await getAllMyBenefitsRequest(
      fetchParams.sortOrder,
      fetchParams.page,
      fetchParams.limit,
      fetchParams.search
    );
    console.log(response);
    return response.data;
  },
  refetchOnWindowFocus: false, // Prevent refetching on window focus
  staleTime: 60000, // Cache for 1 minute
});
  

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
        value: benefitsMetrics?.totalBenefits || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "success",
        loading: isMetricsLoading,
      },
      {
        labelText: "Active Benefits",
        value: benefitsMetrics?.benefitsByStatus?.active || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "info",
                loading: isMetricsLoading,

      },
      {
        labelText: "Pending Benefits",
        value: benefitsMetrics?.benefitsByStatus?.pending || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "warning",
                loading: isMetricsLoading,

      },
      {
        labelText: "Rejected Benefits",
        value: benefitsMetrics?.benefitsByStatus?.rejected || "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "error",
                loading: isMetricsLoading,

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
      : benefitsRequests?.map((request) => ({
          name: request.benefit?.name,
          provider: request.provider,
          coveragePlan: request.coveragePlan,
        })) || [],
    fieldTypes: Array(4).fill(FieldType.text),
    displayedFields: ["name", "provider", "coveragePlan"],
    actions: [
      { name: "View Details", onClick: () => setOpenDetailsModal(true) },
    ],
    onSearch: handleSearch,
    filters: [
      {
        name: "Benefit Type",
        items: ["Health", "Pension", "Retirement", "Transport", "Life"],
      },
    ],
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

      text: "Request Beneift",
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
      details: [
        {
          name: "Benefit Name",
          value: "Retirment Plans",
        },
        {
          name: "Benefit Type",
          value: "Financial",
        },
        {
          name: "Provider",
          value: "Cynegie",
        },
        {
          name: "Start Date",
          value: "January 30, 2024",
        },
        {
          name: "End Date",
          value: "December 21, 2024",
        },
        {
          name: "Employee Contribution",
          value: "N20,000",
        },
      ],
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
