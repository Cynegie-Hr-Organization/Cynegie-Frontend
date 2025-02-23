export type TimeFrequency = "daily" | "weekly" | "monthly" | "quarterly";
export type ErrorLevel = "debug" | "info" | "warn" | "error";
export type PasswordComplexity = "low" | "medium" | "high";
export type AppThemeType = "light" | "dark" | "system";
export type DashboardLayout = "default" | "compact" | "detailed";
// export type NotificationType = 'email' | 'sms' | 'push' | 'none';
export type NotificationType =
  | "hr-approval"
  | "it-request"
  | "finance-update"
  | "compliance-alert";
export type SuperAdminStatus = "active" | "inactive" | "suspended";

export type ApprovalStage = {
  stageName: string;
  approvers: string[];
};

export type ApprovalWorkflowSettings = {
  stages: ApprovalStage[];
};

export type UserAccessSecuritySettings = {
  minPasswordLength?: number;
  passwordComplexity?: PasswordComplexity;
  sessionTimeout?: number;
};

export type IntegrationSettings = {
  api?: string;
  thirdPartyIntegrations?: string[];
  scheduleDataBackups?: TimeFrequency;
  errorLogLevel?: ErrorLevel;
};

export type ComplianceSettings = {
  complianceReminderFrequency?: TimeFrequency;
  dataRetentionDuration?: string;
};

export type CustomizationSettings = {
  themeAndBranding: AppThemeType;
  dashboardConfiguration: DashboardLayout;
};

export type SystemSettings = {
  approvalWorkflowSettings?: ApprovalWorkflowSettings;
  userAccessSecuritySettings?: UserAccessSecuritySettings;
  integrationSettings?: IntegrationSettings;
  complianceSettings?: ComplianceSettings;
  customizationSettings?: CustomizationSettings;
};

export interface ISuperAdminSettings {
  id?: string;
  name?: string;
  status?: SuperAdminStatus;
  createdAt?: string;
  updatedAt?: string;
  address?: string;
  email?: string;
  phone?: string;
  logo?: string;
  dateFormat?: string;
  timeZone?: string;
  supportedLanguages?: string[];
  notificationType?: NotificationType[];
  enableSystemNotification?: boolean;
  settings?: SystemSettings;
}

export type IPermissionStatus = "active" | "inactive" | "suspended";

export interface IUserRole {
  name: string;
  id: string;
}

export interface IUserPermission {
  AccessModules?: string[];
  type: "full_access" | "limited_access" | "no_access";
  limitedAccessModules?: string[];
  viewModules?: string[];
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  employee: string;
  company: string;
  status: IPermissionStatus;
  isActive: boolean;
  isEmailVerified: boolean;
  role: IUserRole[];
  permissions: IUserPermission[];
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IPermissionsMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPermissionRes {
  status: number;
  message: string;
  data: IUserData[];
  meta: IPermissionsMeta;
}
