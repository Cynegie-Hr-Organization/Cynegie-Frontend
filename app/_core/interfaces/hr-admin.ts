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
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in_progress" | "completed";
  assignedTo?: string;
  dueDate?: string;
}

export interface ICandidateRes {
  status: number;
  message: string;
  data: {
    totalPages: number;
    data: ICandidate[];
    count: number;
    currentPage: number;
  };
}

export type ICandidateStatus = "pending" | "interviewed" | "rejected" | "hired";

export interface ICandidate {
  id: string;
  firstName: string;
  lastName: string;
  job: string;
  stage: string;
  status: string;
}
// export interface ICandidate {
//   id?: string;
//   personalInfo?: {
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     phoneNumber?: string;
//   };
//   jobApplication?: {
//     jobPosition?: string;
//     appliedDate?: string;
//     status?: ICandidateStatus
//   };
//   resume?: string;
//   source?: string;
//   stage?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }
