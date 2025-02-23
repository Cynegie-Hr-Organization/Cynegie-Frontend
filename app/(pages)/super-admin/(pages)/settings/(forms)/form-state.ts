import { ISuperAdminSettings } from "@/app/_core/interfaces/super-admin";
import { create } from "zustand";

interface FormState {
  data?: Partial<ISuperAdminSettings>;
  setData: (state: Partial<ISuperAdminSettings>) => void;
}

const useFormStore = create<FormState>((set) => ({
  data: undefined,
  setData: (newDate: Partial<ISuperAdminSettings>) =>
    set((state) => ({ data: { ...state, ...newDate } })),
  // flatten: () => set((state) => ({ data: removeNull}))
}));

export default useFormStore;
