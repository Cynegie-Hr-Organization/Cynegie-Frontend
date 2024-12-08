'use client';
import {
  Box,
  Button as MuiButton,
  Checkbox,
  Table as MuiTable,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { FieldType, TableProps, TableAction } from './types';
import StatusPill from '../pills/status';
import { FilterList, MoreVert } from '@mui/icons-material';
import Popover from '../popover';
import { PopoverType } from '../popover/types';
import Button from '../button-group/button';
import { ButtonType } from '../page/heading/types';
import { Input, InputGroup } from 'rsuite';
import Image from 'next/image';
import TablePagination from './pagination';
import { color } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';

const Table: React.FC<TableProps> = (props) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    setSelectedRows((prevSelectedRows) => {
      if (event.target.checked) {
        return [...prevSelectedRows, rowIndex];
      } else {
        return prevSelectedRows.filter((index) => index !== rowIndex);
      }
    });
  };

  const [actions, setActions] = useState<TableAction[] | undefined>([
    {
      name: '',
      onClick: () => {},
    },
  ]);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack {...(props.title && { gap: 2 })}>
      {props.title && <div className='card-title-small'>{props.title}</div>}
      <Stack gap={2} className='common-card' px={0}>
        <Stack
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            px: 3,
          }}
        >
          <Box sx={{ width: '100%' }} flexGrow={1}>
            <Box
              sx={{
                width: { xs: '90%', sm: '70%', md: '70%' },
                mb: { xs: '15px', md: '0px' },
              }}
            >
              <InputGroup>
                <InputGroup.Addon style={{ backgroundColor: 'transparent' }}>
                  <Image
                    src='/icons/search-2.svg'
                    alt=''
                    width={18}
                    height={18}
                    style={{ margin: '-15px 0px -15px 0px' }}
                  />
                </InputGroup.Addon>
                <Input
                  style={{ paddingLeft: '0px', height: '30px' }}
                  placeholder='Search here...'
                />
              </InputGroup>
            </Box>
          </Box>
          {props.filters && (
            <Popover
              type={PopoverType.filter}
              triggerButton={
                <Button
                  type={ButtonType.filter}
                  icon={<FilterList />}
                  text='Filter'
                />
              }
              filters={props.filters}
            ></Popover>
          )}
        </Stack>
        <TableContainer>
          <MuiTable>
            <TableHead
              sx={{
                backgroundColor: '#F7F9FC',
              }}
            >
              <TableRow>
                {props.hasCheckboxes && (
                  <TableCell sx={{ whiteSpace: 'nowrap', py: 1 }}>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([0, 1, 2, 3, 4]);
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                      checked={selectedRows.length === 5}
                      indeterminate={
                        selectedRows.length > 0 && selectedRows.length < 5
                      }
                    />
                  </TableCell>
                )}
                {[
                  ...props.headerRowData,
                  props.hasActionsColumn ? 'Actions' : undefined,
                ].map((field, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      whiteSpace: 'nowrap',
                      py: 2,
                      ...(!props.hasCheckboxes && { pl: 3 }),
                    }}
                  >
                    {field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bodyRowData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {props.hasCheckboxes && (
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Checkbox
                        checked={selectedRows.includes(rowIndex)}
                        onChange={(e) => handleCheckboxChange(e, rowIndex)}
                      />
                    </TableCell>
                  )}
                  {props.displayedFields.map((field, columnIndex) =>
                    props.fieldTypes[columnIndex] == FieldType.status &&
                    typeof row[field] === 'string' ? (
                      <TableCell
                        sx={{ whiteSpace: 'nowrap', py: 3 }}
                        key={columnIndex}
                      >
                        <StatusPill
                          variant={props.statusMap?.[row[field]] || 'grey'}
                          text={row[field]}
                        />
                      </TableCell>
                    ) : props.fieldTypes[columnIndex] == FieldType.progress &&
                      typeof row[field] === 'number' ? (
                      <TableCell
                        sx={{ whiteSpace: 'nowrap' }}
                        key={columnIndex}
                      >
                        <div
                          style={{ position: 'relative', width: 'fit-content' }}
                        >
                          <LinearProgress
                            variant='determinate'
                            value={row[field]}
                            sx={{
                              height: '8px',
                              borderRadius: '12px',
                              width: '411px',
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: 12,
                              right: 0,
                              color: color.progress.filled,
                              fontWeight: 700,
                            }}
                          >{`${row[field]}%`}</div>
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell
                        sx={{
                          whiteSpace: 'nowrap',
                          py: 3,
                          ...(!props.hasCheckboxes && { pl: 3 }),
                          ...(props.fieldTypes[columnIndex] ==
                            FieldType.link && {
                            color: color.info.dark,
                            cursor: 'pointer',
                          }),
                          ...(props.fieldTypes[columnIndex] ===
                            FieldType.attendanceStatus &&
                            props.statusMap?.[row[field]] === 'grey' && {
                              color: '',
                            }),
                          ...(props.fieldTypes[columnIndex] ===
                            FieldType.attendanceStatus &&
                            props.statusMap?.[row[field]] === 'info' && {
                              color: color.info.dark,
                            }),
                          ...(props.fieldTypes[columnIndex] ===
                            FieldType.attendanceStatus &&
                            props.statusMap?.[row[field]] === 'error' && {
                              color: color.error.dark,
                            }),
                        }}
                        key={columnIndex}
                        {...(props.fieldTypes[columnIndex] ==
                          FieldType.link && {
                          onClick: () =>
                            router.push(
                              `${pathname}/${props.fieldAsSlug ?? ''}`
                            ),
                        })}
                      >
                        {props.fieldTypes[columnIndex] ===
                        FieldType.nextLesson ? (
                          <>
                            Lesson{' '}
                            <span style={{ color: color.info.dark }}>
                              {row[field]}
                            </span>
                          </>
                        ) : (
                          row[field]
                        )}
                      </TableCell>
                    )
                  )}
                  {props.hasActionsColumn && (
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Popover
                        type={PopoverType.moreOptions}
                        triggerButton={
                          <MuiButton>
                            <MoreVert
                              sx={{
                                borderWidth: '0.5px',
                                borderRadius: '4px',
                                padding: '2px',
                                fill: '#000',
                              }}
                            />
                          </MuiButton>
                        }
                        getTriggerButtonClick={() =>
                          setActions(
                            props.statusActionMap?.[
                              row[props.fieldToGetAction ?? '']
                            ]
                          )
                        }
                        moreOptions={
                          props.statusActionMap ? actions : props.actions ?? []
                        }
                        dataToReturnOnItemClick={
                          row[props.fieldToReturnOnActionItemClick ?? '']
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <div className='mx-3'>
          <TablePagination pageCount={props.pageCount} page={props.page} />
        </div>
      </Stack>
    </Stack>
  );
};

export default Table;
