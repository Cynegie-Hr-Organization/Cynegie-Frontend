import { create } from "zustand";

interface AttendanceStore {
  startDate: string;
  endDate: string;
  department: string[];
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

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  startDate: "",
  endDate: "",
  department: [],
  attendanceStatus: "",
  employeeId: "",
  employeeName: "",
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setDepartment: (dept) => set({ department: dept }),
  setAttendanceStatus: (status) => set({ attendanceStatus: status }),
  setEmployeeId: (id) => set({ employeeId: id }),
  setEmployeeName: (name) => set({ employeeName: name }),
}));
