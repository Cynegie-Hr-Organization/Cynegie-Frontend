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
  requiredSkills: string[];
  type: string;
}

export interface Job extends CreateJobProps {
  user: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
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
