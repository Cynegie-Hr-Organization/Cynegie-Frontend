export type TimeFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly';
export type ErrorLevel = 'debug' | 'info' | 'warn' | 'error';
export type PasswordComplexity = 'low' | 'medium' | 'high';
export type AppThemeType = 'light' | 'dark' | 'system';
export type DashboardLayout = 'default' | 'compact' | 'detailed';
export type NotificationType = 'email' | 'sms' | 'push' | 'none';
export type SuperAdminStatus = 'active' | 'inactive' | 'suspended';

export type ApprovalStage = {
  stageName: string;
  approvers: string[];
};

export type ApprovalWorkflowSettings = {
  stages: ApprovalStage[];
};

export type UserAccessSecuritySettings = {
  minPasswordLength: number;
  passwordComplexity: PasswordComplexity;
  sessionTimeout: number;
};

export type IntegrationSettings = {
  api: string;
  thirdPartyIntegrations: string[];
  scheduleDataBackups: TimeFrequency;
  errorLogLevel: ErrorLevel;
};

export type ComplianceSettings = {
  complianceReminderFrequency: TimeFrequency;
  dataRetentionDuration?: number;
};

export type CustomizationSettings = {
  themeAndBranding: AppThemeType;
  dashboardConfiguration: DashboardLayout;
};

export type SystemSettings = {
  approvalWorkflowSettings: ApprovalWorkflowSettings;
  userAccessSecuritySettings: UserAccessSecuritySettings;
  integrationSettings: IntegrationSettings;
  complianceSettings: ComplianceSettings;
  customizationSettings: CustomizationSettings;
};

export interface ISuperAdminSettings {
  id: string;
  name: string;
  status: SuperAdminStatus;
  createdAt: string;
  updatedAt: string;
  address: string;
  email: string;
  phone: string;
  logo: string;
  dateFormat: string;
  timeZone: string;
  supportedLanguages: string[];
  notificationType: NotificationType;
  enableSystemNotification: boolean;
  settings: SystemSettings;
}