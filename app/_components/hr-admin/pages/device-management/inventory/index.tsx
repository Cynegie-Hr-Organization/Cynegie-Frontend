"use client";

import Page from "@/app/_components/shared/page";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { get } from "@/app/api/services/it-admin/device";
import { route } from "@/constants";
import { DeviceListResponse } from "@/types/api-index";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MappedDevices = {
  deviceId: string;
  deviceType: string;
  deviceName: string;
  serialNumber: string;
  assignedTo: string;
  department: string;
  status: string;
};

const HrAdminDeviceInventory = () => {
  const router = useRouter();
  const [devices, setDevices] = useState<MappedDevices[]>();

  const getDevices = (): Promise<DeviceListResponse> =>
    get("devices", { page: 1, limit: 10, sortOrder: "asc" });

  const { data: devicesData } = useQuery({
    queryKey: ["devices"],
    queryFn: getDevices,
  });

  useEffect(() => {
    if (devicesData) {
      setDevices(
        devicesData.devices.map((device) => ({
          deviceId: device.id,
          deviceType: device.deviceType.name,
          deviceName: device.deviceName,
          serialNumber: device.serialNumber,
          assignedTo:
            device.employeeAssigned.personalInfo.firstName +
            " " +
            device.employeeAssigned.personalInfo.lastName,
          department:
            device.employeeAssigned.employmentInformation.department
              .departmentName,
          status: device.status,
        }))
      );
    } else {
      setDevices(undefined);
    }
  }, [devicesData]);

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
          "Device ID",
          "Device Type",
          "Device Name",
          "Serial Number",
          "Assigned To",
          "Department",
          "Status",
        ]}
        fieldTypes={[...Array(6).fill(FieldType.text), FieldType.status]}
        displayedFields={[
          "deviceId",
          "deviceType",
          "deviceName",
          "serialNumber",
          "assignedTo",
          "department",
          "status",
        ]}
        bodyRowData={devices}
        statusMap={{ active: "success" }}
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
