import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";


export const getSuperAdminSettings = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<ISuperAdminSettings>('company', {
      headers: await headers(session?.token ?? '')
    })

    return data;

  } catch (error) {
    throw handleError(error)
  }
}













export type ApprovalStage = {
  stageName: string;
  approvers: string[];
};

export type ApprovalWorkflowSettings = {
  stages: ApprovalStage[];
};

export type UserAccessSecuritySettings = {
  minPasswordLength: number;
  passwordComplexity: 'low' | 'medium' | 'high';
  sessionTimeout: number;
};

export type IntegrationSettings = {
  api: string;
  thirdPartyIntegrations: string[];
  scheduleDataBackups: 'daily' | 'weekly' | 'monthly';
  errorLogLevel: 'debug' | 'info' | 'warn' | 'error';
};

export type ComplianceSettings = {
  complianceReminderFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dataRetentionDuration: number;
};

export type CustomizationSettings = {
  themeAndBranding: 'light' | 'dark' | 'system';
  dashboardConfiguration: 'default' | 'compact' | 'detailed';
};

export type SystemSettings = {
  approvalWorkflowSettings: ApprovalWorkflowSettings;
  userAccessSecuritySettings: UserAccessSecuritySettings;
  integrationSettings: IntegrationSettings;
  complianceSettings: ComplianceSettings;
  customizationSettings: CustomizationSettings;
};

export type NotificationType = 'email' | 'sms' | 'push' | 'none';

export interface ISuperAdminSettings {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';

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