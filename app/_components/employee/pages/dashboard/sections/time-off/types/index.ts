export type TimeOffProps = {
  total?: number;
  used?: number;
  requests?: TimeOffRequest[];
};

export type TimeOffRequest = {
  dotColor: string;
  date: string;
  type: string;
  status: string;
};
