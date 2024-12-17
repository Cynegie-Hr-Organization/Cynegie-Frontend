import { ColorVariant } from '@/types';

export type TableProps<T = Record<string, string | number>> = {
  title?: string;
  headerRowData: string[];
  bodyRowData: T[];
  displayedFields: string[];
  fieldTypes: FieldType[];
  hasCheckboxes?: boolean;
  hasActionsColumn?: boolean;
  getCheckedRows?: (arg: T[]) => void;
  filters?: Filter[];
  onFilterClick?: () => void;
  onResetClick?: () => void;
  /** actions refer to the items that appear when the more actions button is clicked. When actions and getActionsBasedOnField are specified, the latter takes precedence over the former */
  actions?: TableAction[];
  /** fieldToGetAction is passed to the getActionsBasedOnField function inside the GeneralTable. Both are required to have certain actions appear based on a particular field. */
  fieldToGetAction?: string;
  getActionsBasedOnField?: (arg: string | number) => TableAction[] | undefined;
  pageCount?: number;
  page?: number;
  fieldToGetSlug?: string;
  statusMap?: StatusMap;
  statusActionMap?: StatusActionMap;
  fieldToReturnOnActionItemClick?: string;
  hasSearchFilter?: boolean;
  hasPagination?: boolean;
};

export type Filter = {
  name: string;
  items: string[];
};

export type TableAction = {
  name: string;
  onClick: (arg?: string | number) => void;
};

export enum FieldType {
  text = 'text',
  link = 'link',
  progress = 'progress',
  status = 'status',
  attendanceStatus = 'attendance-status',
  nextLesson = 'lesson',
}

export type TablePaginationProps = {
  page?: number;
  pageCount?: number;
};

export type StatusMap = { [key: string]: ColorVariant };

export type StatusActionMap = { [key: string]: TableAction[] };
