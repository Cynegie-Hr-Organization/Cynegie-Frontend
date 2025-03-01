"use client";

import Modal from "@/app/_components/employee/modal";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { route } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HrAdminAppManagementAccessTracking = () => {
  const router = useRouter();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  return (
    <Page
      backText="Back to App Dashboard"
      onBackTextClick={() => router.push(route.hrAdmin.appManagement.overview)}
      title="App Access List"
      subtitle="Track and Access Employees"
    >
      <Table
        hasActionsColumn
        headerRowData={[
          "Employee",
          "App Name",
          "Access Status",
          "Department",
          "Access Date",
        ]}
        fieldTypes={[
          ...Array(2).fill(FieldType.text),
          FieldType.status,
          ...Array(2).fill(FieldType.text),
        ]}
        displayedFields={[
          "employee",
          "appName",
          "accessStatus",
          "department",
          "accessDate",
        ]}
        bodyRowData={Array(8).fill({
          employee: "Ayomide Alibaba",
          appName: "Figma",
          accessStatus: "Inactive",
          department: "UI/UX Department",
          accessDate: "30 July 2024",
        })}
        formFilter={{
          gridSpacing: 3,
          inputFields: [
            {
              label: "Name",
              type: "select",
            },
            {
              label: "Department",
              type: "select",
            },
            {
              label: "Access Status",
              type: "select",
            },
          ],
        }}
        statusMap={{ Inactive: "warning" }}
        actions={[
          {
            name: "View Details",
            onClick: () => setOpenDetailsModal(true),
          },
          {
            name: "Edit",
            onClick: () => setOpenEditModal(true),
          },
        ]}
      />
      {openDetailsModal && (
        <Modal
          open={openDetailsModal}
          onClose={() => setOpenDetailsModal(false)}
          title="View Details"
          subtitle="View details below"
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                label: "App Name",
                type: "select",
                value: "Figma",
                disabled: true,
              },
              {
                label: "Department",
                type: "select",
                value: "UI/UX Department",
                disabled: true,
              },
              {
                label: "Employee Name",
                type: "select",
                value: "John Doe",
                disabled: true,
              },
              {
                label: "Access Status",
                type: "select",
                value: "Active",
                disabled: true,
              },
              {
                label: "Access Date",
                type: "text",
                value: "30 July 2024",
                disabled: true,
              },
              {
                label: "App Details",
                type: "message",
                disabled: true,
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
            onClick: () => setOpenDetailsModal(false),
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: "Edit App",
            onClick: () => {
              setOpenDetailsModal(false);
              setOpenEditModal(true);
            },
          }}
        />
      )}
      {openEditModal && (
        <Modal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          title="Edit Details"
          subtitle="Edit details below"
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                label: "App Name",
                type: "select",
              },
              {
                label: "Department",
                type: "select",
              },
              {
                label: "Employee Name",
                type: "select",
              },
              {
                label: "Access Status",
                type: "select",
              },
              {
                label: "Access Date",
                type: "date",
              },
              {
                label: "App Details",
                type: "message",
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
            onClick: () => setOpenEditModal(false),
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: "Save Changes",
            onClick: () => setOpenEditModal(false),
          }}
        />
      )}
    </Page>
  );
};

export default HrAdminAppManagementAccessTracking;
