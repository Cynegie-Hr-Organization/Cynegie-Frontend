'use client';
import {
  Checkbox,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldType, TableProps, TableAction } from './types';
import { FilterList } from '@mui/icons-material';
import { PopoverType } from '../custom-popover/types';
import Button from '../button-group/button';
import { ButtonType } from '../page/heading/types';
import TablePagination from './pagination';
import { usePathname } from 'next/navigation';
import Popover from '../custom-popover';
import SearchField from '../../employee/input-fields/search';
import MoreOptionsButton from '../more-options-button';
import TableProgressCell from './cell/variants/progress';
import TableLessonCell from './cell/variants/lesson';
import TableLinkCell from './cell/variants/link';
import TableAttendanceStatusCell from './cell/variants/status/attendance';
import TableStatusCell from './cell/variants/status';
import { isArray } from 'lodash';
import TablePermissionsCell from './cell/variants/permissions';

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
  statusActionMap,
  bodyRowData,
  page,
  pageCount,
  actions: actionsFromProps,
  getCheckedRows,
  clearChecks,
  formFilter,
  onPermissionsClick,
}) => {
  const pathname = usePathname();
  const [actions, setActions] = useState<TableAction[] | undefined>(undefined);
  const [selectedRowsIndexes, setSelectedRowsIndexes] = useState<number[]>([]);

  const headerRow = hasActionsColumn
    ? [...headerRowData, 'Actions']
    : headerRowData;

  const handleCheckboxChangeAll = (event: ChangeEvent<HTMLInputElement>) => {
    let rowsIndexes: number[] = [];
    if (event.target.checked) {
      rowsIndexes = generateRange(0, bodyRowData.length - 1);
      setSelectedRowsIndexes(rowsIndexes);
    } else {
      setSelectedRowsIndexes(rowsIndexes);
    }
    getCheckedRows?.(rowsIndexes.map((index) => bodyRowData[index]));
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    let rowsIndexes: number[] = [];
    setSelectedRowsIndexes((prevSelectedRows) => {
      if (event.target.checked) {
        rowsIndexes = [...prevSelectedRows, rowIndex];
        return rowsIndexes;
      } else {
        rowsIndexes = prevSelectedRows.filter((index) => index !== rowIndex);
        return rowsIndexes;
      }
    });
    getCheckedRows?.(rowsIndexes.map((index) => bodyRowData[index]));
  };

  function generateRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  const getTableCell = (
    fieldType: FieldType,
    row: (typeof bodyRowData)[0],
    field: string,
    fieldToGetSlug?: string
  ) => {
    const rowVal = row[field ?? ''];

    switch (fieldType) {
      case FieldType.text:
        return rowVal;

      case FieldType.progress:
        if (typeof rowVal === 'number')
          return <TableProgressCell value={rowVal} />;

      case FieldType.nextLesson:
        if (typeof rowVal === 'number')
          return <TableLessonCell value={rowVal} />;

      case FieldType.link:
        return (
          <TableLinkCell
            value={rowVal}
            path={`${pathname}/${row?.[fieldToGetSlug ?? '']}`}
          />
        );

      case FieldType.attendanceStatus:
        if (typeof rowVal === 'string')
          return <TableAttendanceStatusCell value={rowVal} />;

      case FieldType.status:
        if (typeof rowVal === 'string')
          return <TableStatusCell value={rowVal} statusMap={statusMap ?? {}} />;

      case FieldType.permissions:
        if (isArray(rowVal))
          return (
            <TablePermissionsCell
              permissions={rowVal}
              onClick={onPermissionsClick}
            />
          );
    }
  };

  useEffect(() => setSelectedRowsIndexes([]), [clearChecks]);

  return (
    <div className={`flex flex-col ${title && 'gap-4'}`}>
      {title && <div className='card-title-small'>{title}</div>}
      <div
        className={`common-card gap-6 !px-0 flex flex-col ${
          !hasSearchFilter && '!pt-0'
        }`}
      >
        {hasSearchFilter && (
          <div className='flex flex-col items-start md:flex-row md:items-center px-6'>
            <div className='w-full flex-grow'>
              <div className='w-[90%] sm:w-[70%] md:w-[70%] mb-[15] md:mb-0'>
                <SearchField />
              </div>
            </div>
            {(filters || formFilter) && (
              <div>
                <Popover
                  type={PopoverType.filter}
                  triggerButton={
                    <Button
                      type={ButtonType.filter}
                      icon={<FilterList />}
                      text='Filter'
                    />
                  }
                  filters={filters}
                  formFilter={formFilter}
                />
              </div>
            )}
          </div>
        )}
        <TableContainer>
          <MuiTable>
            <TableHead className='bg-[#F7F9FC]'>
              <TableRow>
                {hasCheckboxes && (
                  <TableCell className='whitespace-nowrap' sx={{ py: 1 }}>
                    <Checkbox
                      onChange={handleCheckboxChangeAll}
                      checked={
                        selectedRowsIndexes.length === bodyRowData.length
                      }
                      indeterminate={
                        selectedRowsIndexes.length > 0 &&
                        selectedRowsIndexes.length < bodyRowData.length
                      }
                    />
                  </TableCell>
                )}
                {headerRow.map((field, index) => (
                  <TableCell
                    key={index}
                    className='whitespace-nowrap py-4'
                    sx={{ ...(!hasCheckboxes && { pl: 3 }) }}
                  >
                    {field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bodyRowData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {hasCheckboxes && (
                    <TableCell className='whitespace-nowrap'>
                      <Checkbox
                        checked={selectedRowsIndexes.includes(rowIndex)}
                        onChange={(e) => handleCheckboxChange(e, rowIndex)}
                      />
                    </TableCell>
                  )}
                  {displayedFields.map((field, columnIndex) => (
                    <TableCell
                      className='whitespace-nowrap !py-6'
                      sx={{ ...(!hasCheckboxes && { pl: 3 }) }}
                      key={columnIndex}
                    >
                      {getTableCell(
                        fieldTypes[columnIndex],
                        row,
                        field,
                        fieldToGetSlug
                      )}
                    </TableCell>
                  ))}
                  {hasActionsColumn && (
                    <TableCell className='whitespace-nowrap'>
                      <Popover
                        type={PopoverType.moreOptions}
                        triggerButton={<MoreOptionsButton />}
                        getTriggerButtonClick={() =>
                          setActions(
                            statusActionMap?.[row[fieldToGetAction ?? '']]
                          )
                        }
                        moreOptions={
                          statusActionMap ? actions : actionsFromProps ?? []
                        }
                        dataToReturnOnItemClick={
                          row[fieldToReturnOnActionItemClick ?? '']
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        {hasPagination && (
          <div className='mx-3'>
            <TablePagination pageCount={pageCount} page={page} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
