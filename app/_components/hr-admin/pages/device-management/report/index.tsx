"use client";

import SvgIcon from "@/app/_components/icons/container";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { icon } from "@/constants";

const HrAdminDeviceReport = () => {
  return (
    <Page
      title="Device Assignment Report"
      rightButton={{
        type: ButtonType.outlinedBlue,
        text: "Generate Report",
        icon: <SvgIcon path={icon.checkCircle} width={16.67} height={16.67} />,
      }}
    >
      <Table
        headerRowData={["Assigned Date", "Device Type", "Employee", "Status"]}
        fieldTypes={[...Array(3).fill(FieldType.text), FieldType.status]}
        displayedFields={["assignedDate", "deviceType", "employee", "status"]}
        bodyRowData={Array(8).fill({
          assignedDate: "03 Jun 2024",
          deviceType: "Macbook Pro 2021",
          employee: "Ayomide Alibaba",
          status: "Assigned",
        })}
        statusMap={{ Assigned: "success" }}
        formFilter={{
          inputFields: [],
        }}
        actions={[
          {
            name: "Generate in PDF Format",
            onClick: () => {},
          },
          {
            name: "Generate in CSV Format",
            onClick: () => {},
          },
        ]}
      />
    </Page>
  );
};

export default HrAdminDeviceReport;
