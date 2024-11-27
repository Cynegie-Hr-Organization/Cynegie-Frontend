export interface JobsTabData {
  id: string;
  jobTitle: string;
  department: string;
  dateCreated: string;
  status: 'Open' | 'Closed';
}



export const jobsTabData: JobsTabData[] = [
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

