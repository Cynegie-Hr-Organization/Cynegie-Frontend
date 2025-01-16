"use client";

import Page from "@/app/_components/shared/page";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { route } from "@/constants";
import { useRouter } from "next/navigation";

const HrAdminDeviceInventory = () => {
  const router = useRouter();
  return (
    <Page
      backText="Device Dashboard"
      onBackTextClick={() =>
        router.push(route.hrAdmin.deviceManagement.overview.home)
      }
      title="Device Inventory"
    >
      <Table
        hasActionsColumn
        headerRowData={[
          "Device Type",
          "Serial Number",
          "Model",
          "Assigned To",
          "Department",
          "Status",
        ]}
        fieldTypes={[...Array(5).fill(FieldType.text), FieldType.status]}
        displayedFields={[
          "deviceType",
          "serialNumber",
          "model",
          "assignedTo",
          "department",
          "status",
        ]}
        bodyRowData={Array(8).fill({
          deviceType: "HP Elitebook",
          serialNumber: "W88401231AX",
          model: "2021",
          assignedTo: "Ayomide Alibaba",
          department: "Sales",
          status: "Active",
        })}
        statusMap={{ Active: "success" }}
        formFilter={{
          gridSpacing: 3,
          inputFields: [
            {
              label: "Device Type",
              type: "select",
            },
            {
              label: "Department",
              type: "select",
            },
            {
              label: "Status",
              type: "select",
            },
          ],
        }}
        actions={[
          {
            name: "View Details",
            onClick: () =>
              router.push(
                route.hrAdmin.deviceManagement.overview.viewDeviceInfo
              ),
          },
        ]}
      />
    </Page>
  );
};

export default HrAdminDeviceInventory;
