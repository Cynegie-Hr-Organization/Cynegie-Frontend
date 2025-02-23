import { ColorVariant } from "@/types";
import { FormProps } from "../../form/types";
import { Permission } from "../cell/variants/permissions";

export type TableProps<T = Record<string, any>> = {
  title?: string;
  headerRowData: string[];
  bodyRowData: T[] | undefined;
  displayedFields: string[];
  fieldTypes: FieldType[];
  skeletonSizes?: ("small" | "medium" | "large")[];
  hasCheckboxes?: boolean;
  hasActionsColumn?: boolean;
  getCheckedRows?: (arg: T[]) => void;
  filters?: Filter[];
  formFilter?: FormProps;
  onFilterClick?: () => void;
  onResetClick?: () => void;
  /** actions refer to the items that appear when the more actions button is clicked. When actions and getActionsBasedOnField are specified, the latter takes precedence over the former */
  actions?: TableAction[];
  /** fieldToGetAction is passed to the getActionsBasedOnField function inside the GeneralTable. Both are required to have certain actions appear based on a particular field. */
  fieldToGetAction?: string;
  getActionsBasedOnField?: (arg: string | number) => TableAction[] | undefined;
  paginationMeta?: TablePaginationProps;
  fieldToGetSlug?: string;
  statusMap?: StatusMap;
  fieldActionMap?: StatusActionMap;
  fieldToReturnOnActionItemClick?: string;
  hasSearchFilter?: boolean;
  hasPagination?: boolean;
  clearChecks?: boolean;
  onPermissionsClick?: (
    permissions: Permission[],
    fieldToReturn: string,
  ) => void;
  onSearch?: (arg: string) => void;
  page?: number; //TODO: Remove and use pagination meta instead
  pageCount?: number; //TODO: Remove and use pagination meta instead
  defaultCheckedRows?: T[];
};

export type Filter = {
  name: string;
  items: string[];
};

export type TableAction = {
  name: string;
  onClick: (arg?: React.SyntheticEvent | string | number) => void;
  onDataReturned?: (arg: string | number) => void;
};

export enum FieldType {
  text = "text",
  link = "link",
  progress = "progress",
  status = "status",
  attendanceStatus = "attendance-status",
  nextLesson = "lesson",
  permissions = "permissions",
  naira = "naira",
}

export type TablePaginationProps = {
  itemCount?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
  itemsOnPage?: number;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  loading?: boolean;
  onChangeLimit?: (limit: number) => void;
};

export type StatusMap = { [key: string]: ColorVariant };

export type StatusActionMap = { [key: string]: TableAction[] };
