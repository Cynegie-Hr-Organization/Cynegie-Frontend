import { GridLayout } from '@/utils/grid-layout';
import { StatusMap } from '../../table/types';

export type DetailGroupProps = {
  details?: SingleDetail[];
  gridLayout?: GridLayout;
  spaceBetweenLayout?: boolean;
  statusMap?: StatusMap;
};

export type SingleDetail = {
  name: string;
  value: string;
  icon?: string;
  spaceBetweenLayout?: boolean;
  type?: 'status' | 'document';
  statusMap?: StatusMap;
};
