export type ViewTaskProps = {
  name: string;
  appName: string;
  assignedTo: AssignedUser[];
  dateCreated: string;
  label: string;
  dueDate: string;
  description: string;
  userPicture: string;
  comments: Comment[];
};

export type AssignedUser = {
  name: string;
  image: string;
};

type Comment = {
  name: string;
  image: string;
  timePosted: string;
  comment: string;
};
