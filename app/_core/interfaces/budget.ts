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
  spent: number;
  remainingFunds: number;
}

export interface IBudget extends IBudgetBase {
  createdAt: string;
  deletedAt: string | null;
  id: string;
  status: "pending" | "approved" | "rejected";
  updatedAt: string;
}

export interface IBudgetSummary {
  totalAllocated: number,
  totalSpent: number,
  remainingBudget: number
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
  allocation: string | number;
  description: string;
  startDate: string;
  endDate: string;
}


export interface IDepartment {
  data: [{
    departmentName: string;
    departmentManager: string;
    employees: string[];
    userLimit: number;
    status: 'active' | 'inactive';
    deletedAt: string | null;
    company: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }],
  meta: {
    // total: number;
    itemCount: 2,
    page: number;
    limit: number;
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false
  }
}
