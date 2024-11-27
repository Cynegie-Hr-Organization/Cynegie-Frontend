


export interface InterviewTabProps {
  id: string;
  candidateName: string;
  interviewer: string;
  appliedPosition: string;
  interviewDate: string;
  interviewTime: string;
  status: 'Scheduled' | 'Completed';
}

export const interviewTabData: InterviewTabProps[] = [
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
