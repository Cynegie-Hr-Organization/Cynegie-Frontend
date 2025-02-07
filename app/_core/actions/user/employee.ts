import { handleError, Http } from "@/app/_core/utils/axios";
import { headers } from "@/app/_core/utils/session";
import { getSession } from "next-auth/react";


export const getAllEmployees = async (query?: {
  page: number;
  limit: number;
  search: string | undefined;
  sortOrder: string;
  status: string;
}, endpoint: string = 'employees/mine') => {

  const sortOrder = query?.sortOrder ?? 'desc';
  const page = query?.page ?? '1';
  const limit = query?.limit ?? '5';
  const search = query?.search;
  const status = query?.status;

  let queryStr = `?`;

  if (sortOrder) queryStr += `sortOrder=${sortOrder}`;
  if (page) queryStr += `&page=${page}`;
  if (limit) queryStr += `&limit=${limit}`;
  if (status) queryStr += `&status=${status}`;
  if (search) queryStr += `&search=${search}`;

  console.log(endpoint + queryStr)

  try {
    const session = await getSession();
    const { data } = await Http.get<IEmployeeRes>(endpoint + queryStr, {
      headers: await headers(session?.token ?? ''),
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
}









export interface Allowance {
  allowanceName: string;
  allowanceAmount: number;
  _id?: string;
  id: string;
}

export interface Deduction {
  deductionName: string;
  deductionAmount: number;
  _id?: string;
  id: string;
}

export interface Document {
  documentName: string;
  documentUrl: string;
  id: string;
}

export interface NextOfKin {
  firstName: string;
  lastName: string;
  gender: string;
  relationship: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Department {
  departmentName: string;
  id: string;
}

export interface EmploymentInformation {
  jobTitle: string;
  department: Department;
  manager: string;
  employmentType: 'full_time' | 'part_time' | 'contract';
  employmentStatus: 'active' | 'on_leave' | 'terminated';
  workLocation: string;
  workSchedule: string;
  probationPeriod: string;
  contractEndDate: string;
  staffId: string;
  workEmail: string;
  hireDate: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  gender: 'male' | 'female' | 'other';
  state: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  nationality: string;
  maritalStatus: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Compensation {
  baseSalary: number;
  salaryFrequency: 'annual' | 'monthly' | 'weekly';
  overtime: string;
  taxFilingStatus: string;
  paymentMethod: string;
  bonusStructure: string;
  commission: number;
  stockOptions: number;
  payGrade: string;
  taxIdentificationNumber: string;
  allowance: Allowance[];
  deduction: Deduction[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface AccessRights {
  _id: string;
  devices: string[];
  permissions: string[];
}

export interface IEmployee {
  canHrEdit: boolean;
  canEmployeeEdit: boolean;
  employmentInformation: EmploymentInformation;
  personalInfo: PersonalInfo;
  compensation: Compensation;
  documents: Document[];
  NextOfKin: string[];
  accessRights: AccessRights[];
  deletedAt: string | null;
  department: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  nextOfKin: NextOfKin[];
}

export interface IEmployeeMetaRes {
  itemCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface IEmployeeRes {
  status: 'success' | 'error';
  message: string;
  data: IEmployee[];
  meta: IEmployeeMetaRes;
}