import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { AttendanceStatusMap } from '@/constants';
import { useState } from 'react';
import { ButtonType } from '../../../../shared/page/heading/types';
import { ModalProps } from '../../../modal/types';

const useAttendanceRecordTable = () => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openCorrectionModal, setOpenCorrectionModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

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
    bodyRowData: [
      {
        date: '12 July 2024',
        clockInTime: '08:00AM',
        clockOutTime: '05:00PM',
        hoursWorked: '8 hours',
        status: 'Late',
      },
      {
        date: '12 July 2024',
        clockInTime: '08:00AM',
        clockOutTime: '05:00PM',
        hoursWorked: '8 hours',
        status: 'Present',
      },
      {
        date: '12 July 2024',
        clockInTime: '08:00AM',
        clockOutTime: '05:00PM',
        hoursWorked: '8 hours',
        status: 'Absent',
      },
      {
        date: '12 July 2024',
        clockInTime: '08:00AM',
        clockOutTime: '05:00PM',
        hoursWorked: '8 hours',
        status: 'Present',
      },
      {
        date: '12 July 2024',
        clockInTime: '08:00AM',
        clockOutTime: '05:00PM',
        hoursWorked: '8 hours',
        status: 'Present',
      },
    ],
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
    statusMap: AttendanceStatusMap,
    actions: [
      {
        name: 'Request correction',
        onClick: () => setOpenCorrectionModal(true),
      },
      { name: 'View Details', onClick: () => setOpenDetailsModal(true) },
    ],
    filters: [{ name: 'Status', items: ['Present', 'Late', 'Absent'] }],
    fieldToReturnOnActionItemClick: 'status',
    page: 3,
    pageCount: 5,
  };

  const detailsModalData: ModalProps = {
    open: openDetailsModal,
    onClose: setOpenDetailsModal,
    title: 'View Attendance Details',
    subtitle: 'View attendance details below',
    detailGroup: {
      details: [
        { name: 'Date', value: '12 July 2024' },
        { name: 'Clock In Time', value: '08:00 AM' },
        { name: 'Clock Out Time', value: '05:00 PM' },
        {
          name: 'Hours Worked',
          value: `8 hours`,
        },
        {
          name: 'Status',
          value: `Present`,
        },
      ],
      gridLayout: 'view-details',
    },
  };

  const correctionModalData: ModalProps = {
    open: openCorrectionModal,
    onClose: setOpenCorrectionModal,
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
        setOpenCorrectionModal(false), setOpenSuccessModal(true);
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
