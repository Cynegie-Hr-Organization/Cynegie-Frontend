import { useEffect, useState } from 'react';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { ButtonType } from '../../../../shared/page/heading/types';
import { ModalProps } from '../../../modal/types';
import { AttendanceRecord, fetchAttendanceById, fetchAttendanceMine } from '@/app/api/services/employee/attendance';
import { formatDate } from '@/lib/utils';

const useAttendanceRecordTable = () => {
const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openCorrectionModal, setOpenCorrectionModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
const [detailsData , setDetailsData] = useState<any | null>(null);

  useEffect(() => {
    const loadAttendanceData = async () => {
      try {
        const data = await fetchAttendanceMine();
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setAttendanceData(sortedData);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      }
    };
    loadAttendanceData();
  }, []);

  const transformedAttendanceData = attendanceData.length > 0 
    ? attendanceData.map((record) => ({
      id : record.id,
        date: new Date(record.date).toLocaleDateString(),
        clockInTime: record.clockIn
          ? new Date(record.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'N/A',
        clockOutTime: record.clockOut
          ? new Date(record.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'N/A',
        hoursWorked: record.clockIn && record.clockOut
          ? `${Math.round((new Date(record.clockOut).getTime() - new Date(record.clockIn).getTime()) / 3600000)} hours`
          : 'N/A',
        status: '---', 
      }))
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
          try
          {
            const response = await fetchAttendanceById(id);
            console.log(response);
            setDetailsData(response);
            setOpenDetailsModal(true)
          }
          catch (error)
          {
            console.error("Failed to fetch leave request details:", error);
          }
        }

      },
    ],
    filters: [{ name: 'Status', items: ['Present', 'Late', 'Absent'] }],
    fieldToReturnOnActionItemClick: 'id',
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
  { name: 'Date', value: `${formatDate(detailsData?.date)}` },
  { name: 'Clock In Time', value: `${formatDate(detailsData?.clockIn)}` },
  { name: 'Clock Out Time', value: `${formatDate(detailsData?.clockOut)}` },
  {
    name: 'Hours Worked',
    value:
      detailsData?.clockIn && detailsData?.clockOut
        ? `${Math.round(
            (new Date(detailsData.clockOut).getTime() -
              new Date(detailsData.clockIn).getTime()) /
              3600000
          )} hours`
        : 'N/A',
  },
  {
    name: 'Status',
    value: `${detailsData?.status ?? '---'}`,
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
      text: 'Submit Request',
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
  };
};

export default useAttendanceRecordTable;
