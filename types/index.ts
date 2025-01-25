/* eslint-disable @typescript-eslint/no-empty-object-type */
export type ColorVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "grey"
  | "purple"
  | "ash";

export type CreatedBy = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
};

export type FetchParams = {
  page: number;
  limit: number;
  sortOrder: "asc" | "desc";
  search?: string;
};

export type SummaryCard = {
  value: number;
  iconColorVariant: ColorVariant;
  labelText: string;
  valueLineColor?: string;
};

export type CompanyRegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
};

export type Department = {
  departmentName: string;
  departmentManager: string;
  employees: string[];
  userLimit: number;
  status: string;
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type Benefit = {
  name: string;
  benefitType: string;
  departments: Pick<Department, "id">[];
  employmentType: string;
  jobLevel: string;
  startDate: string;
  endDate: string;
  employerContribution: number;
  employeeContribution: number;
  status: "approved" | "pending" | "rejected";
  employees: Employee[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  totalEmployees: number;
  employeesByStatus: {};
};

export type BenefitResponse = {
  benefit: Omit<Benefit, "totalEmployees" | "employeesByStatus">;
  totalEmployees: number;
  totalUtilization: number;
};

export interface CreateJobProps {
  requisitorName: string;
  title: string;
  department: string;
  jobLocation: string;
  benefits: string;
  description: string;
  experience: string;
  qualification: string;
  requiredSkills: string | string[];
  type: string;
}

export interface Job extends CreateJobProps {
  user: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  status: string;
}

export interface FetchResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: number;
  message: string;
  data:
    | {
        totalPages: number;
        count: number;
        currentPage: number;
        data: T[];
      }
    | T[];
}

export interface PaginatedResponse2<T> {
  status: number;
  message: string;
  data: T[];
  meta: {
    itemCount: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

export interface PaginatedResponse3<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
  };
}

export interface PaginatedResponse4<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface FetchJob {
  status: number;
  message: string;
  data: Job;
}

interface User {
  email: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  status: string;
  isEmailVerified: boolean;
  role: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export interface Device {
  deviceName: string;
  description: string;
  location: string;
  status: string;
  company: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Define the type for the DeviceRequest object
export interface DeviceRequest {
  userId: User;
  deviceId: Device;
  status: "PENDING" | "APPROVED" | "DENIED";
  requestedDate: string; // ISO date format
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
  id: string;
}

// Example response type
export type DeviceRequestsResponse = DeviceRequest[];

export interface Software {
  id: string;
  softwareName: string;
  version: string;
  licenseCount: number;
  licenseExpiryDate: string; // ISO timestamp
  description: string;
  company: {
    name: string;
    status: string;
  };
  status: "ACTIVE" | "INACTIVE";
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SecurityAlert {
  id: string;
  alertTitle: string;
  description: string;
  date: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"; // Enum for severity levels
  company: {
    id: string;
    name: string;
    status: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
  };
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AlertsBySeverity {
  LOW: number;
  MEDIUM: number;
  HIGH: number;
  CRITICAL: number;
}

export interface RecentAlert {
  alertTitle: string;
  description: string;
  date: string;
  severity: string;
  company: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface SecurityAlertsAnalytics {
  totalAlerts: number;
  alertsBySeverity: AlertsBySeverity;
  recentAlerts: RecentAlert[];
}

export interface DeviceMetrics {
  totalDevices: number;
  devicesByStatus: {
    ACTIVE: number;
    INACTIVE: number;
    UNDER_REPAIR: number;
  };
  totalRequests: number;
  requestsByStatus: {
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
  };
}

export interface Candidate {
  firstName: string;
  lastName: string;
  job: Job;
  stage: string;
  status: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CandidateResponse {
  id: string;
  stage: string;
  firstName: string;
  lastName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  job: Job;
}

export interface JobOffer {
  description: string;
  baseSalary: string;
  bonus: string;
  benefits: string;
  documents: string[];
  jobTitle: string;
  offerDate: string;
  jobStartDate: string;
  expirationDate: string;
  department: string;
  candidate: Candidate;
  status: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface JobOfferResponseData {
  totalPages: number;
  count: number;
  currentPage: number;
  data: JobOffer[];
}

export interface JobOfferResponse {
  status: number;
  message: string;
  data: JobOfferResponseData;
}

export interface Interview {
  description: string;
  startTime: string;
  reminderTime: string;
  startDate: string;
  candidate: Candidate;
  interviewer: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface Employee {
  employmentInformation: string;
  personalInfo: PersonalInfo;
  compensation: string;
  documents: string[];
  NextOfKin: string[];
  accessRights: string[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface KeyResult {
  result: string;
  targetValue: number;
  dueDate: string;
  id: string;
}

export interface Milestone {
  milestoneName: string;
  dueDate: string;
  id: string;
}

export interface Goal {
  goalName: string;
  description: string;
  goalType: string;
  priority: string;
  employees: Employee[];
  dueDate: string;
  status: string;
  alignment: string;
  keyResults: KeyResult[];
  milestones: Milestone[];
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GoalResponse {
  status: number;
  message: string;
  data: {
    items: Goal[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export type ReviewCycle = {
  cycleName: string;
  startDate: string;
  endDate: string;
  daysOfGrace: number;
  employees: Employee[];
  reviewers: Employee[];
  reminderType: "email" | "sms";
  reminderFrequency: "daily" | "weekly" | "monthly" | "yearly";
  status: "not_started" | "in_progress" | "completed";
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type Payroll = {
  payrollName: string;
  startDate: string;
  endDate: string;
  approvalDate?: string;
  status: "approved" | "pending" | "rejected";
  paymentDate: string;
  employees: Employee[] | string[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  totalGrossPay: number;
  totalNetPay: number;
  totalDeductions: number;
  employeesInfo?: { employeeId: string; employeeInfo: Employee }[];
};

type PaginationMeta = {
  itemCount: number;
  totalPages: number;
  page: number;
  limit: number;
};

export type ServerResponse<T> = {
  status: string;
  message: string;
  data: T[];
  meta: PaginationMeta;
};

export type FeedbackItem = {
  recipient: Employee[];
  feedbackType: "positive" | "neutral" | "negative";
  comment: string;
  rating: number;
  attachment: string;
  createdBy: CreatedBy;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type FeedbackData = {
  items: FeedbackItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export interface GoalAchievementRate {
  achievementRate: number;
}

export interface TrainingCompletionRate {
  completionRate: number;
}

export interface MonthlyCompletionRate {
  month: string;
  completionRate: number;
}
