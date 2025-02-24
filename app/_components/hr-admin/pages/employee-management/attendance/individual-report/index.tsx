"use client";
import { FieldType } from "@/app/_components/shared/table/types";
import { route } from "@/constants";
import { useAttendanceReportParamsStore } from "@/hooks/useAttendanceReportParamsStore";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../payroll-management/pages/overview/api";
import HrAdminEmployeeAttendanceManagementReport from "../report";

type MappedAttendanceRecord = {
  date: string;
  checkInTime: string;
  clockOutTime: string;
  hoursWorked: string;
  status: string;
  overtimeHours: string;
};

const HrAdminEmployeeAttendanceManagementIndividualReport = () => {
  const { startDate, endDate, attendanceStatus, employeeId, employeeName } =
    useAttendanceReportParamsStore();

  const [attendanceRecords, setAttendanceRecords] =
    useState<MappedAttendanceRecord[]>();

  const router = useRouter();

  const { data: employeeAttendanceData } = useQuery({
    queryKey: [
      "employee-attendance",
      {
        page: 1,
        limit: 50,
        sortOrder: "asc",
        startDate: startDate,
        endDate: endDate,
        attendanceStatus: attendanceStatus,
      },
    ],
    queryFn: () =>
      apiRequest("GET", `attendance/report/${employeeId}`, undefined, {
        page: 1,
        limit: 50,
        sortOrder: "asc",
        startDate: startDate,
        endDate: endDate,
        attendanceStatus: attendanceStatus,
      }),
  });

  useEffect(() => {
    if (employeeAttendanceData) {
      setAttendanceRecords(
        employeeAttendanceData.data.map((record: any) => ({
          date: record.date,
          checkInTime:
            dayjs(record.clockIn).format("hh:mm A") !== "Invalid Date"
              ? dayjs(record.clockIn).format("hh:mm A")
              : "N/A",
          clockOutTime:
            dayjs(record.clockOut).format("hh:mm A") !== "Invalid Date"
              ? dayjs(record.clockOut).format("hh:mm A")
              : "N/A",
          hoursWorked: "N/A",
          status: "N/A",
          overtimeHours: "N/A",
        }))
      );
    }
  }, [employeeAttendanceData]);

  useEffect(() => {
    if (startDate.length < 1) {
      alert("No details provided to generate the report");
      router.push(route.hrAdmin.employeeManagement.attendanceManagement.home);
    }
  }, []);

  return (
    <HrAdminEmployeeAttendanceManagementReport
      title={`Attendance Report for ${employeeName} (${
        startDate ? dayjs(startDate).format("MMM D, YYYY") : ""
      } - ${endDate ? dayjs(endDate).format("MMM D, YYYY") : ""})`}
      cardsLoading={employeeAttendanceData ? false : true}
      exportParams={{
        employeeId: employeeId,
        startDate: startDate,
        endDate: endDate,
      }}
      cards={[
        {
          labelText: "Total Days Analyzed",
          value: `${employeeAttendanceData?.totalDays} Days`,
          valueBelow: true,
          loading: employeeAttendanceData ? false : true,
        },
        {
          labelText: "On Leave",
          // value: `${employeeAttendanceData?.statusCounts["on_leave"]} Days`,
          value: "",
          valueBelow: true,
          loading: employeeAttendanceData ? false : true,
        },
        {
          labelText: "Present",
          value: "N/A", //TODO: Inform backend team to provide the correct value
          valueBelow: true,
          loading: employeeAttendanceData ? false : true,
        },
        {
          labelText: "Absent",
          value: "N/A", //TODO: Inform backend team to provide the correct value,
          valueBelow: true,
          loading: employeeAttendanceData ? false : true,
        },
      ]}
      tableProps={{
        hasActionsColumn: false,
        headerRowData: [
          "Date",
          "Check In Time",
          "Clock-Out Time",
          "Hours Worked",
          "Status",
          "Overtime Hours",
        ],
        fieldTypes: [
          ...Array(4).fill(FieldType.text),
          FieldType.status,
          FieldType.text,
        ],
        displayedFields: [
          "date",
          "checkInTime",
          "clockOutTime",
          "hoursWorked",
          "status",
          "overtimeHours",
        ],
        bodyRowData: attendanceRecords,
        filters: [{ name: "Status", items: ["Present"] }],
      }}
    />
  );
};

export default HrAdminEmployeeAttendanceManagementIndividualReport;
