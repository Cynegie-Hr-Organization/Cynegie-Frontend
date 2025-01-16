"use client";
import Modal from "@/app/_components/employee/modal";
import ButtonGroup from "@/app/_components/shared/button-group";
import DetailGroup from "@/app/_components/shared/detail-group";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import { icon, route } from "@/constants";
import { useRouter } from "next/navigation";
import useApprovalConfirmationModal from "../hooks/useApprovalConfirmationModal";

const HrAdminEmployeeManagementApprovalRequestDetails = () => {
  const router = useRouter();
  const {
    openConfirmationModal,
    setOpenConfirmationModal,
    confirmationModalProps,
  } = useApprovalConfirmationModal();

  return (
    <Page
      backText="Back to Approval Management"
      onBackTextClick={() =>
        router.push(route.hrAdmin.employeeManagement.approvalManagement.home)
      }
    >
      <SectionCardContainer isCard title="Leave Request Details">
        <DetailGroup
          gridLayout="3-columns"
          details={[
            {
              name: "Name",
              value: "Emmanuel Jacob",
            },
            {
              name: "Staff ID",
              value: "CYN0017",
            },
            {
              name: "Department",
              value: "HR",
            },
            {
              name: "Job Title",
              value: "Senior Manager",
            },
            {
              name: "Status",
              value: "Pending",
              type: "status",
              statusMap: { Pending: "warning" },
            },
            {
              name: "Leave Type",
              value: "Annual Leave",
            },
            {
              name: "Start Date",
              value: "Oct 5, 2024",
            },
            {
              name: "End Date",
              value: "Oct 15, 2024",
            },
            {
              name: "Total Days Requested",
              value: "12",
            },
            {
              name: "Reason for Leave",
              value: "Vacation with family",
            },
            {
              name: "Supporting Document",
              type: "document",
              value: "Download medical certificate.pdf",
              icon: icon.download,
            },
          ]}
        />
        <div className="mt-2"></div>
        <Form
          gridSpacing={4}
          inputFields={[
            {
              label: "Assign Backup Employee",
              type: "select",
              placeholder: "Select Employee",
            },
            {
              label: "Add Comments",
              type: "message",
            },
          ]}
        />
        <div className="mb-2"></div>
      </SectionCardContainer>
      <ButtonGroup
        leftButton={{ type: ButtonType.outlined, text: "Reject" }}
        rightButton={{
          type: ButtonType.contained,
          text: "Approve",
          onClick: () => setOpenConfirmationModal(true),
        }}
        position="end"
      />
      {openConfirmationModal && (
        <Modal
          {...confirmationModalProps}
          buttonTwo={{
            ...confirmationModalProps.buttonTwo,
            onClick: () =>
              router.push(
                route.hrAdmin.employeeManagement.approvalManagement.home
              ),
          }}
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeManagementApprovalRequestDetails;
