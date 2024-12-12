<<<<<<< HEAD
=======


>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
export interface IsubMenu {
  name: string;
  icon: string;
  path: string;
}

export interface Idashboard {
  name: string;
  path: string;
  subMenu?: IsubMenu[];
  darkIcon: string;
  whiteIcon: string;
}

export const data: Idashboard[] = [
  {
<<<<<<< HEAD
    name: "Dashboard",
    darkIcon: "/black-dashboard-icon.svg",
    whiteIcon: "/white-dashboard-icon.svg",
    path: "/hr-admin",
  },

  {
    name: "Onboarding",
    darkIcon: "/black-onboarding-icon.svg",
    whiteIcon: "/white-onboarding-icon.svg",
    path: "/hr-admin/onboarding/overview",
    subMenu: [
      {
        name: "Overview",
        icon: "fa-solid fa-house",
        path: "/hr-admin/onboarding/overview",
      },
      {
        name: "Template",
        icon: "fa-solid fa-house",
        path: "/hr-admin/onboarding/template",
=======
    name: 'Dashboard',
    darkIcon: '/black-dashboard-icon.svg',
    whiteIcon: '/white-dashboard-icon.svg',
    path: '/hr-admin',
  },

  {
    name: 'Onboarding',
    darkIcon: '/black-onboarding-icon.svg',
    whiteIcon: '/white-onboarding-icon.svg',
    path: '/hr-admin/onboarding/overview',
    subMenu: [
      {
        name: 'Overview',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/onboarding/overview',
      },
      {
        name: 'Template',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/onboarding/template',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
      },
    ],
  },

  // {
  //     name: "Recruitment",
  //     whiteIcon: "/white-recruitment-icon.svg",
  //     darkIcon: "/black-recruitment-icon.svg",
  //     path: "/hr-admin/recruitment/submenu1",
  //     subMenu: [
  //         {
  //             name: "Sub Menu 1",
  //             icon: "fa-solid fa-house",
  //             path: "/hr-admin/recruitment/submenu1",
  //         },
  //         {
  //             name: "Sub Menu 2",
  //             icon: "fa-solid fa-house",
  //             path: "/hr-admin/recruitment/submenu2",
  //         },
  //     ]
  // },

  {
<<<<<<< HEAD
    name: "Hiring",
    whiteIcon: "/white-recruitment-icon.svg",
    darkIcon: "/black-recruitment-icon.svg",
    path: "/hr-admin/hiring/overview",
    subMenu: [
      {
        name: "Overview",
        icon: "fa-solid fa-house",
        path: "/hr-admin/hiring/overview",
      },
      {
        name: "Jobs",
        icon: "fa-solid fa-house",
        path: "/hr-admin/hiring/jobs",
      },
      {
        name: "Candiate Manage...",
        icon: "fa-solid fa-house",
        path: "/hr-admin/hiring/candiate-management",
      },
      {
        name: "Interviews Schedu...",
        icon: "fa-solid fa-house",
        path: "/hr-admin/hiring/interviews-schedule",
      },
      {
        name: "Offer Management",
        icon: "fa-solid fa-house",
        path: "/hr-admin/hiring/offer-management",
=======
    name: 'Hiring',
    whiteIcon: '/white-recruitment-icon.svg',
    darkIcon: '/black-recruitment-icon.svg',
    path: '/hr-admin/hiring/overview',
    subMenu: [
      {
        name: 'Overview',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/hiring/overview',
      },
      {
        name: 'Jobs',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/hiring/jobs',
      },
      {
        name: 'Candiate Manage...',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/hiring/candiate-management',
      },
      {
        name: 'Interviews Schedu...',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/hiring/interviews-schedule',
      },
      {
        name: 'Offer Management',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/hiring/offer-management',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
      },
    ],
  },

  //   Performance Management Section
  {
<<<<<<< HEAD
    name: "Performance Management",
    whiteIcon: "/white-recruitment-icon.svg",
    darkIcon: "/black-recruitment-icon.svg",
    path: "/hr-admin/performance-magnt/overview",
    subMenu: [
      {
        name: "Overview",
        icon: "fa-solid fa-house",
        path: "/hr-admin/performance-magnt/overview",
      },
      {
        name: "Goals",
        icon: "fa-solid fa-house",
        path: "/hr-admin/performance-magnt/goals",
=======
    name: 'Performance Management',
    whiteIcon: '/white-recruitment-icon.svg',
    darkIcon: '/black-recruitment-icon.svg',
    path: '/hr-admin/performance-magnt/overview',
    subMenu: [
      {
        name: 'Overview',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/performance-magnt/overview',
      },
      {
        name: 'Goals',
        icon: 'fa-solid fa-house',
        path: '/hr-admin/performance-magnt/goals',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
      },
    ],
  },
];

export const employeeSidebarData: Idashboard[] = [
  {
<<<<<<< HEAD
    name: "Dashboard",
    darkIcon: "/black-dashboard-icon.svg",
    whiteIcon: "/white-dashboard-icon.svg",
    path: "/employee",
  },
  {
    name: "Task",
    darkIcon: "/black-task-icon.svg",
    whiteIcon: "/white-task-icon.svg",
    path: "/employee/task",
  },

  {
    name: "App Request and Permission",
    darkIcon: "/app-request-svg-black.svg",
    whiteIcon: "/app-request-svg.svg",
    path: "/employee/app-permission-request",
  },
  {
    name: "Leave Management",
    darkIcon: "/leave-management.svg",
    whiteIcon: "/leave-management-white.svg",
    path: "/employee/leave",
  },

  {
    name: "Profile",
    darkIcon: "/user-dark.svg",
    whiteIcon: "/user-light.svg",
    path: "/employee/profile",
  },

  {
    name: "Payroll",
    darkIcon: "/payroll-svg-black.svg",
    whiteIcon: "/payroll-svg.svg",
    path: "/employee/payroll",
  },
  {
    name: "Device Management",
    darkIcon: "/device-management-black.svg",
    whiteIcon: "/device-management.svg",
    path: "/employee/device-management",
  },
  {
    name: "Performance Management",
    darkIcon: "/performance-management.svg",
    whiteIcon: "/performance-management-white.svg",
    path: "/employee/performance-management",
  },
  {
    name: "Learning Development",
    darkIcon: "/learning-course-black.svg",
    whiteIcon: "/learning-course.svg",
    path: "/employee/learning-courses",
  },
  {
    name: "Attendance And Time Tracking",
    darkIcon: "/attendance-black.svg",
    whiteIcon: "/attendance.svg",
    path: "/employee/attendance",
=======
    name: 'Dashboard',
    darkIcon: '/black-dashboard-icon.svg',
    whiteIcon: '/white-dashboard-icon.svg',
    path: '/employee',
  },
  {
    name: 'Task',
    darkIcon: '/black-task-icon.svg',
    whiteIcon: '/white-task-icon.svg',
    path: '/employee/task',
  },

  {
    name: 'App Request and Permission',
    darkIcon: '/app-request-svg-black.svg',
    whiteIcon: '/app-request-svg.svg',
    path: '/employee/app-permission-request',
  },
  {
    name: 'Leave Management',
    darkIcon: '/leave-management.svg',
    whiteIcon: '/leave-management-white.svg',
    path: '/employee/leave',
  },

  {
    name: 'Profile',
    darkIcon: '/user-dark.svg',
    whiteIcon: '/user-light.svg',
    path: '/employee/profile',
  },

  {
    name: 'Payroll',
    darkIcon: '/payroll-svg-black.svg',
    whiteIcon: '/payroll-svg.svg',
    path: '/employee/payroll',
  },
  {
    name: 'Device Management',
    darkIcon: '/device-management-black.svg',
    whiteIcon: '/device-management.svg',
    path: '/employee/device-management',
  },
  {
    name: 'Performance Management',
    darkIcon: '/performance-management.svg',
    whiteIcon: '/performance-management-white.svg',
    path: '/employee/performance-management',
  },
  {
    name: 'Learning Development',
    darkIcon: '/learning-course-black.svg',
    whiteIcon: '/learning-course.svg',
    path: '/employee/learning-courses',
  },
  {
    name: 'Attendance And Time Tracking',
    darkIcon: '/attendance-black.svg',
    whiteIcon: '/attendance.svg',
    path: '/employee/attendance',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
  },
];

export const itadminSidebarData: Idashboard[] = [
  {
<<<<<<< HEAD
    name: "Dashboard",
    darkIcon: "/black-itadmin-dashboard-icon.svg",
    whiteIcon: "/white-itadmin-dashboard-icon.svg",
    path: "/itadmin-dashboard",
  },
  {
    name: "IT Admin",
    darkIcon: "/black-user-group.svg",
    whiteIcon: "/white-user-group.svg",
    path: "/itadmin-dashboard/it-admin",
=======
    name: 'Dashboard',
    darkIcon: '/black-itadmin-dashboard-icon.svg',
    whiteIcon: '/white-itadmin-dashboard-icon.svg',
    path: '/itadmin-dashboard',
  },
  {
    name: 'IT Admin',
    darkIcon: '/black-user-group.svg',
    whiteIcon: '/white-user-group.svg',
    path: '/itadmin-dashboard/it-admin',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
  },
];
