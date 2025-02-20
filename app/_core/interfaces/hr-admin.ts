export interface IHrAdminDashboardOverview {
  totalOpenPositions: number;
  totalApplications: number;
  pendingOffers: number;
  interviewsScheduled: number;
}

// export interface IHrAdminDashboardChart {

// }

export interface IEmployeeStatusDistribution {
  statusDistribution: {
    active: number;
    onLeave: number;
    probation: number;
    resigned: number;
  };
}

export interface IPriorityTaskRes {
  tasks: IPriorityTask[];
}

export interface IPriorityTask {
  id?: string;
  title?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'in_progress' | 'completed';
  assignedTo?: string;
  dueDate?: string;
}