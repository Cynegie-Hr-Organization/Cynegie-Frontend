export interface IBudgetBase {
  allocation: number;
  budgetName: string;
  company: string;
  department: {
    departmentName: string;
    id: string;
  };
  description: string;
  endDate: string;
  startDate: string;
}

export interface IBudget extends IBudgetBase {
  createdAt: string;
  deletedAt: string | null;
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  updatedAt: string;
}

// export type IBudgetCreate = Omit<IBudgetBase, "company">;
// export interface IBudgetCreate {
//   allocation: number;
//   budgetName: string;
//   department: string;
//   description: string;
//   endDate: string;
//   startDate: string;
// }

export interface IBudgetCreate {
  budgetName: string;
  department: string;
  allocation: number;
  description: string;
  startDate: string;
  endDate: string;
}