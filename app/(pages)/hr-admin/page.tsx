'use client';
// import EmployeeAppRequestsAndPermissions from '@/app/_components/employee/pages/app-requests-and-permissions';
// import EmployeeAttendanceAndTimeTracking from '@/app/_components/employee/pages/attendance-and-time-tracking';
// import EmployeeDeviceManagement from '@/app/_components/employee/pages/device-management';
// import EmployeeLearningAndDevelopment from '@/app/_components/employee/pages/learning-and-development';
// import EmployeePayroll from '@/app/_components/employee/pages/payroll';
// import HrAdminDashboardPage from '@/app/_components/hr-admin/pages/dashboard';
import Loading from '@/app/_components/shared/loading';
import { Suspense /*useState*/ } from 'react';
// import EmployeeNotificationPanel from '@/app/_components/employee/pages/notification-panel';
// import EmployeePerformanceManagement from '@/app/_components/employee/pages/performance-management';
// import EmployeeLeaveManagementPage from '@/app/_components/employee/pages/leave-management';
// import { payrollOverviewTableData } from '@/app/_components/hr-admin/pages/payroll-management/tables/overview/data';
// import { FieldType } from '@/app/_components/shared/table/types';
// import Modal from '@/app/_components/employee/modals/modal';
// import { ModalProps } from '@/app/_components/employee/modals/modal/types';
// import { ButtonType } from '@/app/_components/shared/page/heading/types';
// import EmployeeLearningAndDevelopmentMyCourses from '@/app/_components/employee/pages/learning-and-development/pages/course-details';
// import courseDetails from '@/app/_components/employee/pages/learning-and-development/pages/course-details/data/course';

// type DetailsModalData = Omit<ModalProps, 'open' | 'onClose'>;

// const leaveDetails: DetailsModalData = {
//   title: 'View Leave Details',
//   subtitle: 'Fill in the details below to request time off',
//   details: [
//     { name: 'Leave Type', value: 'Sick Leave' },
//     { name: 'Leave Duration', value: '10 days' },
//     { name: 'Status', value: 'Approved' },
//     {
//       name: 'Start Date',
//       value: `22-Jun-2024`,
//     },
//     {
//       name: 'End Date',
//       value: `18-Jul-2024`,
//     },
//   ],
// };

const DashboardPage = () => {
  // const [openModal, setOpenModal] = useState(true);
  // const [selectValue, setSelectValue] = useState<string | number | undefined>();

  // const deviceDetails: DetailsModalData = {
  //   title: 'Feedback Form',
  //   subtitle: 'Evaluate Course',
  //   // details: [
  //   //   { name: 'Assigned To', value: 'Salem David' },
  //   //   { name: 'Device Type', value: 'Macbook Pro 2021' },
  //   //   { name: 'Serial Number', value: 'W88401231AX' },
  //   //   {
  //   //     name: 'Device Details',
  //   //     value: `Device name HP Elitebook\nProcessor	14th Gen Intel(R) Core(TM) i8-1335U   1.40 GHz\nInstalled RAM	16.0 GB (15.6 GB usable)\nDevice ID	ABCDEFG6-1234-123-AVBNHJKI\nProduct ID ABVG-1234\nSystem type 64-bit operating system, x64-based processor\nPen and touch No pen or touch input is available for this display`,
  //   //   },
  //   // ],
  //   buttonOne: {
  //     type: ButtonType.outlined,
  //     text: 'Cancel',
  //   },
  //   // centerButton: true,
  //   buttonTwo: {
  //     type: ButtonType.outlined,
  //     text: 'Submit',
  //   },
  //   // hasHeading: false,
  //   // centerImage: '/icons/modal-delete.svg',
  //   // centerTitle: 'Delete Request',
  //   // centerMessage:
  //   //   'If you delete this leave request, admin will be notified and your request wil be withdrawn. You can reapply at anytime',
  //   // reduceVerticalGap: true,
  //   inputFields: [
  //     {
  //       name: 'What did you like about the course',
  //       type: 'message',
  //       placeholder: 'Enter your feedback here',
  //     },
  //     {
  //       name: 'What can be improved',
  //       type: 'message',
  //       placeholder: 'Enter your feedback here',
  //     },
  //     {
  //       name: 'Overall Rating',
  //       type: 'select',
  //       placeholder: 'Select Rating',
  //       options: [
  //         { label: '5 Star', value: 5 },
  //         { label: '4 Star', value: 4 },
  //         { label: '3 Star', value: 3 },
  //         { label: '2 Star', value: 2 },
  //         { label: '1 Star', value: 1 },
  //       ],
  //       value: selectValue,
  //       setValue: setSelectValue,
  //     },
  //     {
  //       name: 'Would you recommend this course to others?',
  //       type: 'radio',
  //       options: [
  //         { label: 'Yes', value: 1 },
  //         { label: 'No', value: 0 },
  //       ],
  //     },
  //   ],
  //   mediumModalWidth: true,
  // };

  // const [openSuccessModal, setOpenSuccessModal] = useState(false);
  return (
    <Suspense fallback={<Loading />}>
      {/* <HrAdminDashboardPage /> */}
      {/* <EmployeeNotificationPanel /> */}
      {/* <EmployeePayroll /> */}
      {/* <EmployeeDeviceManagement /> */}
      {/* <EmployeeAppRequestsAndPermissions /> */}
      {/* <EmployeeLeaveManagementPage /> */}
      {/* <EmployeePerformanceManagement /> */}
      {/* <EmployeeLearningAndDevelopment /> */}
      {/* <EmployeeLearningAndDevelopmentMyCourses
        heading='Training Details'
        smallHeading
        details={courseDetails}
        buttonOne={{
          type: ButtonType.outlined,
          text: 'Complete',
          onClick: () => setOpenSuccessModal(true),
        }}
        buttonTwo={{ type: ButtonType.contained, text: 'Enroll' }}
      /> */}
      {/* <EmployeeAttendanceAndTimeTracking /> */}
      {/* <Modal open={openModal} onClose={setOpenModal} {...deviceDetails} /> */}
      {/* <Modal
        open={openSuccessModal}
        onClose={setOpenSuccessModal}
        centerImage='/icons/modal-success.svg'
        centerTitle='Congratulations! You have completed the training course'
        centerMessage='We value your feedback. Please rate and provide feedback about the course'
        buttonOne={{ type: ButtonType.outlined, text: 'Continue to Dashboard' }}
        buttonTwo={{ type: ButtonType.contained, text: 'Give Feedback' }}
        reduceVerticalGap
        hasHeading={false}
      /> */}
    </Suspense>
  );
};

export default DashboardPage;
