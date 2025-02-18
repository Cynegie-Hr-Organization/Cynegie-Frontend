"use client";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import Table from "@/app/_components/shared/table";
import { TableProps } from "@/app/_components/shared/table/types";
import { AttendanceStatusMap, route } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
// import DownloadReportModal from '../../../payroll-management/modals/download-report';
import BarChart, {
  BarChartProps,
} from "@/app/_components/employee/pages/attendance-and-time-tracking/total-hours-worked/chart";
import { CardProps } from "@/app/_components/shared/section-with-cards/types";

type HrAdminEmployeeAttendanceManagementReportProps = {
  title: string;
  cards: CardProps[];
  tableProps: Omit<TableProps, "statusMap">;
  barChart?: BarChartProps;
  cardsLoading?: boolean;
};

const HrAdminEmployeeAttendanceManagementReport: React.FC<
  HrAdminEmployeeAttendanceManagementReportProps
> = ({ title, cards, tableProps, barChart, cardsLoading }) => {
  const router = useRouter();
  // const [openDownloadModal, setOpenDownloadModal] = useState(false);
  return (
    <Page
      backText="Back to Attendance Management"
      onBackTextClick={() =>
        router.push(route.hrAdmin.employeeManagement.attendanceManagement.home)
      }
      title={title}
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: "Download Report",
        // onClick: () => setOpenDownloadModal(true),
      }}
    >
      <CardGroup
        cards={cards}
        loading={cardsLoading}
        gridItemSize={{ xs: 12, sm: 6, md: 3 }}
      />
      {barChart && (
        <div className="common-card">
          <BarChart {...barChart} />
        </div>
      )}
      <Table {...tableProps} statusMap={AttendanceStatusMap} />
      {/* {openDownloadModal && (
        <DownloadReportModal
          open={openDownloadModal}
          onCloseFn={() => setOpenDownloadModal(false)}
        />
      )} */}
    </Page>
  );
};

export default HrAdminEmployeeAttendanceManagementReport;
