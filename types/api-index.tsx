import { Department } from ".";

export type CompanyRegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
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

export interface PaginatedResponse<T> {
  status: number;
  message: string;
  data: {
    totalPages: number;
    count: number;
    currentPage: number;
    data: T[];
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

export type ServerResponse<T> = {
  status: string;
  message: string;
  data: T[];
  meta: PaginationMeta;
};

type PaginationMeta = {
  itemCount: number;
  totalPages: number;
  page: number;
  limit: number;
};

export type Employee = {
  employmentInformation: EmploymentInformation;
  personalInfo: PersonalInfo;
  compensation: Compensation;
  documents: Document[];
  nextOfKin: NextOfKin[];
  accessRights: AccessRight[];
  deletedAt: string | null;
  company: string; // Company ID
  createdAt: string;
  updatedAt: string;
  id: string;
  grossPay: number;
  netPay: number;
  totalAllowance: number;
  totalDeductions: number;
};

export type Document = {
  documentName: string;
  documentUrl: string;
  id: string;
};

export type AccessRight = {
  _id: string;
  devices: { _id: string; deviceName: string }[];
  permissions: {
    tool: string;
    id: string;
    _id: string;
  }[];
};

type EmploymentInformation = {
  jobTitle: string;
  department: Pick<Department, "id" | "departmentName">; // Department ID
  manager: string;
  employmentType: "full_time" | "part_time" | "contract";
  employmentStatus: "active" | "on_leave" | "terminated";
  workLocation: string;
  workSchedule: string;
  workPhoneNumber: string;
  probationPeriod: string;
  contractEndDate: string | null; // ISO date string
  staffId: string;
  workEmail: string;
  hireDate: string; // ISO date string
  jobDescription: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string | null;
};

type PersonalInfo = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  idUpload: string;
  passport: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO date string
  country: string;
  gender: "male" | "female" | "non-binary" | "other";
  state: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  nationality: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string | null;
};

export type Compensation = {
  baseSalary: number;
  salaryFrequency: "annual" | "monthly" | "weekly" | "hourly";
  overtime: string; // e.g., "time_and_half"
  taxFilingStatus: string;
  paymentMethod: string;
  bonusStructure: string;
  commission: number;
  stockOptions: string | number;
  effectiveDateOfCompensation: string;
  bankName: string;
  bankAccountNo: string;
  routingNo: string;
  payGrade: string;
  taxIdentificationNumber: string;
  allowance: Allowance[];
  deduction: Deduction[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string;
};

type Allowance = {
  allowanceName: string;
  allowanceAmount: number;
  id: string;
};

type Deduction = {
  deductionName: string;
  deductionAmount: number;
  id: string;
};

type NextOfKin = {
  fName: string;
  lName: string;
  gender: "male" | "female" | "non-binary" | "other";
  relationship: string;
  nextPhoneNumber: string;
  nextemail: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string;
};

export interface ReviewCycle {
  id: string;
  cycleName: string;
  startDate: string;
  endDate: string;
  daysOfGrace: number;
  employees: string[];
  reviewers: string[];
  reminderType: string;
  reminderFrequency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  company?: string;
}

export interface KeyResult {
  result: string;
  targetValue: number;
  dueDate: string;
  _id: string;
  id: string;
}

export interface Milestone {
  milestoneName: string;
  dueDate: string;
  _id: string;
  id: string;
}

export interface Goal {
  goalName: string;
  description: string;
  goalType: "personal" | "team" | "company";
  priority: "Low" | "Medium" | "High";
  employees: string[];
  dueDate: string;
  status: "not_started" | "in_progress" | "completed";
  alignment: string;
  keyResults: KeyResult[];
  milestones: Milestone[];
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GoalsResponse {
  status: number;
  message: string;
  data: {
    items: Goal[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

// Types for create360Feedback payload
export interface FeedbackDetail {
  feedbackNature: string;
  template: string;
}

export interface Create360FeedbackPayload {
  feedbackName: string;
  employees: string[];
  department: string[];
  feedbackProviders: string[];
  startDate: string; // ISO string format
  endDate: string; // ISO string format
  feedbackDetails: FeedbackDetail[];
  anonymousCycle: boolean;
  status: string;
}

// Types for get360Feedback response
export interface FeedbackItem {
  id: string;
  feedbackName: string;
  employees: string[];
  department: string[];
  startDate: string;
  endDate: string;
  status: string;
  feedbackDetails: FeedbackDetail[];
  anonymousCycle: boolean;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export interface Get360FeedbackResponse {
  items: FeedbackItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
