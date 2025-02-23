"use client";
import useCheckboxes from "@/hooks/useCheckboxes";
import { currencyFormatter } from "@/utils";
import { FilterList } from "@mui/icons-material";
import {
  Checkbox,
  Table as MuiTable,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { debounce, isArray } from "lodash";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import SearchField from "../../employee/input-fields/search";
import Button from "../button-group/button";
import Popover from "../custom-popover";
import { PopoverType } from "../custom-popover/types";
import MoreOptionsButton from "../more-options-button";
import { ButtonType } from "../page/heading/types";
import TableLessonCell from "./cell/variants/lesson";
import TableLinkCell from "./cell/variants/link";
import TablePermissionsCell from "./cell/variants/permissions";
import TableProgressCell from "./cell/variants/progress";
import TableStatusCell from "./cell/variants/status";
import TableAttendanceStatusCell from "./cell/variants/status/attendance";
import TablePagination from "./pagination";
import { FieldType, TableAction, TableProps } from "./types";

const Table: React.FC<TableProps> = ({
  title,
  fieldTypes,
  fieldToGetSlug: fieldToGetSlug,
  hasSearchFilter = true,
  hasPagination = true,
  hasCheckboxes,
  statusMap,
  filters,
  fieldToGetAction,
  fieldToReturnOnActionItemClick,
  headerRowData,
  hasActionsColumn,
  displayedFields,
  fieldActionMap: statusActionMap,
  bodyRowData,
  paginationMeta,
  actions: actionsFromProps,
  getCheckedRows,
  clearChecks,
  formFilter,
  onPermissionsClick,
  skeletonSizes,
  onResetClick,
  onFilterClick,
  onSearch,
  defaultCheckedRows,
}) => {
  const pathname = usePathname();
  const headerRow = hasActionsColumn
    ? [...headerRowData, "Actions"]
    : headerRowData;

  const loading = bodyRowData ? false : true;

  //Get typeof first row
  type typeOfFirstRow =
    typeof bodyRowData extends Array<infer U> ? U : undefined;

  const [actions, setActions] = useState<TableAction[] | undefined>(undefined);

  const { checkAllBoxProps, removeChecks, checkBoxProps } = useCheckboxes(
    bodyRowData ?? [],
    getCheckedRows,
    defaultCheckedRows,
  );

  const getTableCell = (
    fieldType: FieldType,
    row: typeOfFirstRow,
    field: string,
    fieldToGetSlug?: string,
  ) => {
    if (row) {
      const rowVal = row[field ?? ""];

      switch (fieldType) {
        case FieldType.text:
          return rowVal;

        case FieldType.progress:
          if (typeof rowVal === "number")
            return <TableProgressCell value={rowVal} />;

        case FieldType.nextLesson:
          if (typeof rowVal === "number")
            return <TableLessonCell value={rowVal} />;

        case FieldType.link:
          return (
            <TableLinkCell
              value={rowVal}
              path={`${pathname}/${row?.[fieldToGetSlug ?? ""]}`}
            />
          );

        case FieldType.attendanceStatus:
          if (typeof rowVal === "string")
            return <TableAttendanceStatusCell value={rowVal} />;

        case FieldType.status:
          if (typeof rowVal === "string")
            return (
              <TableStatusCell value={rowVal} statusMap={statusMap ?? {}} />
            );

        case FieldType.permissions:
          if (isArray(rowVal))
            return (
              <TablePermissionsCell
                permissions={rowVal}
                onClick={(permissions) =>
                  onPermissionsClick?.(
                    permissions,
                    row[fieldToReturnOnActionItemClick ?? ""],
                  )
                }
              />
            );

        case FieldType.naira:
          if (typeof rowVal === "number")
            return currencyFormatter.format(rowVal);
      }
    }
  };

  const cellSkeleton = (size: "small" | "medium" | "large") => {
    const sizeMap = {
      small: 20,
      medium: 60,
      large: 100,
    };
    return <Skeleton variant="text" width={sizeMap[size]} height={20} />;
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        onSearch?.(query);
      }, 500),
    [onSearch],
  );

  const _clearChecks = clearChecks;
  useEffect(() => {
    if (_clearChecks) removeChecks();
  }, [_clearChecks, removeChecks]);

  return (
    <div className={`flex flex-col ${title && "gap-4"}`}>
      {title && <div className="card-title-small">{title}</div>}
      <div
        className={`common-card gap-6 !px-0 flex flex-col ${
          !hasSearchFilter && "!pt-0"
        }`}
      >
        {hasSearchFilter && (
          <div className="flex flex-col items-start md:flex-row md:items-center px-6">
            <div className="w-full flex-grow">
              <div className="w-[90%] sm:w-[70%] md:w-[70%] mb-[15] md:mb-0">
                <SearchField getSearchQuery={debouncedSearch} />
              </div>
            </div>
            {(filters || formFilter) && (
              <div className="hover:cursor-pointer relative z-10">
                <Popover
                  type={PopoverType.filter}
                  triggerButton={
                    <Button
                      type={ButtonType.filter}
                      icon={<FilterList />}
                      text="Filter"
                    />
                  }
                  filters={filters}
                  formFilter={formFilter}
                  onResetClick={onResetClick}
                  onFilterClick={onFilterClick}
                />
              </div>
            )}
          </div>
        )}
        <TableContainer>
          <MuiTable>
            <TableHead className="bg-[#F7F9FC]">
              <TableRow>
                {hasCheckboxes && (
                  <TableCell className="whitespace-nowrap" sx={{ py: 1 }}>
                    <Checkbox
                      {...checkAllBoxProps}
                      {...((loading ||
                        (bodyRowData && bodyRowData.length < 1)) && {
                        disabled: true,
                        checked: false,
                      })}
                    />
                  </TableCell>
                )}
                {headerRow.map((field, index) => (
                  <TableCell
                    key={index}
                    className="whitespace-nowrap py-4"
                    sx={{ ...(!hasCheckboxes && { pl: 3 }) }}
                  >
                    {field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(
                bodyRowData ??
                Array(5)
                  .fill(undefined)
                  .map((row, index) => ({ index: index, ...row }))
              ).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {hasCheckboxes && (
                    <TableCell className="whitespace-nowrap">
                      <Checkbox
                        {...checkBoxProps(row)}
                        {...(loading && { disabled: true })}
                      />
                    </TableCell>
                  )}
                  {displayedFields.map((field, columnIndex) => (
                    <TableCell
                      className="whitespace-nowrap !py-6"
                      sx={{ ...(!hasCheckboxes && { pl: 3 }) }}
                      key={columnIndex}
                    >
                      {loading
                        ? cellSkeleton(skeletonSizes?.[columnIndex] ?? "medium")
                        : getTableCell(
                            fieldTypes[columnIndex],
                            row,
                            field,
                            fieldToGetSlug,
                          )}
                    </TableCell>
                  ))}
                  {hasActionsColumn && (
                    <TableCell className="whitespace-nowrap">
                      {loading ? (
                        cellSkeleton("medium")
                      ) : (
                        <Popover
                          type={PopoverType.moreOptions}
                          triggerButton={<MoreOptionsButton />}
                          getTriggerButtonClick={() =>
                            setActions(
                              statusActionMap?.[row[fieldToGetAction ?? ""]],
                            )
                          }
                          moreOptions={
                            statusActionMap ? actions : (actionsFromProps ?? [])
                          }
                          dataToReturnOnItemClick={
                            row[fieldToReturnOnActionItemClick ?? ""]
                          }
                        />
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        {hasPagination && (
          <div className="mx-3">
            <TablePagination {...paginationMeta} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
