"use client";

import Modal from "@/app/_components/employee/modal";
import ButtonGroup from "@/app/_components/shared/button-group";
import DetailGroup from "@/app/_components/shared/detail-group";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import { APRStatusMap, icon, route } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HrAdminDeviceManagementViewRequest = () => {
  const router = useRouter();
  const [openApprovalSuccessModal, setOpenApprovalSuccessModal] =
    useState(false);
  const [openRejectConfirmationModal, setOpenRejectConfirmationModal] =
    useState(false);
  return (
    <Page
      backText="Device Dashboard"
      onBackTextClick={() =>
        router.push(route.hrAdmin.deviceManagement.overview.home)
      }
      title="Device Requests"
    >
      <SectionCardContainer isCard title="Request Details">
        <DetailGroup
          details={[
            {
              name: "Request Type",
              value: "New Device Request",
            },
            {
              name: "Employee",
              value: "Salem David",
            },
            {
              name: "Device Type",
              value: "Macbook Pro 2021",
            },
            {
              name: "Status",
              type: "status",
              statusMap: APRStatusMap,
              value: "Pending",
            },
            {
              name: "Device Details",
              value: `Device name: HP Elitebook\nProcessor:	14th Gen Intel(R) Core(TM) i8-1335U   1.40 GHz\nInstalled RAM:	16.0 GB (15.6 GB usable)\nDevice ID:	ABCDEFG6-1234-123-AVBNHJKI\nProduct ID: ABVG-1234\nSystem type:	64-bit operating system, x64-based processor\nPen and touch	No pen or touch input is available for this display`,
            },
            {
              name: "Note",
              value: "-",
            },
          ]}
        />
      </SectionCardContainer>
      <ButtonGroup
        leftButton={{
          type: ButtonType.deleteContained,
          text: "Reject Request",
          onClick: () => setOpenRejectConfirmationModal(true),
        }}
        rightButton={{
          type: ButtonType.contained,
          text: "Approve Request",
          onClick: () => setOpenApprovalSuccessModal(true),
        }}
        position="end"
      />
      {openApprovalSuccessModal && (
        <Modal
          open={openApprovalSuccessModal}
          onClose={() => {}}
          hasHeading={false}
          centerImage={icon.successTick}
          centerTitle="You have successfully approved this device request"
          centerMessage="You can now proceed to the dashboard to continue"
          centerButton
          buttonOne={{
            type: ButtonType.contained,
            text: "Continue to Dashboard",
            onClick: () =>
              router.push(route.hrAdmin.deviceManagement.overview.home),
          }}
          reduceVerticalGap
        />
      )}
      {openRejectConfirmationModal && (
        <Modal
          open={openRejectConfirmationModal}
          onClose={() => setOpenRejectConfirmationModal(false)}
          hasHeading={false}
          centerImage={icon.deleteX}
          centerTitle="Reject Request"
          centerMessage="If you reject this request, it will not be assigned to any employee"
          centerButton
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
            onClick: () => setOpenRejectConfirmationModal(false),
          }}
          buttonTwo={{
            type: ButtonType.deleteContained,
            text: "Reject Request",
            onClick: () =>
              router.push(route.hrAdmin.deviceManagement.overview.home),
          }}
          reduceVerticalGap
        />
      )}
    </Page>
  );
};
export default HrAdminDeviceManagementViewRequest;
