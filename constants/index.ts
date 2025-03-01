import { StatusMap } from "@/app/_components/shared/table/types";
import { FetchParams } from "@/types";
import { ChartOptions } from "chart.js";

export const iconBaseUrl = "/icons/";

export const icon = {
  graduatingCap: `${iconBaseUrl}graduating-cap.svg`,
  square: `${iconBaseUrl}square.svg`,
  bin: `${iconBaseUrl}bin.svg`,
  gift: `${iconBaseUrl}gift.svg`,
  paperMoney: `${iconBaseUrl}paper-money.svg`,
  paperMoneyTwo: `${iconBaseUrl}paper-money-two.svg`,
  grid: `${iconBaseUrl}grid.svg`,
  stack: `${iconBaseUrl}stack.svg`,
  message: `${iconBaseUrl}message.svg`,
  calendar: `${iconBaseUrl}calendar.svg`,
  calendarTwo: `${iconBaseUrl}calendar-2.svg`,
  calendarThree: `${iconBaseUrl}calendar-three.svg`,
  clock: `${iconBaseUrl}clock.svg`,
  clockTwo: `${iconBaseUrl}clock-two.svg`,
  user: `${iconBaseUrl}user.svg`,
  userFilled: `${iconBaseUrl}user-filled.svg`,
  signOut: `${iconBaseUrl}sign-out.svg`,
  receipt: `${iconBaseUrl}receipt.svg`,
  key: `${iconBaseUrl}key.svg`,
  devices: `${iconBaseUrl}devices.svg`,
  airplane: `${iconBaseUrl}airplane.svg`,
  barChart: `${iconBaseUrl}barchart.svg`,
  clipboard: `${iconBaseUrl}clipboard.svg`,
  workstation: `${iconBaseUrl}workstation.svg`,
  cube: `${iconBaseUrl}cube.svg`,
  thunderbolt: `${iconBaseUrl}thunderbolt.svg`,
  userGroup: `${iconBaseUrl}user-group.svg`,
  userGroupTwo: `${iconBaseUrl}user-group-two.svg`,
  checkCircle: `${iconBaseUrl}check-circle.svg`,
  download: `${iconBaseUrl}download.svg`,
  deleteX: `${iconBaseUrl}delete-x.svg`,
  successTick: `${iconBaseUrl}success-tick.svg`,
  pdf: `${iconBaseUrl}pdf.svg`,
  excel: `${iconBaseUrl}excel.svg`,
  plus: `${iconBaseUrl}plus.svg`,
  box: `${iconBaseUrl}box.svg`,
  exit: `${iconBaseUrl}exit.svg`,
  circlePlus: `${iconBaseUrl}circle-plus.svg`,
  app: `${iconBaseUrl}app.svg`,
  taskSquare: `${iconBaseUrl}task-square.svg`,
  statusUp: `${iconBaseUrl}status-up.svg`,
  documentCode: `${iconBaseUrl}document-code.svg`,
  figma: `${iconBaseUrl}figma.svg`,
  zoom: `${iconBaseUrl}excel.svg`,
  naira: `${iconBaseUrl}naira.svg`,
  settings: `${iconBaseUrl}settings.svg`,
};

