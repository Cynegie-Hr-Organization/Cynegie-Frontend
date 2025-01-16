import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { Tab } from "@/app/_components/shared/tab-format/types";
import Table from "@/app/_components/shared/table";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { CPStatusMap, route } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalProps } from "../../../modal/types";

const useContinuousFeedbackPage = () => {
  const router = useRouter();
  const [openGiveFeedbackModal, setOpenGiveFeedbackModal] = useState(false);
  const [openRequestFeedbackModal, setOpenRequestFeedbackModal] =
    useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const continuousFeedbackPageData: PageProps = {
    backText: "Back to Performance Management",
    title: "Continuous Feedback",
    onBackTextClick: () =>
      router.push(route.employee.performanceManagement.home),
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: "Request Feedback",
      onClick: () => setOpenRequestFeedbackModal(true),
    },
  };

  const feedbackReceivedTableData: TableProps = {
    headerRowData: ["Giver", "Feedback Type", "Feedback Date", "Feedback"],
    bodyRowData: Array(5).fill({
      giver: "Ngozi Adaobi",
      type: "Positive",
      date: "12 Dec 2024",
      feedback: "Helpful and collaborative during tasks",
    }),
    fieldTypes: Array(4).fill(FieldType.text),
    displayedFields: ["giver", "type", "date", "feedback"],
    filters: [{ name: "Type", items: ["Constructive", "Critical"] }],
  };

  const feedbackRequestsTableData: TableProps = {
    hasActionsColumn: true,
    headerRowData: ["Requester", "Feedback Type", "Due Date", "Status"],
    bodyRowData: Array(5).fill({
      requester: "Ngozi Adaobi",
      type: "Positive",
      date: "12 Dec 2024",
      status: "Pending",
    }),
    fieldTypes: [...Array(3).fill(FieldType.text), FieldType.status],
    displayedFields: ["requester", "type", "date", "status"],
    statusMap: CPStatusMap,
    fieldToGetAction: "status",
    fieldActionMap: {
      Completed: [
        {
          name: "No Actions",
          onClick: () => {},
        },
      ],
      Pending: [
        {
          name: "Give Feedback",
          onClick: () => setOpenGiveFeedbackModal(true),
        },
      ],
    },
    filters: [{ name: "Type", items: ["Constructive", "Critical"] }],
  };

  const giveFeedbackModalData: ModalProps = {
    open: openGiveFeedbackModal,
    onClose: () => setOpenGiveFeedbackModal(false),
    title: "Give Feedback",
    subtitle: "Fill the details below",
    form: {
      inputFields: [
        {
          label: "What can be improved in the team?",
          type: "message",
        },
      ],
    },
    buttonOne: {
      text: "Cancel",
      type: ButtonType.outlined,
    },
    buttonTwo: {
      text: "Submit Feedback",
      type: ButtonType.disabled,
      onClick: () => {
        setOpenGiveFeedbackModal(false);
        setOpenSuccessModal(true);
      },
    },
  };

  const successModalData: ModalProps = {
    open: openSuccessModal,
    onClose: () => setOpenSuccessModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: "/icons/modal-success.svg",
    centerTitle: "Your feedback request has been submitted successfully",
    centerMessage: "You will be notified when feedback is received",
    buttonOne: {
      text: "Continue to Dashboard",
      type: ButtonType.contained,
      onClick: () => {
        setOpenSuccessModal(false);
        router.push(route.employee.performanceManagement.continuousFeedback);
      },
    },
    centerButton: true,
  };

  const requestFeedbackModalData: ModalProps = {
    open: openRequestFeedbackModal,
    onClose: () => setOpenRequestFeedbackModal(false),
    title: "Request Feedback",
    subtitle: "Fill the details below",
    form: {
      layout: "request-feedback",
      gridSpacing: 4,
      inputFields: [
        {
          label: "Feedback Type",
          type: "select",
          placeholder: "Select Type",
        },
        {
          label: "Recipient",
          type: "select",
          placeholder: "Select Type",
        },
        {
          label: "Specify Goal or Area of Focus",
          type: "select",
          placeholder: "Select Type",
        },
        {
          label: "Due Date",
          type: "date",
        },
        {
          label: "How is the team collaboration?",
          type: "message",
        },
      ],
    },
    buttonOne: {
      text: "Cancel",
      type: ButtonType.outlined,
      onClick: () => setOpenRequestFeedbackModal(false),
    },
    buttonTwo: {
      text: "Submit Feedback",
      type: ButtonType.disabled,
      onClick: () => {
        setOpenRequestFeedbackModal(false);
        setOpenSuccessModal(true);
      },
    },
  };

  const modalsProps = [
    giveFeedbackModalData,
    successModalData,
    requestFeedbackModalData,
  ];

  const tableTabs: Tab[] = [
    {
      name: "Feedback Received",
      component: <Table {...feedbackReceivedTableData} />,
    },
    {
      name: "Feedback Requests",
      component: <Table {...feedbackRequestsTableData} />,
    },
  ];

  return {
    continuousFeedbackPageData,
    tableTabs,
    modalsProps,
  };
};

export default useContinuousFeedbackPage;
