
export interface IRes<T> {
  status: boolean;
  data: T;
  message: string;
}

export interface IPaginatedRes<T> {
  status: boolean;
  data: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    items: T[];
  };
  message: string;
}
