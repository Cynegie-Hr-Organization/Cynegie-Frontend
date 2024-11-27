export interface candidateDataProps {
  id: string;
  candidateName: string;
  appliedPosition: string;
  stages: string;
  applicationDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}



export const candidateData: candidateDataProps[] = [
  {
    id: '1',
    candidateName: 'Alice Johnson',
    appliedPosition: 'Software Engineer',
    stages: 'Screening',
    applicationDate: '2024-11-01T10:00:00Z',
    status: 'Pending',
  },
  {
    id: '2',
    candidateName: 'Bob Smith',
    appliedPosition: 'Frontend Developer',
    stages: 'Technical Interview',
    applicationDate: '2024-10-29T14:30:00Z',
    status: 'Approved',
  },
  {
    id: '3',
    candidateName: 'Catherine Brown',
    appliedPosition: 'Backend Developer',
    stages: 'Initial Interview',
    applicationDate: '2024-11-03T09:15:00Z',
    status: 'Rejected',
  },
  {
    id: '4',
    candidateName: 'Bob Williams',
    appliedPosition: 'Data Scientist',
    stages: 'Final Interview',
    applicationDate: '2024-10-28T15:00:00Z',
    status: 'Pending',
  },
  {
    id: '5',
    candidateName: 'Emily Brown',
    appliedPosition: 'Frontend Developer',
    stages: 'Technical Assessment',
    applicationDate: '2024-11-02T11:00:00Z',
    status: 'Approved',
  },
  {
    id: '6',
    candidateName: 'Michael Davis',
    appliedPosition: 'DevOps Engineer',
    stages: 'HR Interview',
    applicationDate: '2024-10-30T16:00:00Z',
    status: 'Rejected',
  },
  {
    id: '7',
    candidateName: 'Sarah Wilson',
    appliedPosition: 'QA Engineer',
    stages: 'Screening',
    applicationDate: '2024-11-01T12:00:00Z',
    status: 'Pending',
  },
  {
    id: '8',
    candidateName: 'David Clark',
    appliedPosition: 'Backend Developer',
    stages: 'Technical Interview',
    applicationDate: '2024-11-03T13:00:00Z',
    status: 'Approved',
  },
  {
    id: '9',
    candidateName: 'Sophia Martinez',
    appliedPosition: 'Business Analyst',
    stages: 'Final Interview',
    applicationDate: '2024-10-29T10:00:00Z',
    status: 'Rejected',
  },
  {
    id: '10',
    candidateName: 'Daniel Lewis',
    appliedPosition: 'Project Manager',
    stages: 'HR Interview',
    applicationDate: '2024-10-31T09:30:00Z',
    status: 'Pending',
  },
  
];



