import { Goal } from "@/types";

export interface PersonalInfo {
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
  department: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Question {
  question: string;
  description: string;
  responseCriteria: string;
  options: string[];
  allowComments: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Template {
  templateName: string;
  instructions: string;
  deleted: boolean;
  createdBy: string;
  questions: Question[];
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Assessment {
  assessmentName: string;
  type: string;
  employees: Employee[];
  manager: string | null;
  template: Template;
  dueDate: string;
  status: string;
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GetAllMySelfAssessmentResponse {
  status: number;
  message: string;
  data: {
    items: Assessment[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface GoalResponse {
  data: Goal[];
  itemCount: number;
  totalPages: number;
  page: number;
  limit: number;
}
