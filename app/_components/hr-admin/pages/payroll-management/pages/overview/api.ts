"use server";

import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
  AttendanceRecord,
  AttendanceResponse,
  BenefitsSummary,
  Device,
  EmployeeDistribution,
  EmployeeStats,
  EmployeeUpdateRequest,
  FetchParams,
  FetchResponse,
  LeaveRequest,
  LeaveResponse,
  MonthlyData,
  PaginatedDevices,
  PaginatedResponse2,
  PaginatedResponse4,
  PaginatedResponse5,
  PaginatedResponse6,
  PaginatedResponse8,
  Payroll,
  PayrollSettings,
  PayrollSummary,
  SalaryAdvanceRequest,
  SalaryAdvanceSummary,
  Task,
} from "@/types";
import { Employee } from "@/types/api-index";

export const getPayrolls = async (
  params: FetchParams
): Promise<PaginatedResponse2<Payroll>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/payroll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedResponse2<Payroll>>;
};

export const getPayroll = async (
  id: string
): Promise<FetchResponse<Payroll>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
  }) as Promise<FetchResponse<Payroll>>;
};

export const getMyEmployees = async (
  params: FetchParams
): Promise<PaginatedResponse2<Employee>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/employees/mine`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedResponse2<Employee>>;
};

export type CreatePayrollPayload = {
  payrollName: string;
  startDate: string;
  endDate: string;
  status: "approved" | "pending" | "rejected";
  paymentDate: string;
  employees: (string | null)[];
};

export const createPayroll = async (payload: CreatePayrollPayload) => {
  const session = await getServerSession(authOptions);
  return request("POST", `${baseUrl}/v1/payroll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const editPayroll = async (
  id: string,
  payload: CreatePayrollPayload
) => {
  const session = await getServerSession(authOptions);
  return request("PUT", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const deletePayroll = async (id: string) => {
  const session = await getServerSession(authOptions);
  return request("DELETE", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};

export const viewPayroll = async (
  id: string
): Promise<FetchResponse<Payroll & { totalEmployees: number }>> => {
  const session = await getServerSession(authOptions);
  return request("GET", `${baseUrl}/v1/payroll/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<FetchResponse<Payroll & { totalEmployees: number }>>;
};

export const getBenefitsSummary = async (): Promise<BenefitsSummary> => {
  const session = await getServerSession(authOptions);

  const res = await request("GET", `${baseUrl}/v1/benefits/summary`, {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return res as Promise<BenefitsSummary>;
};

export const getSalaryAdvanceSummary =
  async (): Promise<SalaryAdvanceSummary> => {
    const session = await getServerSession(authOptions);

    return request("GET", `${baseUrl}/v1/salary-advance-requests/summary`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    }) as Promise<SalaryAdvanceSummary>;
  };

export const getAllSalaryAdvanceRequests = async (
  params: FetchParams & { status: string }
): Promise<PaginatedResponse5<SalaryAdvanceRequest>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/salary-advance-requests/all`, {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    params: params,
  }) as Promise<PaginatedResponse5<SalaryAdvanceRequest>>;
};

export const approveAdvanceRequest = async (id: string) => {
  const session = await getServerSession(authOptions);

  return request(
    "PATCH",
    `${baseUrl}/v1/salary-advance-requests/${id}/approve`,
    {
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
};

export const rejectAdvanceRequest = async (id: string) => {
  const session = await getServerSession(authOptions);

  return request(
    "PATCH",
    `${baseUrl}/v1/salary-advance-requests/${id}/reject`,
    {
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
};

export const getPayrollSummary = async (): Promise<PayrollSummary> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/payroll/status-count`, {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<PayrollSummary>;
};

export const createDepartment = async (payload: {
  departmentName: string;
  departmentManager: string;
  employees: string[];
  userLimit: number;
}) => {
  const session = await getServerSession(authOptions);
  return request("POST", `${baseUrl}/v1/departments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const editDepartment = async (
  id: string,
  payload: {
    departmentName: string;
    departmentManager: string;
    employees: string[];
    userLimit: number;
  }
) => {
  const session = await getServerSession(authOptions);
  return request("PUT", `${baseUrl}/v1/departments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const getDepartments = async () => {
  const session = await getServerSession(authOptions);
  return request("GET", `${baseUrl}/v1/departments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });
};

export const getPayrollSettings = async () => {
  const session = await getServerSession(authOptions);
  return request("GET", `${baseUrl}/v1/payroll-settings`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<PayrollSettings>;
};

export const getAttendanceRecords = async (
  params: FetchParams
): Promise<PaginatedResponse6<AttendanceRecord>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/attendance`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedResponse6<AttendanceRecord>>;
};

export const setPayrollSettings = async (payload: PayrollSettings) => {
  const session = await getServerSession(authOptions);

  return request("POST", `${baseUrl}/v1/payroll-settings`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const requestEmployeeUpdate = async (payload: EmployeeUpdateRequest) => {
  const session = await getServerSession(authOptions);

  return request("POST", `${baseUrl}/v1/profile-updates`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const getDevices = async (
  params: FetchParams
): Promise<PaginatedDevices<Device>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/devices`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedDevices<Device>>;
};

export const getBulkAttendanceReport = async (
  params: FetchParams & {
    startDate?: string;
    endDate?: string;
  }
): Promise<AttendanceResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/attendance/report`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<AttendanceResponse>;
};

export const getAllLeaves = async (
  params: FetchParams
): Promise<LeaveResponse> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/leave/all-leaves`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<LeaveResponse>;
};

export const getTaskSummary = async (): Promise<{
  totalTasks: number;
  completedTasks: number;
  tasksInProgress: number;
  dueTasks: number;
}> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/task/summary`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
  }) as Promise<{
    totalTasks: number;
    completedTasks: number;
    tasksInProgress: number;
    dueTasks: number;
  }>;
};

export const getEmployeeDemographyCharts = async (): Promise<EmployeeStats> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/employees/totals`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
  }) as Promise<EmployeeStats>;
};

export const getAllTasks = async (
  params: FetchParams
): Promise<PaginatedResponse4<Task>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/task`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedResponse4<Task>>;
};

export const getDepartmentStats = async (
  params: FetchParams
): Promise<PaginatedResponse8<EmployeeDistribution>> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/employees/department-stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
    params: params,
  }) as Promise<PaginatedResponse8<EmployeeDistribution>>;
};

export const getLeaveRequest = async (id: string): Promise<LeaveRequest> => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/leave/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, // Add session token to Authorization header
    },
  }) as Promise<LeaveRequest>;
};

export const post = async (endpoint: string, data?: any) => {
  const session = await getServerSession(authOptions);
  return request("POST", `${baseUrl}/v1/${endpoint}`, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    ...(data && { data: data }),
  });
};

export const apiRequest = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  body?: any,
  params?: any
) => {
  const session = await getServerSession(authOptions);
  return request(method, `${baseUrl}/v1/${endpoint}`, {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    ...(body !== undefined && { data: body }),
    params: params,
  });
};

export const bulkApprove = async (payload: { leaveIds: string[] }) => {
  const session = await getServerSession(authOptions);

  return request("POST", `${baseUrl}/v1/leave/bulk-approve`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const bulkReject = async (payload: { leaveIds: string[] }) => {
  const session = await getServerSession(authOptions);

  return request("POST", `${baseUrl}/v1/leave/bulk-reject`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const getTurnoverChartData = async () => {
  const session = await getServerSession(authOptions);

  return request("GET", `${baseUrl}/v1/employees/turnover`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  }) as Promise<MonthlyData>;
};

export const getToken = async () => {
  const session = await getServerSession(authOptions);
  return session?.token;
};

export const adjustAttendance = async (
  id: string,
  payload: { clockIn: string; clockOut: string }
) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${baseUrl}/v1/attendance/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};
