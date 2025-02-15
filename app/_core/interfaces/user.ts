export interface IUser {
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

export interface ICompanyUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  employee: string;
  role: string[];
  status: 'active' | 'inactive' | 'pending';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserStatistics {
  totalActiveUsers: number;
  totalInactiveUsers: number;
  retentionRate: string;
  engagementRate: string;
}