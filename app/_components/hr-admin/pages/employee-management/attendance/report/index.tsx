"use client";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import Table from "@/app/_components/shared/table";
import { TableProps } from "@/app/_components/shared/table/types";
import { route } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import DownloadReportModal from '../../../payroll-management/modals/download-report';
import Modal from "@/app/_components/employee/modal";
import BarChart, {
  BarChartProps,
} from "@/app/_components/employee/pages/attendance-and-time-tracking/total-hours-worked/chart";
import { CardProps } from "@/app/_components/shared/section-with-cards/types";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { downloadFile } from "./api/export";

type HrAdminEmployeeAttendanceManagementReportProps = {
  title: string;
  cards: CardProps[];
  tableProps: Omit<TableProps, "statusMap">;
  barChart?: BarChartProps;
  cardsLoading?: boolean;
  exportParams?: {
    employeeId?: string;
    startDate: string;
    endDate: string;
  };
};

const HrAdminEmployeeAttendanceManagementReport: React.FC<
  HrAdminEmployeeAttendanceManagementReportProps
> = ({ title, cards, tableProps, barChart, cardsLoading, exportParams }) => {
  const router = useRouter();
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<"pdf" | "excel">();
  const [mutationLoading, setMutationLoading] = useState(false);

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
        onClick: () => setOpenDownloadModal(true),
      }}
    >
      <CardGroup
        cards={cards}
        loading={cardsLoading}
        gridItemSize={{ xs: 12, sm: 6, md: 3 }}
      />
      {barChart && (
        <div className="common-card">
          {cardsLoading ? (
            <div className="flex justify-center py-10">
              <CircularProgress />
            </div>
          ) : (
            <BarChart {...barChart} />
          )}
        </div>
      )}
      <Table
        {...tableProps}
        statusMap={{ on_leave: "info", late: "warning" }}
      />
      {openDownloadModal && (
        <>
          <Modal
            open={openDownloadModal}
            onClose={() => {
              if (!mutationLoading) setOpenDownloadModal(false);
              if (selectedDoc) setSelectedDoc(undefined);
            }}
            hasHeading={false}
            centerTitle="Download Report"
            centerMessage="Select the format you would like to download your report"
            hasDocSelect
            getDoc={setSelectedDoc}
            reduceVerticalGap
            buttonOne={{
              type: mutationLoading ? ButtonType.disabled : ButtonType.outlined,
              text: "Cancel",
              onClick: () => {
                setOpenDownloadModal(false);
                if (selectedDoc) setSelectedDoc(undefined);
              },
            }}
            buttonTwo={{
              type: mutationLoading
                ? ButtonType.disabledLoading
                : selectedDoc
                ? ButtonType.download
                : ButtonType.disabled,
              text: mutationLoading ? "" : "Download",
              onClick: async () => {
                if (selectedDoc && exportParams) {
                  setMutationLoading(true);
                  downloadFile(
                    exportParams.employeeId
                      ? `attendance/export/${exportParams.employeeId}`
                      : "attendance/export",
                    `attendance_${dayjs(exportParams.startDate).format(
                      "DD-MM-YYYY"
                    )}_${dayjs(exportParams.endDate).format("DD-MM-YYYY")}.${
                      selectedDoc === "pdf" ? "pdf" : "xlsx"
                    }`,
                    selectedDoc ?? "pdf",
                    {
                      page: 1,
                      limit: 10,
                      sortOrder: "asc",
                      ...exportParams,
                      format: selectedDoc,
                    }
                  )
                    .then(() => setOpenDownloadModal(false))
                    .catch(() => {
                      console.error("An error occured");
                    })
                    .finally(() => setMutationLoading(false));
                }
              },
            }}
          />
        </>
      )}
    </Page>
  );
};

export default HrAdminEmployeeAttendanceManagementReport;
