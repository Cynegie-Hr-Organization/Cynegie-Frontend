export interface jobDetailsData {
  id: string;
  date: string;
  time: string;
  user: string;
  action: string;
  details: string;
}

// data.ts or jobDetailsData.ts
export const jobDetailsData = [
  {
    id: "1",
    date: "2024-11-01T10:00:00Z",
    time: "09:00 AM",
    user: "Precious Henry",
    action: "Job Created",
    details: "Initial job posting created.",
  },
  {
    id: "2",
    date: "2024-11-02T11:00:00Z",
    time: "10:00 AM",
    user: "Alice Johnson",
    action: "Job Updated",
    details: "Updated job description.",
  },
  {
    id: "3",
    date: "2024-11-03T12:00:00Z",
    time: "11:00 AM",
    user: "John Doe",
    action: "Job Closed",
    details: "Job closed after sufficient applications.",
  },
  {
    id: "4",
    date: "2024-11-04T13:00:00Z",
    time: "12:00 PM",
    user: "Sarah Smith",
    action: "Job Created",
    details: "Initial posting for a new role.",
  },
  {
    id: "5",
    date: "2024-11-05T14:00:00Z",
    time: "01:00 PM",
    user: "Mark Lee",
    action: "Job Updated",
    details: "Updated salary expectations.",
  },
  {
    id: "6",
    date: "2024-11-06T15:00:00Z",
    time: "02:00 PM",
    user: "Lily Brown",
    action: "Job Created",
    details: "New job posting added.",
  },
  {
    id: "7",
    date: "2024-11-07T16:00:00Z",
    time: "03:00 PM",
    user: "James Green",
    action: "Job Updated",
    details: "Updated job responsibilities.",
  },
  {
    id: "8",
    date: "2024-11-08T17:00:00Z",
    time: "04:00 PM",
    user: "Nancy White",
    action: "Job Closed",
    details: "Job position filled successfully.",
  },
  {
    id: "9",
    date: "2024-11-09T18:00:00Z",
    time: "05:00 PM",
    user: "Tom Black",
    action: "Job Created",
    details: "Job posting live now.",
  },
  {
    id: "10",
    date: "2024-11-10T19:00:00Z",
    time: "06:00 PM",
    user: "Ella Blue",
    action: "Job Updated",
    details: "Updated job requirements.",
  },
];
