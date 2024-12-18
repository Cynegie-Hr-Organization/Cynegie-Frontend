import { ButtonProps } from '../../page/heading/types';

export type TabFormatProps = {
  type?: 'button';
  tabs?: Tab[];
  actionButton?: ButtonProps;
};

export type Tab = {
  name: string;
  component: React.ReactElement;
};
