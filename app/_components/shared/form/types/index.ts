import { GridLayout } from '@/utils/grid-layout';
import { ButtonGroupProps } from '../../button-group/types';
import { InputField } from '@/app/_components/employee/modal/types';

export type FormProps = {
  inputFields?: InputField[];
  isCard?: boolean;
  gridSpacing?: number;
  layout?: GridLayout;
  buttonGroup?: ButtonGroupProps;
};
