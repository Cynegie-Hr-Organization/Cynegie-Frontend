
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

// Type for the company object inside each item
interface Company {
  name: string;
  id: string;
}

// Type for each salary advance request item
interface SalaryAdvanceRequest {
  _id: string;
  employeeId: string;
  advanceTaken: number;
  status: "pending" | "approved" | "rejected"; // assuming possible statuses
  paymentFrequency: "MONTHLY" | "YEARLY"; // assuming possible payment frequencies
  installment: number;
  amountRepaid: number;
  payments: any[]; // you can refine this type based on the actual payment structure
  nextPaymentDate: string; // ISO date string
  company: Company;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}



// Type for the full response data from `getAllMyRequest`
interface GetAllMyRequestResponse {
  data: {
    items: SalaryAdvanceRequest[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  }
  
}

// Define the structure of each benefit item
type Benefit = {
  name: string;
  id: string;
};

// Define the structure of the response data
type BenefitData = {
  benefitType?: string; // Optional since some items might not have it
  benefit?: Benefit;    // Optional since some items might have it instead
  employee: string;
  provider: string;
  coveragePlan: string;
  monthlyCost: number;
  status: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
};

// Define the overall response type
type GetAllMyAppResponse = {
  data: BenefitData[];
  total: number;
  page: number;
  limit: number;
};




export const salaryAdvanceRequests = async (payload : any) => {
  const session = await getServerSession(authOptions);

  const response = await request("POST", `${baseUrl}/v1/salary-advance-requests`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
      },
      data : payload,
  });

  return response;
}


export const getAllMyRequest = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  status?: string,
  search?: string
): Promise<GetAllMyRequestResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/salary-advance-requests/my-requests`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: {
      sortOrder,
      page,
      limit,
      status,
      search,
    },
  }) as Promise<GetAllMyRequestResponse>;
};



//get all benefits 
export const getAllBenefits = async () => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/benefits`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
    
    
  if (!response || !response.data) {
  throw new Error("Failed to fetch benefits data");
}

const allBenefits = response.data.map((item: any) => ({
  label: item.benefitType, 
  value: item.id, 
})) || [];

  return allBenefits ;
};


export const requestbenefits = async (payload : any) => {
  const session = await getServerSession(authOptions);
  
  const response = await request("POST", `${baseUrl}/v1/benefits/request-benefit`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data : payload
    }
  )

  return response;

}



export const getAllMyBenefitsRequest = async (
  sortOrder: string = "desc",
  page: number,
  limit: number,
  search?: string
): Promise<GetAllMyAppResponse> => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/benefits/my-benefits`, {
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

  return response as GetAllMyAppResponse;
};



export const getAllBenefitsMetrics = async () => {
  const session = await getServerSession(authOptions);

  const response = await request("GET", `${baseUrl}/v1/benefits/summary`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
  
  return response;
}