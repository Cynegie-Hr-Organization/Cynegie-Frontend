export interface offerDataProps {
  id: string;
  candidateName: string;
  jobTitle: string;
  department: string;
  offerDate: string;
  expirationDate: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}



export const offerData: offerDataProps[] = [
  {
    id: '1',
    candidateName: 'Alice Johnson',
    jobTitle: 'Software Engineer',
    department: 'Screening',
    offerDate: '2024-11-01T10:00:00Z',
    expirationDate: '2024-11-01T10:00:00Z',
    status: 'Pending',
  },
  {
    id: '2',
    candidateName: 'John Doe',
    jobTitle: 'Frontend Developer',
    department: 'Development',
    offerDate: '2024-11-02T12:30:00Z',
    expirationDate: '2024-11-05T12:30:00Z',
    status: 'Pending',
  },
  {
    id: '3',
    candidateName: 'Jane Smith',
    jobTitle: 'UI/UX Designer',
    department: 'Design',
    offerDate: '2024-11-03T14:00:00Z',
    expirationDate: '2024-11-06T14:00:00Z',
    status: 'Accepted',
  },
  {
    id: '4',
    candidateName: 'Robert Brown',
    jobTitle: 'Backend Engineer',
    department: 'Development',
    offerDate: '2024-11-04T10:15:00Z',
    expirationDate: '2024-11-08T10:15:00Z',
    status: 'Rejected',
  },
  {
    id: '5',
    candidateName: 'Emily Davis',
    jobTitle: 'Data Analyst',
    department: 'Analytics',
    offerDate: '2024-11-05T11:45:00Z',
    expirationDate: '2024-11-09T11:45:00Z',
    status: 'Accepted',
  },
  {
    id: '6',
    candidateName: 'Michael Wilson',
    jobTitle: 'DevOps Engineer',
    department: 'Operations',
    offerDate: '2024-11-06T16:30:00Z',
    expirationDate: '2024-11-10T16:30:00Z',
    status: 'Pending',
  },
  {
    id: '7',
    candidateName: 'Sarah Martinez',
    jobTitle: 'Product Manager',
    department: 'Product',
    offerDate: '2024-11-07T09:00:00Z',
    expirationDate: '2024-11-11T09:00:00Z',
    status: 'Rejected',
  },
  {
    id: '8',
    candidateName: 'David Taylor',
    jobTitle: 'QA Engineer',
    department: 'Quality Assurance',
    offerDate: '2024-11-08T13:00:00Z',
    expirationDate: '2024-11-12T13:00:00Z',
    status: 'Pending',
  },
  {
    id: '9',
    candidateName: 'Laura Anderson',
    jobTitle: 'HR Specialist',
    department: 'Human Resources',
    offerDate: '2024-11-09T15:00:00Z',
    expirationDate: '2024-11-13T15:00:00Z',
    status: 'Accepted',
  },
  {
    id: '10',
    candidateName: 'James Moore',
    jobTitle: 'Cybersecurity Specialist',
    department: 'Security',
    offerDate: '2024-11-10T17:00:00Z',
    expirationDate: '2024-11-14T17:00:00Z',
    status: 'Rejected',
  },
  {
    id: '11',
    candidateName: 'Olivia White',
    jobTitle: 'Marketing Specialist',
    department: 'Marketing',
    offerDate: '2024-11-11T11:00:00Z',
    expirationDate: '2024-11-15T11:00:00Z',
    status: 'Pending',
  },
  
];



