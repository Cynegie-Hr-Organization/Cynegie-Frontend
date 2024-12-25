import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { LeaveManagementChartProps } from "../chart";
import { APRStatusMap, color } from "@/constants";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { useState } from "react";
import { ModalProps } from "../../../modal/types";

const useLeaveManagementPage = () => {
  const [openRequestTimeOffModal, setOpenRequestTimeOffModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLeaveDetailsModal, setOpenLeaveDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

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
    bodyRowData: [
      {
        date: "12 Jun 2024",
        type: "Maternity Leave",
        duration: "60 days",
        status: "Pending",
      },
      {
        date: "12 Jun 2024",
        type: "Maternity Leave",
        duration: "60 days",
        status: "Approved",
      },
      {
        date: "12 Jun 2024",
        type: "Maternity Leave",
        duration: "60 days",
        status: "Rejected",
      },
    ],
    fieldTypes: [...Array(3).fill(FieldType.text), FieldType.status],
    displayedFields: ["date", "type", "duration", "status"],
    statusMap: APRStatusMap,
    fieldToGetAction: "status",
    statusActionMap: {
      Approved: [
        {
          name: "View Request Details",
          onClick: () => setOpenLeaveDetailsModal(true),
        },
      ],
      Pending: [
        {
          name: "View Request Details",
          onClick: () => setOpenLeaveDetailsModal(true),
        },
        {
          name: "Delete",
          onClick: () => setOpenDeleteModal(true),
        },
      ],
      Rejected: [
        {
          name: "View Request Details",
          onClick: () => setOpenLeaveDetailsModal(true),
        },
      ],
    },
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
          options: [
            {
              label: "Maternity/Paternity Leave",
              value: 3,
            },
            {
              label: "Annual Leave",
              value: 2,
            },
            {
              label: "Sick Leave",
              value: 1,
            },
            {
              label: "Exam Leave",
              value: 0,
            },
          ],
        },
        {
          name: "Start Date",
          type: "date",
          placeholder: "Select",
        },
        {
          name: "End Date",
          type: "date",
          placeholder: "Select",
        },
        {
          name: "Reason",
          type: "text",
          placeholder: "Placeholder",
        },
        {
          name: "Relief Officer",
          type: "select",
          selectValControlledFromOutside: false,
          placeholder: "Select",
          options: [
            {
              label: "Sandra Allibaba",
              value: 0,
            },
          ],
        },
        {
          name: "Relief Officer's Email",
          type: "text",
          placeholder: "Placeholder",
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => setOpenRequestTimeOffModal(false),
    },
    buttonTwo: {
      type: ButtonType.disabled,
      text: "Submit",
      onClick: () => {
        setOpenSuccessModal(true);
        setOpenRequestTimeOffModal(false);
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
      onClick: () => setOpenDeleteModal(false),
    },
  };

  const leaveDetailsModalData: ModalProps = {
    open: openLeaveDetailsModal,
    onClose: () => setOpenLeaveDetailsModal(false),
    title: "View Leave Details",
    subtitle: "Fill in the details below to request time off",
    detailGroup: {
      gridLayout: "view-details",
      details: [
        { name: "Leave Type", value: "Sick Leave" },
        { name: "Leave Duration", value: "10 days" },
        { name: "Status", value: "Approved" },
        {
          name: "Start Date",
          value: `22-Jun-2024`,
        },
        {
          name: "End Date",
          value: `18-Jul-2024`,
        },
      ],
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
