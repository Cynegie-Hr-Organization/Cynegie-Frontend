import { PageHeadingProps } from '@/app/_components/employee/pages/attendance-and-time-tracking/heading/types';

export type PageProps = PageContainerProps & PageHeadingProps;

export type PageContainerProps = {
  children?: React.ReactNode;
};
