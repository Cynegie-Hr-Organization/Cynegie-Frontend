/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";
import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

// Define interfaces for the response data
interface Allowance {
  allowanceName: string;
  allowanceAmount: number;
  id: string;
}

interface Deduction {
  deductionName: string;
  deductionAmount: number;
  id: string;
}

interface Compensation {
  baseSalary: number;
  salaryFrequency: string;
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
  id: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  gender: string;
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

interface EmployeeInfo {
  employmentInformation: string;
  personalInfo: PersonalInfo;
  compensation: Compensation;
  NextOfKin: string[];
  deletedAt: string | null;
  department: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface EmployeeDetails {
  employeeId: string;
  employeeInfo: EmployeeInfo;
  compensation: Compensation;
}

interface Payroll {
  payrollName: string;
  startDate: string;
  endDate: string;
  status: string;
  paymentDate: string;
  employees: string[];
  deletedAt: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface PayrollData {
  payroll: Payroll;
  employeeDetails: EmployeeDetails;
  nextPayDate: string;
  lastPaycheck: string;
  totalEarnings: number;
  timeInCompany: number;
}

interface GetAllMyPayrollResponse {
  data: PayrollData[];
  itemCount: number;
  totalPages: number;
}

export const getAllMyPayroll = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  search?: string,
): Promise<GetAllMyPayrollResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/payroll/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      search,
    },
  });

  return response as GetAllMyPayrollResponse;
};
