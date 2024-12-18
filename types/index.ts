export type ColorVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'grey'
  | 'purple'
  | 'ash';

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
  status: 'PENDING' | 'APPROVED' | 'DENIED';
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
  status: 'ACTIVE' | 'INACTIVE';
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SecurityAlert {
  id: string;
  alertTitle: string;
  description: string;
  date: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; // Enum for severity levels
  company: {
    id: string;
    name: string;
    status: 'active' | 'inactive';
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