export const color = {
  primary: {
    dark: "#0035C3",
  },
  success: {
    dark: "#099137",
    light: "#E7F6EC",
  },
  info: {
    extraDark: "#00268A",
    dark: "#0035C3",
    light: "#E6EBF9",
  },
  warning: {
    dark: "#FF9900",
    light: "#FFF5E6",
  },
  error: {
    dark: "#CB1A14",
    light: "#FBEAE9",
  },
  grey: {
    dark: "#000000",
    light: "#E6EBF9",
  },
  purple: {
    dark: "#000000",
    light: "#EADAFF",
  },
  ash: {
    dark: "#000000",
    light: "#DEE3FF",
  },
  button: {
    contained: {
      backgroundColor: "#0035C3",
      color: "#FFFFFF",
    },
    outlined: {
      backgroundColor: "#FFFFFF",
      color: "#475367",
      borderColor: "#98A2B3",
    },
    filter: {
      backgroundColor: "#FFFFFF",
      color: "#344054",
      borderColor: "#D0D5DD",
    },
    disabled: {
      backgroundColor: "#98A2B3",
      color: "#101928",
      borderColor: "#98A2B3",
    },
  },
  progress: {
    filled: "#475367",
    unfilled: "#F0F2F5",
  },
  inputfield: {
    disabled: {
      backgroundColor: "#F7F7FA",
      color: "#98A2B3",
    },
  },
  pieChart: {
    info: "#8AA2E3",
    success: "#5FC381",
    error: "#E26E6A",
    warning: "#FFBB54",
    grey: "#CDC4C4",
  },
  barChart: {
    lightBlue: "#B0C0EC",
    midBlue: "#335DCF",
    darkBlue: "#0030B1",
  },
  icon: {
    grey: "#667185",
  },
};

export const defaultDonutChartData = {
  labels: ["", ""],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: [color.info.dark, "#F0F2F5"],
      borderWidth: 0,
      borderRadius: [0, 0],
      spacing: -10,
    },
  ],
};

export const defaultDonutChartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  events: [],
  cutout: "85%",
};

export const APRStatusMap: StatusMap = {
  approved: "success",
  pending: "warning",
  rejected: "error",
};

export const CISStatusMap: StatusMap = {
  Completed: "success",
  "In Progress": "warning",
  "Not Started": "error",
};

export const SAStatusMap: StatusMap = {
  completed: "success",
  in_progress: "warning",
  not_started: "error",
};

export const CPStatusMap: StatusMap = {
  completed: "success",
  pending: "warning",
};

export const AttendanceStatusMap: StatusMap = {
  Present: "grey",
  Late: "info",
  Absent: "error",
};

export const DeviceRequestStatusMap: StatusMap = {
  pending: "warning",
  completed: "success",
};

export const ReadAdminStatusMap: StatusMap = {
  Read: "warning",
  Admin: "info",
};

export const CourseStatusMap: StatusMap = {
  CANCELLED: "warning",
  DRAFT: "info",
  COMPLETED: "success",
  ACTIVE: "success",
  Read: "warning",
  Admin: "info",
};

export const AppRequestStatusMap: StatusMap = {
  inactive: "error",
  active: "success",
};

export const GoalStatusMap: StatusMap = {
  not_started: "error",
  completed: "success",
};

export const PDStatusMap: StatusMap = {
  completed: "success",
  pending: "warning",
};

export const tableFilter = {
  department: { name: "Department", items: ["All", "Sales", "Finance", "IT"] },
  status: {
    name: "Status",
    items: ["All", "Approved", "Pending", "Rejected"],
  },
};

const basePath = {
  employee: "/employee/",
  hrAdmin: "/hr-admin/",
  performanceManagement: "performance-management/",
  managerPerformanceManagement : "performance-management-manager/",
  learningDevelopment: "learning-development/",
  benefits: "benefits/",
  upcomingWidget: "upcoming-widget/",
  task: "task/",
  performanceSummary: "performance-summary/",
  attendance: "attendance/",
  leave: "leave-management/",
  profile: "profile/",
  device: "device-management/",
  appRequest: "app-request/",
  employeeManagement: "employee-management/",
  approvalManagement: "approval/",
  attendanceManagement: "attendance/",
  roleManagement: "role/",
  directory: "directory/",
  appManagement: "app-management/",
  payroll: "payroll/",
  editPayroll: "edit-payroll/",
  viewPayroll: "view/",
};

