"import client";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { CPStatusMap, icon, route } from "@/constants";
import { useState } from "react";
import { CardGroupProps } from "@/app/_components/shared/section-with-cards/types";
import SvgIcon from "@/app/_components/icons/container";
import { useRouter } from "next/navigation";
import { ModalProps } from "../../../modal/types";
import {
  getAllMyRequest,
  salaryAdvanceRequests,
} from "@/app/api/services/employee/benefits";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@mui/material";
import { FetchParams } from "@/types";
import { debounce } from "lodash";

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

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["salary-advance-requests", { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllMyRequest(
        fetchParams.sortOrder,
        fetchParams.page,
        fetchParams.limit,
        fetchParams.search,
      );
      console.log(response.data);
      return response.data.items;
    },
    refetchOnWindowFocus: false, 
    staleTime: 60000,
  });

  const handleFormSubmit = async () => {
    const preparedData = {
      paymentFrequency,
      advanceTaken: Number(advanceTaken),
      installment: Number(installment),
    };

    try {
      const response = await salaryAdvanceRequests(preparedData);
      console.log(response);
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
          description: `Request failed: ${response?.statusText || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
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
        value: "10",
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: "info",
      },
      {
        labelText: "Pending Requests",
        value: "4",
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: "warning",
      },
      {
        labelText: "Rejected Requests",
        value: "3",
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: "error",
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
      : Array.isArray(data)
        ? data.map((item: any) => ({
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
    filters: [
      {
        name: "Status",
        items: ["All", "Approved", "Pending", "Rejected"],
      },
    ],
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
          name: "Advance to be Taken",
          type: "text",
          value: advanceTaken,
          setValue: setAdvanceTaken,
        },
        {
          name: "Installment Amount",
          type: "text",
          value: installment,
          setValue: setInstallment,
        },
        {
          name: "Repayment Frequency",
          type: "select",
          options: [
            { label: "Monthly", value: "MONTHLY" },
            { label: "Weekly", value: "WEEKLY" },
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
