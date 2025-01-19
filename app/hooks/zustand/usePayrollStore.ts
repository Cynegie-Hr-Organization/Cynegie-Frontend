import { Payroll } from "@/types";
import { create } from "zustand";

interface PayrollState {
  payroll?: Payroll;
  setPayroll: (state: Payroll) => void;
}

const usePayrollStore = create<PayrollState>((set) => ({
  payroll: undefined,
  setPayroll: () => set((state) => ({ payroll: state.payroll })),
}));

export default usePayrollStore;
