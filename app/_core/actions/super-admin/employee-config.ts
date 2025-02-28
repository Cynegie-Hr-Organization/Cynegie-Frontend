import { getSession } from "next-auth/react";
import { Http, handleError } from "../../utils/axios";
import { headers } from "../../utils/session";


export const getEmployeeNumberingSystem = async () => {
  try {
    const session = await getSession();
    const { data } = await Http.get<EmployeeNumberingSystem>("company/employee-config", {
      headers: await headers(session?.token ?? '')
    });
    console.log(data);
    
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateEmployeeNumberingSystem = async (body: Partial<EmployeeNumberingSystem>) => {
  try {
    const session = await getSession();
    const { data } = await Http.put<EmployeeNumberingSystem>("company/employee-config", body, {
      headers: await headers(session?.token ?? '')
    });
    console.log(data);
    
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export interface EmployeeNumberingSystem {
  company: string;
  branchAbbreviation: string;
  createdAt: string;
  departmentAbbreviation: string;
  month: number;
  separator: string;
  sequentialNumber: number;
  updatedAt: string;
  year: number;
  id: string;
}


