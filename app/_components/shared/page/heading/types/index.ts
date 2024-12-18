import React from 'react';
import { TableAction } from '../../../table/types';

export type PageHeadingProps = {
  type?: HeadingType;
  smallHeading?: boolean;
  title?: string;
  backText?: string;
  subtitle?: string;
  hasButtons?: boolean;
  leftButton?: ButtonProps;
  rightButton?: ButtonProps;
  onBackTextClick?: () => void;
  onCloseClick?: (arg: boolean) => void;
  smActions?: TableAction[];
  rightButtonSm?: boolean;
  rightButtonIconSm?: string;
  rightButtonIconOnlySm?: boolean;
};

export type ButtonProps = {
  type?: ButtonType;
  text?: string;
  icon?: React.ReactElement;
  onClick?: (e: React.SyntheticEvent) => void;
  popoverOptions?: PopoverOption[];
  fullWidth?: boolean;
  small?: boolean;
  iconOnly?: boolean;
};

export type PopoverOption = {
  name: string;
  onClick: (e: React.SyntheticEvent) => void;
  onDataReturned?: (arg: string | number) => void;
};

export type ContainedButtonProps = {
  text?: string;
  onClick?: () => void;
};

export enum ButtonType {
  outlined,
  contained,
  filter,
  outlinedBlue,
  deleteContained,
  deleteWithIcon,
  disabled,
  black,
  download,
  actions,
}

export type HeadingType = 'page' | 'modal' | 'card';

export type HeadingBackProps = {
  text: string;
  onClick?: () => void;
};
