"use client";
import Modal from "@/app/_components/employee/modal";
import BarChart from "@/app/_components/employee/pages/attendance-and-time-tracking/total-hours-worked/chart";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import TabFormat from "@/app/_components/shared/tab-format";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { color, route } from "@/constants";
import { useAttendanceStore } from "@/hooks/useBulkAttendanceParam";
import { FetchParams } from "@/types";
import { formatHours } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDepartments } from "../../payroll-management/pages/benefits-management/api";
import {
  getAllLeaves,
  getAttendanceRecords,
} from "../../payroll-management/pages/overview/api";

const attendanceRateChartData = [
  { item: "Monday", present: 580, absent: 750, "on leave": 500 },
  { item: "Tuesday", present: 300, absent: 400, "on leave": 350 },
  { item: "Wednesday", present: 630, absent: 200, "on leave": 380 },
  { item: "Thursday", present: 450, absent: 300, "on leave": 400 },
  { item: "Friday", present: 580, absent: 400, "on leave": 600 },
  { item: "Saturday", present: 450, absent: 400, "on leave": 420 },
  { item: "Sunday", present: 400, absent: 500, "on leave": 800 },
];

type MappedAttendanceRecord = {
  id: string;
  employeeName: string;
  staffID: string;
  department: string;
  jobTitle: string;
  checkInTime: string;
  clockOutTime: string;
  hoursWorked: string;
  status: string;
  overtimeHours: string;
};

type MappedLeaveRecord = {
  employeeName: string;
  staffID: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  daysOnLeave: string;
  backupEmployee: string;
};

