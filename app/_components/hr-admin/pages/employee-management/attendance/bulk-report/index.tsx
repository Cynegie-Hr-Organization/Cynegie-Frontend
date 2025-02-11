"use client";
import { FieldType } from "@/app/_components/shared/table/types";
import HrAdminEmployeeAttendanceManagementReport from "../report";
import { color } from "@/constants";

const attendanceRateChartData = [
  { item: "Monday", present: 580, absent: 750 },
  { item: "Tuesday", present: 300, absent: 400 },
  { item: "Wednesday", present: 630, absent: 200 },
  { item: "Thursday", present: 450, absent: 300 },
  { item: "Friday", present: 580, absent: 400 },
  { item: "Saturday", present: 450, absent: 400 },
  { item: "Sunday", present: 400, absent: 500 },
];

const HrAdminEmployeeAttendanceManagementBulkReport = () => {
  return (
    <HrAdminEmployeeAttendanceManagementReport
      title="Attendance Report (HR & IT Department: Oct 1 - Oct 15, 2024)"
      barChart={{
        title: "Attendance Rate",
        inputFields: [
          {
            type: "select",
            defaultValue: 0,
            options: [{ label: "All Departments", value: 0 }],
          },
        ],
        hasLegend: true,
        data: attendanceRateChartData,
        yAxisLabel: "(Num of Employees)",
        xAxisLabel: "Days",
        barSize: 60,
        bars: [
          { dataKey: "present", fill: color.barChart.darkBlue },
          { dataKey: "absent", fill: color.barChart.midBlue },
        ],
      }}
      cards={[
        {
          labelText: "Total Employees",
          value: 120,
          valueBelow: true,
        },
        {
          labelText: "Total Days Analyzed",
          value: 15,
          valueBelow: true,
        },
        {
          labelText: "Present Employees",
          value: 80,
          valueBelow: true,
        },
        {
          labelText: "Absent Employees",
          value: 25,
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
          "name",
          "id",
          "department",
          "jobTitle",
          "checkInTime",
          "checkOutTime",
          "hoursWorked",
          "status",
          "overtimeHours",
        ],
        bodyRowData: Array(5).fill({
          name: "Ayomide Alibaba",
          id: "CYN0235",
          department: "Product",
          jobTitle: "Product Manager",
          checkInTime: "9:02 AM",
          checkOutTime: "4:56 PM",
          hoursWorked: "8",
          status: "Absent",
          overtimeHours: "8",
        }),
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
