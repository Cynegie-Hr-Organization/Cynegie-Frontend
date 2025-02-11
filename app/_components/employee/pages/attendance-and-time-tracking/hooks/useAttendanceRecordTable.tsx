import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { ButtonType } from "../../../../shared/page/heading/types";
import { ModalProps } from "../../../modal/types";
import {
  AttendanceResponse,
  fetchAttendanceById,
  fetchAttendanceMine,
  getCurrentAttendanceRecords,
} from "@/app/api/services/employee/attendance";
import { formatDate } from "@/lib/utils";
import { SectionWithCardsProps } from "@/app/_components/shared/section-with-cards/types";

const useAttendanceRecordTable = () => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openCorrectionModal, setOpenCorrectionModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [detailsData, setDetailsData] = useState<any | null>(null);

  const { data: attendanceDataResponse } = useQuery<AttendanceResponse>({
    queryKey: ["attendanceRecords"],
    queryFn: () => fetchAttendanceMine("desc", 1, 10),
  });

  const attendanceData = attendanceDataResponse?.data || [];

  const { data: currentAttendanceRecordsResponse } = useQuery({
    queryKey: ["currentAttendanceRecords"],
    queryFn: getCurrentAttendanceRecords,
  });

  const currentAttendanceRecordsSectionData: SectionWithCardsProps = {
    title: "Current Attendance Records",
    period: "This week",
    headerDivider: true,
    cardsData: [
      {
        value: 0,
        iconColorVariant: "info",
        labelText: "Total Days",
        hasIcon: true,
      },
      {
        value: 0,
        iconColorVariant: "warning",
        labelText: "Days Late",
        hasIcon: true,
      },
      {
        value: 0,
        iconColorVariant: "error",
        labelText: "Days Absent",
        hasIcon: true,
      },
    ],
  };

  if (currentAttendanceRecordsResponse) {
    const attendanceSummary = currentAttendanceRecordsResponse;

    let totalDays = 0;
    let daysLate = 0;
    let daysAbsent = 0;

    console.log(attendanceSummary);

    if (attendanceSummary) {
      Object.values(attendanceSummary).forEach((day: any) => {
        if (day.present > 0) {
          totalDays += 1;
        }
        if (day.late > 0) {
          daysLate += 1;
        }
        if (day.present === 0) {
          daysAbsent += 1;
        }
      });
    }

    if (currentAttendanceRecordsSectionData.cardsData) {
      currentAttendanceRecordsSectionData.cardsData[0].value = totalDays;
      currentAttendanceRecordsSectionData.cardsData[1].value = daysLate;
      currentAttendanceRecordsSectionData.cardsData[2].value = daysAbsent;
    }
  }

  const transformedAttendanceData =
    attendanceData.length > 0
      ? attendanceData.map((record) => {
          const clockInDate = record.clockIn ? new Date(record.clockIn) : null;
          const clockOutDate = record.clockOut
            ? new Date(record.clockOut)
            : null;

          return {
            id: record.attendanceId,
            date: new Date(record.date).toLocaleDateString(),
            clockInTime:
              clockInDate && !isNaN(clockInDate.getTime())
                ? clockInDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
            clockOutTime:
              clockOutDate && !isNaN(clockOutDate.getTime())
                ? clockOutDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
            hoursWorked:
              clockInDate &&
              clockOutDate &&
              !isNaN(clockInDate.getTime()) &&
              !isNaN(clockOutDate.getTime())
                ? `${Math.round((clockOutDate.getTime() - clockInDate.getTime()) / 3600000)} hours`
                : "N/A",
            status: record.attendanceStatus,
          };
        })
      : [];

  const attendanceRecordTableData: TableProps = {
    title: "Attendance Record",
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: [
      "Date",
      "Clock In Time",
      "Clock Out Time",
      "Hours Worked",
      "Status",
    ],
    bodyRowData: transformedAttendanceData,
    displayedFields: [
      "date",
      "clockInTime",
      "clockOutTime",
      "hoursWorked",
      "status",
    ],
    fieldTypes: [
      FieldType.text,
      FieldType.text,
      FieldType.text,
      FieldType.text,
      FieldType.attendanceStatus,
    ],
    actions: [
      {
        name: "Request correction",
        onClick: () => setOpenCorrectionModal(true),
      },
      {
        name: "View Details",
        onClick: () => setOpenDetailsModal(true),
        onDataReturned: async (id) => {
          try {
            const response = await fetchAttendanceById(id);
            console.log(response);
            setDetailsData(response);
            setOpenDetailsModal(true);
          } catch (error) {
            console.error("Failed to fetch attendance details:", error);
          }
        },
      },
    ],
    filters: [{ name: "Status", items: ["Present", "Late", "Absent"] }],
    fieldToReturnOnActionItemClick: "id",
    page: 1,
    pageCount: Math.ceil(transformedAttendanceData.length / 10),
  };

  const detailsModalData: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: "View Attendance Details",
    subtitle: "View attendance details below",
    detailGroup: {
      details: [
        {
          name: "Date",
          value: detailsData?.date ? formatDate(detailsData.date) : "",
        },
        {
          name: "Clock In Time",
          value: detailsData?.clockIn ? formatDate(detailsData.clockIn) : "",
        },
        {
          name: "Clock Out Time",
          value: detailsData?.clockOut ? formatDate(detailsData.clockOut) : "",
        },
        {
          name: "Hours Worked",
          value:
            detailsData?.clockIn && detailsData?.clockOut
              ? `${Math.round(
                  (new Date(detailsData.clockOut).getTime() -
                    new Date(detailsData.clockIn).getTime()) /
                    3600000,
                )} hours`
              : "N/A",
        },
        {
          name: "Status",
          value: `${detailsData?.attendanceStatus ?? "---"}`,
        },
      ],
      gridLayout: "view-details",
    },
  };

  const correctionModalData: ModalProps = {
    open: openCorrectionModal,
    onClose: () => setOpenCorrectionModal(false),
    title: "Request Correction",
    subtitle: "Fill the details below",
    form: {
      inputFields: [
        { label: "Date", type: "date" },
        { label: "Correct Clock In Time", type: "time" },
        { label: "Correct Clock Out Time", type: "time" },
        { label: "Reason for Correction", type: "message" },
        { label: "Attachments", type: "drag-upload" },
      ],
      isCard: false,
      gridSpacing: 3,
      layout: "request-correction",
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => setOpenCorrectionModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: "Submit Request",
      onClick: () => {
        setOpenCorrectionModal(false);
        setOpenSuccessModal(true);
      },
    },
  };

  const successModalData: ModalProps = {
    open: openSuccessModal,
    onClose: setOpenSuccessModal,
    hasHeading: false,
    centerImage: "/icons/modal-success.svg",
    centerTitle: "Your request for correction has been successfully submitted",
    buttonOne: {
      type: ButtonType.contained,
      text: "Continue to Dashboard",
      onClick: () => setOpenSuccessModal(false),
    },
    centerButton: true,
    reduceVerticalGap: true,
  };

  const modalsData = [detailsModalData, correctionModalData, successModalData];

  return {
    attendanceRecordTableData,
    modalsData,
    currentAttendanceRecordsSectionData,
  };
};

export default useAttendanceRecordTable;
