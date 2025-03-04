"use client";
import { FieldType } from "@/app/_components/shared/table/types";
import { color, route } from "@/constants";
import { useAttendanceReportParamsStore } from "@/hooks/useAttendanceReportParamsStore";
import { formatHours } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDepartments } from "../../../payroll-management/pages/benefits-management/api";
import { getBulkAttendanceReport } from "../../../payroll-management/pages/overview/api";
import HrAdminEmployeeAttendanceManagementReport from "../report";

// const attendanceRateChartData = [
//   { item: "Monday", present: 580, absent: 750 },
//   { item: "Tuesday", present: 300, absent: 400 },
//   { item: "Wednesday", present: 630, absent: 200 },
//   { item: "Thursday", present: 450, absent: 300 },
//   { item: "Friday", present: 580, absent: 400 },
//   { item: "Saturday", present: 450, absent: 400 },
//   { item: "Sunday", present: 400, absent: 500 },
// ];

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

const HrAdminEmployeeAttendanceManagementBulkReport = () => {
  const { startDate, endDate, departments } = useAttendanceReportParamsStore();

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["bulk-attendance-report"],
    queryFn: () =>
      getBulkAttendanceReport({
        page: 1,
        limit: 20,
        sortOrder: "asc",
        startDate: startDate,
        endDate: endDate,
      }),
  });

  const [mappedDepartments, setMappedDepartments] =
    useState<{ label: string; value: string }[]>();
  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments({ page: 1, limit: 50, sortOrder: "asc" }),
  });

  useEffect(() => {
    if (departmentsData) {
      setMappedDepartments(
        departmentsData.data
          ? departmentsData.data?.map((department) => ({
              label: department.departmentName,
              value: department.id,
            }))
          : []
      );
    } else {
      setMappedDepartments([]);
    }
  }, [departmentsData]);

  const [attendanceRecords, setAttendanceRecords] =
    useState<MappedAttendanceRecord[]>();

  const [mappedChartData, setMappedChartData] = useState<
    {
      item: string;
      present: number;
      absent: number;
      on_leave: number;
    }[]
  >();

  useEffect(() => {
    if (data) {
      setAttendanceRecords(
        data.data
          ? data.data?.map((record) => ({
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
      const days = Object.keys(data.attendanceRate);
      const present = Object.values(data.attendanceRate).map(
        (data) => data.undefined ?? 0
      );
      const late = Object.values(data.attendanceRate).map(
        (data) => data.late ?? 0
      );
      const onLeave = Object.values(data.attendanceRate).map(
        (data) => data.on_leave ?? 0
      );
      const mappedData = days.map((_, index) => ({
        item: days[index],
        present: late[index],
        absent: present[index],
        on_leave: onLeave[index],
      }));
      console.log(mappedData);
      setMappedChartData(mappedData);
    } else {
      setAttendanceRecords(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (startDate.length < 1) {
      alert("No details provided to generate the report");
      router.push(route.hrAdmin.employeeManagement.attendanceManagement.home);
    }
  }, [router, startDate.length]);

  return (
    <HrAdminEmployeeAttendanceManagementReport
      title={`Attendance Report (${
        departments.length < 1
          ? "All Departments"
          : departments.join(", ") + " Departments"
      }: ${
        startDate.length < 1 ? "" : dayjs(startDate).format("MMM D, YYYY")
      } - ${endDate.length < 1 ? "" : dayjs(endDate).format("MMM D, YYYY")})`}
      exportParams={{
        startDate: startDate,
        endDate: endDate,
      }}
      barChart={{
        title: "Attendance Rate",
        inputFields: [
          {
            type: "select",
            placeholder: "All Departments",
            selectValControlledFromOutside: true,
            options: [
              { label: "All", value: undefined },
              ...(mappedDepartments ?? []),
            ],
          },
        ],
        hasLegend: true,
        data: mappedChartData ?? [],
        yAxisLabel: "(Num of Employees)",
        xAxisLabel: "Days",
        barSize: 60,
        bars: [
          { dataKey: "present", fill: color.barChart.darkBlue },
          { dataKey: "absent", fill: color.barChart.midBlue },
        ],
      }}
      cardsLoading={data ? false : true}
      cards={[
        {
          labelText: "Total Employees",
          value: data?.totalEmployees,
          valueBelow: true,
        },
        {
          labelText: "Total Days Analyzed",
          value: data?.totalDaysAnalyzed,
          valueBelow: true,
        },
        {
          labelText: "Present Employees",
          value: "N/A",
          valueBelow: true,
        },
        {
          labelText: "Absent Employees",
          value: "N/A",
          valueBelow: true,
        },
      ]}
      tableProps={{
        headerRowData: [
          "Employee Name",
          "Staff ID",
          "Department",
          "Job Title",
          "Check In Time",
          "Clock-Out Time",
          "Hours Worked",
          "Status",
          "Overtime Hours",
        ],
        fieldTypes: [
          ...Array(7).fill(FieldType.text),
          FieldType.status,
          FieldType.text,
        ],
        displayedFields: [
          "employeeName",
          "staffID",
          "department",
          "jobTitle",
          "checkInTime",
          "checkOutTime",
          "hoursWorked",
          "status",
          "overtimeHours",
        ],
        bodyRowData: attendanceRecords,
        filters: [
          { name: "Name", items: ["Emmanuel Okpara"] },
          { name: "Department", items: ["Sales"] },
          { name: "Job Title", items: ["Regional Manager"] },
          { name: "Status", items: ["Present"] },
          { name: "Date", items: ["Select Date"] },
        ],
      }}
    />
  );
};

export default HrAdminEmployeeAttendanceManagementBulkReport;
