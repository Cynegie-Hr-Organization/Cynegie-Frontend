import { Compensation } from "./api-index";

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

export interface PaginatedResponse5<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
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
  compensation: Compensation | string;
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

export interface BenefitsSummary {
  totalBenefits: number;
  totalEmployees: number;
  benefitsByStatus: {
    pending: number;
    active: number;
    expired: number;
    cancelled: number;
    rejected: number;
    approved: number;
  };
}

export interface SalaryAdvanceSummary {
  approvedTotalAdvanceTaken: number;
  pendingTotalAdvanceTaken: number;
  pendingCount: number;
  approvedCount: number;
}

export interface SalaryAdvanceRequest {
  _id: string;
  employeeId: {
    email: string;
    firstName: string;
    id: string;
  };
  advanceTaken: number;
  status: string;
  amountRepaid: number;
  nextPaymentDate: string;
  repaymentStatus: string;
}

export interface PaginatedResponse5<T> {
  totalRequests: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  requests: T[];
}

export interface PayrollSummary {
  pending: number;
  rejected: number;
  approved: number;
  draft: number;
  processed: number;
  totalPayroll: number;
  totalCostByStatus: {
    pending: number;
    rejected: number;
    approved: number;
    draft: number;
    processed: number;
  };
}

export type Role = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string[];
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type AddEmployeePayload = {
  employmentInformation: {
    jobTitle: string;
    department: string;
    manager: string;
    employmentType: "full_time" | "part_time" | "contract" | "internship";
    employmentStatus: "active" | "inactive" | "terminated";
    workLocation: string;
    workSchedule: "9_to_5" | "shift" | "flexible";
    probationPeriod: string;
    contractEndDate: string;
    staffId: string;
    workEmail: string;
    workPhoneNumber: string;
    hireDate: string;
    jobDescription: string;
  };
  personalInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    maritalStatus: "single" | "married" | "divorced" | "widowed";
    phoneNumber: string;
    email: string;
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    postalCode: string;
    nationality: string;
    idUpload: string;
    passport: string;
  };
  compensation: {
    baseSalary: number;
    salaryFrequency: "monthly" | "weekly" | "biweekly" | "yearly";
    overtime: "time_and_half" | "double_time" | "none";
    taxFilingStatus: "active" | "inactive";
    paymentMethod: "bank_transfer" | "check" | "cash";
    bankName: string;
    bankAccountNo: string;
    effectiveDateOfCompensation: string;
    bonusStructure?: string;
    commission: number;
    stockOptions: number;
    routingNo: string;
    payGrade: string;
    taxIdentificationNumber: string;
    allowance: { [x: string]: string | number }[];
    deduction: { [x: string]: string | number }[];
  };
  nextOfKin: {
    fName: string;
    lName: string;
    gender: "male" | "female" | "other";
    relationship: string;
    nextPhoneNumber: string;
    nextemail: string;
  };
  documents: {
    documentName: string;
    documentUrl: string;
  }[];
  accessRights: {
    devices: string[];
    permissions: {
      tool: string;
      id: string;
    }[];
  }[];
};

export type PayrollSettings = {
  general: {
    payPeriod: "monthly" | "biweekly" | "weekly" | "daily";
    payDate: string;
  };
  overtime: {
    rate: number;
    maximumAllowed: number;
  };
  deductionAndContributions: {
    tax: number;
    pension: number;
    healthInsurance: number;
    transportation: number;
  };
  leave: {
    unpaidDeduction: number;
    sickLeavePolicies: string;
  };
  approval: {
    levels: ("finance_admin" | "super_admin")[];
    notifyApprovers: boolean;
  };
  proratedPayment: {
    rules: string;
    enable: boolean;
  };
};

export type AttendanceRecord = {
  attendanceId: string;
  employeeId: string;
  employeeName: string;
  staffId: string;
  department: { departmentId: string; departmentName: string };
  jobTitle: string;
  date: string; // ISO date string
  clockIn: string; // ISO date string
  clockOut: string | "N/A";
  totalHoursWorked: number | null;
  attendanceStatus: "Present" | "Absent" | "Late" | "On Leave"; // Adjust based on possible statuses
  overtime: number;
};

export type PaginatedResponse6<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type EmployeeUpdateRequest = {
  employeeId: string;
  updates: {
    field: string;
    value: any;
  }[];
  isEmployeeRequest: boolean;
  isHrRequest: boolean;
  reasonForUpdate: string;
  supportingDocuments: string[];
};

export type PaginatedDevices<T> = {
  totalDevices: number;
  totalPages: number;
  currentPage: number;
  devices: T[];
};

export type AttendanceResponse = {
  data: AttendanceRecord[];
  total: number;
  totalEmployees: number;
  totalDaysAnalyzed: number;
  statusCounts: {
    null?: number;
    late?: number;
    on_leave?: number;
  };
  currentPage: number;
  totalPages: number;
};

type LeaveRecord = {
  employee: {
    employmentInformation: {
      department: {
        departmentName: string;
        id: string;
      };
      staffId: string;
      id: string;
    };
    personalInfo: {
      firstName: string;
      lastName: string;
      id: string;
    };
    id: string;
  };
  leaveType: {
    name: string;
    description: string;
    numberOfDays: number;
    company: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  startDate: string;
  endDate: string;
  numberOfDays: number;
  status: string;
  reliefOfficer: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  user: {
    employmentInformation: {
      department: {
        departmentName: string;
        id: string;
      };
      staffId: string;
      id: string;
    };
    personalInfo: {
      firstName: string;
      lastName: string;
      id: string;
    };
    id: string;
  };
  id: string;
};

export type LeaveResponse = {
  data: LeaveRecord[];
  totalPages: number;
  currentPage: number;
  count: number;
  totalDaysOnLeave: number;
};

export type Task = {
  taskName: string;
  status: string;
  description: string;
  label: string;
  dueDate: string;
  employees: {
    personalInfo: {
      firstName: string;
      lastName: string;
      id: string;
    };
    id: string;
  }[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

type DepartmentStats = {
  totalEmployees: number;
  male: number;
  female: number;
};

export interface PaginatedResponse8<T> {
  data: T;
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export type EmployeeDistribution = {
  [departmentName: string]: DepartmentStats;
};

type TurnoverBreakdownStats = {
  totalEmployees: number;
  employeesThatLeft: number;
  turnoverPercentage: number;
};

export type TurnoverBreakdown = {
  [departmentName: string]: TurnoverBreakdownStats;
};

export type TurnoverReport = {
  turnoverReport: {
    [department: string]: {
      totalEmployees: number;
      employeesThatLeft: number;
      turnoverPercentage: number;
    };
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalDepartments: number;
  };
};

type GenderStats = {
  Male: number;
  Female: number;
};

type EmploymentTypeStats = {
  FullTime: number;
  PartTime: number;
  Contract: number;
  Intern: number;
  Freelancer: number;
};

type EmploymentStatusStats = {
  Active: number;
  OnLeave: number;
  Probation: number;
  Resigned: number;
  Terminated: number;
};

export type EmployeeStats = {
  gender: GenderStats;
  employmentType: EmploymentTypeStats;
  employmentStatus: EmploymentStatusStats;
};

type LeaveType = {
  name: string;
  description: string;
  numberOfDays: number;
  company: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string;
};

export type LeaveRequest = {
  employee: string;
  leaveType: LeaveType;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  numberOfDays: number;
  status: "approved" | "pending" | "rejected"; // Adjust as needed
  reliefOfficer: string;
  company: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  approvedAt?: string; // Optional because it might not exist for pending/rejected leaves
  user: string;
  id: string;
};
