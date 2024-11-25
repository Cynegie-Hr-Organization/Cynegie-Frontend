export interface hiringTabOneData {
  id: string;
  jobTitle: string;
  department: string;
  dateCreated: string;
  status: 'Open' | 'Closed';
}

export interface jobDetailsData {
  id: string;
  date: string;
  time: string;
  user: string;
  action: string;
  details: string;
}

export const hiringTabOneData: hiringTabOneData[] = [
  {
    id: '1',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    dateCreated: '2024-11-01T10:00:00Z',
    status: 'Open',
  },
  {
    id: '2',
    jobTitle: 'Product Manager',
    department: 'Product',
    dateCreated: '2024-10-25T09:30:00Z',
    status: 'Closed',
  },
  {
    id: '3',
    jobTitle: 'Marketing Specialist',
    department: 'Marketing',
    dateCreated: '2024-11-10T14:15:00Z',
    status: 'Open',
  },
  {
    id: '4',
    jobTitle: 'Data Analyst',
    department: 'Data',
    dateCreated: '2024-10-20T08:00:00Z',
    status: 'Closed',
  },
  {
    id: '5',
    jobTitle: 'UX Designer',
    department: 'Design',
    dateCreated: '2024-11-05T13:45:00Z',
    status: 'Open',
  },
  {
    id: '6',
    jobTitle: 'HR Specialist',
    department: 'Human Resources',
    dateCreated: '2024-10-15T12:00:00Z',
    status: 'Closed',
  },
  {
    id: '7',
    jobTitle: 'DevOps Engineer',
    department: 'Engineering',
    dateCreated: '2024-11-12T11:00:00Z',
    status: 'Open',
  },
  {
    id: '8',
    jobTitle: 'Account Manager',
    department: 'Sales',
    dateCreated: '2024-10-30T16:20:00Z',
    status: 'Closed',
  },
  {
    id: '9',
    jobTitle: 'QA Engineer',
    department: 'Quality Assurance',
    dateCreated: '2024-11-08T09:00:00Z',
    status: 'Open',
  },
  {
    id: '10',
    jobTitle: 'IT Support',
    department: 'IT',
    dateCreated: '2024-11-03T18:30:00Z',
    status: 'Open',
  },
];


// data.ts or jobDetailsData.ts
export const jobDetailsData = [
  {
    id: '1',
    date: '2024-11-01T10:00:00Z',
    time: '09:00 AM',
    user: 'Precious Henry',
    action: 'Job Created',
    details: 'Initial job posting created.',
  },
  {
    id: '2',
    date: '2024-11-02T11:00:00Z',
    time: '10:00 AM',
    user: 'Alice Johnson',
    action: 'Job Updated',
    details: 'Updated job description.',
  },
  {
    id: '3',
    date: '2024-11-03T12:00:00Z',
    time: '11:00 AM',
    user: 'John Doe',
    action: 'Job Closed',
    details: 'Job closed after sufficient applications.',
  },
  {
    id: '4',
    date: '2024-11-04T13:00:00Z',
    time: '12:00 PM',
    user: 'Sarah Smith',
    action: 'Job Created',
    details: 'Initial posting for a new role.',
  },
  {
    id: '5',
    date: '2024-11-05T14:00:00Z',
    time: '01:00 PM',
    user: 'Mark Lee',
    action: 'Job Updated',
    details: 'Updated salary expectations.',
  },
  {
    id: '6',
    date: '2024-11-06T15:00:00Z',
    time: '02:00 PM',
    user: 'Lily Brown',
    action: 'Job Created',
    details: 'New job posting added.',
  },
  {
    id: '7',
    date: '2024-11-07T16:00:00Z',
    time: '03:00 PM',
    user: 'James Green',
    action: 'Job Updated',
    details: 'Updated job responsibilities.',
  },
  {
    id: '8',
    date: '2024-11-08T17:00:00Z',
    time: '04:00 PM',
    user: 'Nancy White',
    action: 'Job Closed',
    details: 'Job position filled successfully.',
  },
  {
    id: '9',
    date: '2024-11-09T18:00:00Z',
    time: '05:00 PM',
    user: 'Tom Black',
    action: 'Job Created',
    details: 'Job posting live now.',
  },
  {
    id: '10',
    date: '2024-11-10T19:00:00Z',
    time: '06:00 PM',
    user: 'Ella Blue',
    action: 'Job Updated',
    details: 'Updated job requirements.',
  },
];


export interface hiringTabTwoData {
  id: string;
  candidateName: string;
  interviewer: string;
  appliedPosition: string;
  interviewDate: string;
  interviewTime: string;
  status: 'Scheduled' | 'Completed';
}

export const hiringTabTwoData: hiringTabTwoData[] = [
  {
    id: '1',
    candidateName: 'Alice Johnson',
    interviewer: 'Bob Smith',
    appliedPosition: 'UX/UI Designer',
    interviewDate: '2024-11-08T09:00:00Z',
    interviewTime: '09:00 AM',
    status: 'Scheduled',
  },
  {
    id: '2',
    candidateName: 'John Doe',
    interviewer: 'Jane Roe',
    appliedPosition: 'Frontend Developer',
    interviewDate: '2024-11-08T10:00:00Z',
    interviewTime: '10:00 AM',
    status: 'Completed',
  },
  {
    id: '3',
    candidateName: 'Mary Smith',
    interviewer: 'James Brown',
    appliedPosition: 'Backend Engineer',
    interviewDate: '2024-11-08T11:00:00Z',
    interviewTime: '11:00 AM',
    status: 'Scheduled',
  },
  {
    id: '4',
    candidateName: 'Robert Williams',
    interviewer: 'Emily Davis',
    appliedPosition: 'Data Scientist',
    interviewDate: '2024-11-08T01:00:00Z',
    interviewTime: '01:00 PM',
    status: 'Completed',
  },
  {
    id: '5',
    candidateName: 'Patricia Brown',
    interviewer: 'Michael Miller',
    appliedPosition: 'Machine Learning Engineer',
    interviewDate: '2024-11-08T02:00:00Z',
    interviewTime: '02:00 PM',
    status: 'Scheduled',
  },
  {
    id: '6',
    candidateName: 'David Wilson',
    interviewer: 'Elizabeth Moore',
    appliedPosition: 'DevOps Engineer',
    interviewDate: '2024-11-08T03:00:00Z',
    interviewTime: '03:00 PM',
    status: 'Completed',
  },
  {
    id: '7',
    candidateName: 'Jennifer Taylor',
    interviewer: 'Christopher Harris',
    appliedPosition: 'Product Manager',
    interviewDate: '2024-11-08T04:00:00Z',
    interviewTime: '04:00 PM',
    status: 'Scheduled',
  },
  {
    id: '8',
    candidateName: 'Charles Anderson',
    interviewer: 'Linda Thompson',
    appliedPosition: 'QA Engineer',
    interviewDate: '2024-11-08T05:00:00Z',
    interviewTime: '05:00 PM',
    status: 'Completed',
  },
  {
    id: '9',
    candidateName: 'Susan Martinez',
    interviewer: 'Matthew Garcia',
    appliedPosition: 'Mobile Developer',
    interviewDate: '2024-11-08T06:00:00Z',
    interviewTime: '06:00 PM',
    status: 'Scheduled',
  },
  {
    id: '10',
    candidateName: 'Steven Clark',
    interviewer: 'Jessica Lewis',
    appliedPosition: 'Cloud Architect',
    interviewDate: '2024-11-08T07:00:00Z',
    interviewTime: '07:00 PM',
    status: 'Completed',
  },
];
