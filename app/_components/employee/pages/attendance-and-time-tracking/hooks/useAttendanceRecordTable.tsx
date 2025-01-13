import { useEffect, useState } from 'react';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
// import { AttendanceStatusMap } from '@/constants';
import { ButtonType } from '../../../../shared/page/heading/types';
import { ModalProps } from '../../../modal/types';
import { AttendanceRecord, fetchAttendanceMine } from '@/app/api/services/employee/attendance';

const useAttendanceRecordTable = () => {
const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openCorrectionModal, setOpenCorrectionModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  // Fetch attendance data from the API
  useEffect(() => {
    const loadAttendanceData = async () => {
      try {
        const data = await fetchAttendanceMine();
        // Sort the data in descending order based on the 'date'
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setAttendanceData(sortedData);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      }
    };
    loadAttendanceData();
  }, []);

  // Transform API data for table usage
  // Check if attendanceData is not empty and then transform it
  const transformedAttendanceData = attendanceData.length > 0 
    ? attendanceData.map((record) => ({
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
        status: '---', // or any other logic to determine the status
      }))
    : []; // Default empty array in case no data is fetched

  const attendanceRecordTableData: TableProps = {
    title: 'Attendance Record',
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: [
      'Date',
      'Clock In Time',
      'Clock Out Time',
      'Hours Worked',
      'Status',
    ],
    bodyRowData: transformedAttendanceData,
    displayedFields: [
      'date',
      'clockInTime',
      'clockOutTime',
      'hoursWorked',
      'status',
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
        name: 'Request correction',
        onClick: () => setOpenCorrectionModal(true),
      },
      { name: 'View Details', onClick: () => setOpenDetailsModal(true) },
    ],
    filters: [{ name: 'Status', items: ['Present', 'Late', 'Absent'] }],
    fieldToReturnOnActionItemClick: 'status',
    page: 1,
    pageCount: Math.ceil(transformedAttendanceData.length / 10), // Example pagination logic
  };

  const detailsModalData: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: 'View Attendance Details',
    subtitle: 'View attendance details below',
    detailGroup: {
      details: [
        { name: 'Date', value: '08/01/2025' },
        { name: 'Clock In Time', value: '16:04	 AM' },
        { name: 'Clock Out Time', value: '19:14	 PM' },
        {
          name: 'Hours Worked',
          value: `3 hours`,
        },
        {
          name: 'Status',
          value: `---`,
        },
      ],
      gridLayout: 'view-details',
    },
  };

  const correctionModalData: ModalProps = {
    open: openCorrectionModal,
    onClose: () => setOpenCorrectionModal(false),
    title: 'Request Correction',
    subtitle: 'Fill the details below',
    form: {
      inputFields: [
        { name: 'Date', type: 'date' },
        { name: 'Correct Clock In Time', type: 'time' },
        { name: 'Correct Clock Out Time', type: 'time' },
        { name: 'Reason for Correction', type: 'message' },
        { name: 'Attachments', type: 'drag-upload' },
      ],
      isCard: false,
      gridSpacing: 3,
      layout: 'request-correction',
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: 'Cancel',
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
    centerImage: '/icons/modal-success.svg',
    centerTitle: 'Your request for correction has been successfully submitted',
    buttonOne: {
      type: ButtonType.contained,
      text: 'Continue to Dashboard',
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
