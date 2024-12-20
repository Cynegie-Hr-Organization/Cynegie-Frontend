import React from 'react';
import { FormProps } from '../../form/types';
import { PopoverOption } from '../../page/heading/types';
import { Filter, TableAction } from '../../table/types';

export type PopoverProps = {
  type: PopoverType;
  triggerButton: React.ReactNode;
  getTriggerButtonClick?: () => void;
  moreOptions?: PopoverOption[] | TableAction[];
  filters?: Filter[];
  formFilter?: FormProps;
  dataToReturnOnItemClick?: string | number;
  addItemsSelectContent?: React.ReactElement;
  onCloseAction?: () => void;
};

export enum PopoverType {
  moreOptions = 'more-options',
  filter = 'filter',
  addItems = 'add-items',
}

export type MoreOptionsPopoverContentProps = {
  options?: PopoverOption[] | TableAction[];
  itemClick: () => void;
  dataToReturnOnItemClick?: string | number;
};

export type FilterPopoverContentProps = {
  filters?: Filter[];
  formFilters?: FormProps;
};
