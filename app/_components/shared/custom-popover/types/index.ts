import { Filter, TableAction } from "../../table/types";

export type PopoverProps = {
  type: PopoverType;
  triggerButton: React.ReactNode;
  getTriggerButtonClick?: () => void;
  moreOptions?: TableAction[];
  filters?: Filter[];
  dataToReturnOnItemClick?: string | number;
};

export enum PopoverType {
  moreOptions = "more-options",
  filter = "filter",
}

export type MoreOptionsPopoverContentProps = {
  options?: TableAction[];
  itemClick: () => void;
  dataToReturnOnItemClick?: string | number;
};

export type FilterPopoverContentProps = {
  filters?: Filter[];
};
