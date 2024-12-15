export type Task = {
  id: string;
  name?: string;
  status?: string;
  app?: string;
  dueDate?: string;
  userPictures?: string[];
  noOfComments?: number;
};

export type Column = {
  id: string;
  title: string;
  status: 'Pending' | 'Done';
  taskIds: string[];
};

export type BoardData = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};