export const route = {
  hrAdmin: {
    payroll: {
      overview: {
        home: `${basePath.hrAdmin}${basePath.payroll}overview`,
        createPayroll: `${basePath.hrAdmin}${basePath.payroll}create-payroll`,
      },
      "edit-payroll": `${basePath.hrAdmin}${basePath.payroll}${basePath.editPayroll}`,
      "view-payroll": `${basePath.hrAdmin}${basePath.payroll}${basePath.viewPayroll}`,
    },
    employeeManagement: {
      approvalManagement: {
        home: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.approvalManagement}`,
        requestDetails: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.approvalManagement}request-details`,
      },
      attendanceManagement: {
        home: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.attendanceManagement}`,
        bulkReport: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.attendanceManagement}bulk-report`,
        individualReport: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.attendanceManagement}individual-report`,
      },
      roleManagement: {
        home: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.roleManagement}`,
        create: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.roleManagement}create`,
        edit: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.roleManagement}edit`,
      },
      directory: {
        home: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.directory}`,
        addEmployee: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.directory}add-employee`,
        editEmployee: `${basePath.hrAdmin}${basePath.employeeManagement}${basePath.directory}edit`,
      },
    },
    deviceManagement: {
      overview: {
        home: `${basePath.hrAdmin}${basePath.device}overview`,
        inventory: `${basePath.hrAdmin}${basePath.device}inventory`,
        assignment: `${basePath.hrAdmin}${basePath.device}assignment`,
        report: `${basePath.hrAdmin}${basePath.device}report`,
        request: `${basePath.hrAdmin}${basePath.device}request`,
        viewRequest: `${basePath.hrAdmin}${basePath.device}request/view-request`,
        viewDeviceInfo: `${basePath.hrAdmin}${basePath.device}inventory/view-device-info`,
      },
    },
    appManagement: {
      overview: `${basePath.hrAdmin}${basePath.appManagement}overview`,
      inventory: `${basePath.hrAdmin}${basePath.appManagement}inventory`,
      accessTracking: `${basePath.hrAdmin}${basePath.appManagement}access-tracking`,
      request: `${basePath.hrAdmin}${basePath.appManagement}request`,
    },
    settings: `${basePath.hrAdmin}settings`,
  },
  employee: {
    performanceManagement: {
      home: `${basePath.employee}${basePath.performanceManagement}`,
      selfAssessment: `${basePath.employee}${basePath.performanceManagement}self-assessment`,
      viewGoal: `${basePath.employee}${basePath.performanceManagement}view-goal`,
      continuousFeedback: `${basePath.employee}${basePath.performanceManagement}continuous-feedback`,
      developmentPlan: `${basePath.employee}${basePath.performanceManagement}development-plan`,
      viewDevelopmentPlan: `${basePath.employee}${basePath.performanceManagement}view-development-plan`,
      createGoals: `${basePath.employee}${basePath.performanceManagement}create-goal`,
    },
    managerPerformanceManagement: {
      createGoal : `${basePath.employee}${basePath.performanceManagement}create-goal`,
      viewGoal : `${basePath.employee}${basePath.performanceManagement}view-goal/1`,
      goalManagement : `${basePath.employee}${basePath.managerPerformanceManagement}goal-management`,
      managerAssessment: `${basePath.employee}${basePath.managerPerformanceManagement}manager-assessment/1`,
    },
    learningDevelopment: {
      home: `${basePath.employee}${basePath.learningDevelopment}`,
      viewDetails: `${basePath.employee}${basePath.learningDevelopment}view-course-details`,
    },
    benefits: {
      home: `${basePath.employee}${basePath.benefits}`,
      salaryAdvance: `${basePath.employee}${basePath.benefits}salary-advance`,
    },
    dashboard: {
      home: `${basePath.employee}`,
      upcomingWidget: `${basePath.employee}${basePath.upcomingWidget}`,
      task: `${basePath.employee}${basePath.task}`,
      performanceSummary: `${basePath.employee}${basePath.performanceSummary}`,
    },
    attendance: {
      home: `${basePath.employee}${basePath.attendance}`,
    },
    leave: {
      home: `${basePath.employee}${basePath.leave}`,
    },
    profile: {
      home: `${basePath.employee}${basePath.profile}`,
    },
    device: {
      home: `${basePath.employee}${basePath.device}`,
    },
    appRequest: {
      home: `${basePath.employee}${basePath.appRequest}`,
    },
  },
};

export const initFetchParams: FetchParams = {
  page: 1,
  limit: 10,
  sortOrder: "asc",
};
