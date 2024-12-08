import { PageHeadingProps } from '@/app/_components/shared/page/heading/types';

export type PageProps = PageContainerProps & PageHeadingProps;

export type PageContainerProps = {
  children?: React.ReactNode;
};
