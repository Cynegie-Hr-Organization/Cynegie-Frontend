import { ButtonProps } from '../../page/heading/types';

export type ButtonGroupProps = {
  leftButton: ButtonProps;
  rightButton: ButtonProps;
  position: ButtonGroupPosition;
};

export type ButtonGroupPosition = 'start' | 'center' | 'end';
