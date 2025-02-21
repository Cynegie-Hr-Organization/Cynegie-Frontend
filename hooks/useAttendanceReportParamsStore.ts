import { create } from "zustand";

interface AttendanceReportParamsStore {
  startDate: string;
  endDate: string;
  departments: string[];
  attendanceStatus: string;
  employeeId: string;
  employeeName: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setDepartment: (dept: string[]) => void;
  setAttendanceStatus: (status: string) => void;
  setEmployeeId: (id: string) => void;
  setEmployeeName: (name: string) => void;
}

export const useAttendanceReportParamsStore =
  create<AttendanceReportParamsStore>((set) => ({
    startDate: "",
    endDate: "",
    departments: [],
    attendanceStatus: "",
    employeeId: "",
    employeeName: "",
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
    setDepartment: (dept) => set({ departments: dept }),
    setAttendanceStatus: (status) => set({ attendanceStatus: status }),
    setEmployeeId: (id) => set({ employeeId: id }),
    setEmployeeName: (name) => set({ employeeName: name }),
  }));