const HrAdminEmployeeAttendanceManagement = () => {
  const router = useRouter();
  const [openAdjustAttendanceModal, setOpenAdjustAttendanceModal] =
    useState(false);
  const [openBulkGenerateReportModal, setOpenBulkGenerateReportModal] =
    useState(false);
  const [
    openIndividualGenerateReportModal,
    setOpenIndividualGenerateReportModal,
  ] = useState(false);

  const [departments, setDepartments] =
    useState<{ label: string; value: string }[]>();
  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments({ page: 1, limit: 50, sortOrder: "asc" }),
  });

  useEffect(() => {
    if (departmentsData) {
      setDepartments(
        departmentsData.data
          ? departmentsData.data?.map((department) => ({
              label: department.departmentName,
              value: department.id,
            }))
          : []
      );
    } else {
      setAttendanceRecords(undefined);
    }
  }, [departmentsData]);

  const [attendanceRecords, setAttendanceRecords] =
    useState<MappedAttendanceRecord[]>();
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
  });

  const [leaveRecords, setLeaveRecords] = useState<MappedLeaveRecord[]>();

  const { data: attendanceRecordsData } = useQuery({
    queryKey: ["attendance-records", fetchParams],
    queryFn: () => getAttendanceRecords(fetchParams),
  });

  const { data: leaveRecordsData } = useQuery({
    queryKey: ["leave-records", fetchParams],
    queryFn: () => getAllLeaves(fetchParams),
  });

  const { setStartDate, setEndDate, setDepartment } = useAttendanceStore();

  useEffect(() => {
    if (attendanceRecordsData) {
      setAttendanceRecords(
        attendanceRecordsData.data
          ? attendanceRecordsData.data?.map((record) => ({
              id: record.attendanceId,
              employeeName: record.employeeName,
              staffID: record.staffId,
              department: record.department.departmentName,
              jobTitle: record.jobTitle,
              date: record.date,
              checkInTime: dayjs(record.clockIn).format("hh:mm A"),
              clockOutTime:
                record.clockOut === "N/A"
                  ? record.clockOut
                  : dayjs(record.clockOut).format("hh:mm A"),
              hoursWorked:
                record.totalHoursWorked !== null
                  ? formatHours(record.totalHoursWorked)
                  : "N/A",
              status: record.attendanceStatus,
              overtimeHours:
                record.overtime !== null ? formatHours(record.overtime) : "N/A",
            }))
          : []
      );
    } else {
      setAttendanceRecords(undefined);
    }
  }, [attendanceRecordsData]);

  useEffect(() => {
    if (leaveRecordsData) {
      setLeaveRecords(
        leaveRecordsData.data
          ? leaveRecordsData.data?.map((record) => ({
              employeeName: `${record.employee.personalInfo.firstName} ${record.employee.personalInfo.lastName}`,
              staffID: record.employee.employmentInformation.staffId,
              department:
                record.employee.employmentInformation.department.departmentName,
              leaveType: record.leaveType.name,
              startDate: dayjs(record.startDate).format("DD-MM-YYYY"),
              endDate: dayjs(record.endDate).format("DD-MM-YYYY"),
              daysOnLeave: record.numberOfDays.toString(),
              backupEmployee: "N/A",
            }))
          : []
      );
    } else {
      setLeaveRecords(undefined);
    }
  }, [leaveRecordsData]);

  const {
    register: bulkReportRegister,
    control: bulkReportControl,
    formState: { isValid, errors },
    getValues,
  } = useForm();

  return (
    <Page
      title="Attendance Managment"
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: "Generate Attendance Report",
        onClick: () => setOpenBulkGenerateReportModal(true),
      }}
    >
      <BarChart
        title="Attendance Rate"
        hasLegend
        data={attendanceRateChartData}
        yAxisLabel="(Num of Employees)"
        xAxisLabel="Days"
        barSize={40}
        bars={[
          { dataKey: "present" },
          { dataKey: "absent", fill: color.barChart.midBlue },
          { dataKey: "on leave", fill: color.barChart.lightBlue },
        ]}
        inputFields={[
          {
            type: "select",
            defaultValue: 0,
            options: [{ label: "Weekly", value: 0 }],
          },
          {
            type: "select",
            defaultValue: 0,
            options: [{ label: "All Departments", value: 0 }],
          },
        ]}
      />
      <TabFormat
        tabs={[
          {
            name: "Attendance Summary",
            component: (
              <Table
                hasActionsColumn
                headerRowData={[
                  "Employee Name",
                  "Staff ID",
                  "Department",
                  "Job Title",
                  "Check In Time",
                  "Clock-Out Time",
                  "Hours Worked",
                  "Status",
                  "Overtime Hours",
                ]}
                fieldTypes={[
                  ...Array(7).fill(FieldType.text),
                  FieldType.status,
                  FieldType.text,
                ]}
                displayedFields={[
                  "employeeName",
                  "staffID",
                  "department",
                  "jobTitle",
                  "checkInTime",
                  "clockOutTime",
                  "hoursWorked",
                  "status",
                  "overtimeHours",
                ]}
                bodyRowData={attendanceRecords}
                statusMap={{
                  late: "warning",
                  on_leave: "info",
                }}
                formFilter={{
                  inputFields: [
                    {
                      label: "Name",
                      type: "select",
                      placeholder: "Select",
                      options: [{ label: "Emmanuel Okpara", value: 0 }],
                    },
                    {
                      label: "Department",
                      type: "select",
                      placeholder: "Select",
                      options: [{ label: "Sales", value: 0 }],
                    },
                    {
                      label: "Job Title",
                      type: "select",
                      placeholder: "Select",
                      options: [{ label: "Regional Manager", value: 0 }],
                    },
                    {
                      label: "Status",
                      type: "select",
                      placeholder: "Select",
                      options: [
                        { label: "Approved", value: 2 },
                        { label: "Rejected", value: 1 },
                        { label: "Pending", value: 0 },
                      ],
                    },
                    {
                      label: "JobTitle",
                      type: "date",
                    },
                  ],
                }}
                actions={[
                  {
                    name: "Adjust Attendance",
                    onClick: () => setOpenAdjustAttendanceModal(true),
                  },
                  {
                    name: "Generate Report",
                    onClick: () => setOpenIndividualGenerateReportModal(true),
                  },
                ]}
              />
            ),
          },
          {
            name: "Leave Summary",
            component: (
              <Table
                headerRowData={[
                  "Employee Name",
                  "Staff ID",
                  "Department",
                  "Leave Type",
                  "Start Date",
                  "End Date",
                  "Days on Leave",
                  "Backup Employee",
                ]}
                fieldTypes={Array(8).fill(FieldType.text)}
                displayedFields={[
                  "employeeName",
                  "staffID",
                  "department",
                  "leaveType",
                  "startDate",
                  "endDate",
                  "daysOnLeave",
                  "backupEmployee",
                ]}
                bodyRowData={leaveRecords}
                filters={[
                  { name: "Department", items: ["Sales"] },
                  { name: "Leave Type", items: ["Annual"] },
                  { name: "Date", items: ["Select Date"] },
                ]}
                paginationMeta={{
                  limit: fetchParams.limit,
                  onChangeLimit: (limit) =>
                    setFetchParams({ ...fetchParams, limit: limit }),
                }}
                statusMap={{ late: "warning" }}
                fieldToGetAction="status"
              />
            ),
          },
        ]}
      />
      {openAdjustAttendanceModal && (
        <Modal
          open={openAdjustAttendanceModal}
          onClose={() => setOpenAdjustAttendanceModal(false)}
          title="Adjust Attendance"
          subtitle="Make adjustments to the records for the selected employee"
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                label: "Employee Name",
                type: "text",
                value: "John Emmanuel",
                disabled: true,
              },
              {
                label: "Staff ID",
                type: "text",
                value: "CYN00117",
                disabled: true,
              },
              {
                label: "Department",
                type: "text",
                value: "Finance",
                disabled: true,
              },
              {
                label: "Date of Adjustment",
                type: "text",
                value: "November 12, 2024",
                disabled: true,
              },
              {
                label: "Check - in Time",
                type: "time",
              },
              {
                label: "Check - out Time",
                type: "time",
              },
              {
                label: "Adjusted By",
                type: "text",
                placeholder: "Enter name",
              },
            ],
            buttonGroup: {
              leftButton: {
                type: ButtonType.outlined,
                text: "Cancel",
                onClick: () => setOpenAdjustAttendanceModal(false),
              },
              rightButton: {
                type: ButtonType.contained,
                text: "Save Changes",
                onClick: () => setOpenAdjustAttendanceModal(false),
              },
              position: "center",
            },
          }}
        />
      )}
      {openBulkGenerateReportModal && (
        <Modal
          open={openBulkGenerateReportModal}
          onClose={() => setOpenBulkGenerateReportModal(false)}
          title="Generate Attendance Report"
          subtitle="Select filters for the report"
          form={{
            gridSpacing: 3,
            register: bulkReportRegister,
            control: bulkReportControl,
            errors: errors,
            inputFields: [
              {
                label: "Start Date",
                type: "date",
                required: true,
                hookFormField: true,
                controllerRules: {
                  required: true,
                },
              },
              {
                label: "End Date",
                type: "date",
                required: true,
                hookFormField: true,
                controllerRules: {
                  required: true,
                },
              },
              {
                label: "Department",
                type: "multi-select",
                placeholder: "Select",
                options: departments,
                hookFormField: true,
                required: true,
                controllerRules: {
                  required: true,
                },
              },
              {
                label: "Attendance Status",
                type: "multi-select",
                placeholder: "Select",
                options: [
                  { label: "Present", value: "present" },
                  { label: "Late", value: "late" },
                  { label: "Absent", value: "absent" },
                  { label: "On Leave", value: "on_leave" },
                ],
                required: true,
                hookFormField: true,
                controllerRules: {
                  required: true,
                },
              },
            ],
            buttonGroup: {
              leftButton: {
                type: ButtonType.outlined,
                text: "Cancel",
                onClick: () => setOpenBulkGenerateReportModal(false),
              },
              rightButton: {
                type: isValid ? ButtonType.contained : ButtonType.disabled,
                text: "Generate Report",
                onClick: () => {
                  setStartDate(dayjs(getValues("Start Date")).toISOString());
                  setEndDate(dayjs(getValues("End Date")).toISOString());
                  setDepartment(
                    getValues("Department").map(
                      (department: { label: string; value: string }) =>
                        department.label
                    )
                  );
                  router.push(
                    route.hrAdmin.employeeManagement.attendanceManagement
                      .bulkReport
                  );
                },
              },
              position: "center",
            },
          }}
        />
      )}
      {openIndividualGenerateReportModal && (
        <Modal
          open={openIndividualGenerateReportModal}
          onClose={() => setOpenIndividualGenerateReportModal(false)}
          title="Generate Attendance Report"
          subtitle="Customize the report details for Emmanuel Okpara"
          forms={[
            {
              gridSpacing: 3,
              inputFields: [
                {
                  label: "Start Date",
                  type: "date",
                  required: true,
                },
                {
                  label: "End Date",
                  type: "date",
                  required: true,
                },
                {
                  label: "Attendance Status",
                  type: "multi-select",
                  placeholder: "Select",
                  hookFormField: true,
                  required: true,
                },
              ],
              buttonGroup: {
                leftButton: {
                  type: ButtonType.outlined,
                  text: "Cancel",
                  onClick: () => setOpenIndividualGenerateReportModal(false),
                },
                rightButton: {
                  type: ButtonType.contained,
                  text: "Generate Report",
                  isSubmit: true,
                  onClick: () =>
                    router.push(
                      route.hrAdmin.employeeManagement.attendanceManagement
                        .individualReport
                    ),
                },
                position: "center",
              },
            },
          ]}
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeAttendanceManagement;
