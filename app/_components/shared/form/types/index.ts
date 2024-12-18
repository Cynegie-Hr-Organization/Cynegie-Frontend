import { GridLayout } from '@/utils/grid-layout';
import { ButtonGroupProps } from '../../button-group/types';
import { InputFieldProps } from '@/app/_components/employee/modal/types';

export type FormProps = {
  title?: string;
  inputFields?: InputFieldProps[];
  isCard?: boolean;
  gridSpacing?: number;
  layout?: GridLayout;
  buttonGroup?: ButtonGroupProps;
};
