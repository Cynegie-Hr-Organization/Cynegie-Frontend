'use client';

import Page from '@/app/_components/shared/page';
import KanbanBoard from './kanban-board';
import SearchField from '../../input-fields/search';
import SvgIcon from '@/app/_components/icons/container';
import { useState } from 'react';
import { icon } from '@/constants';
import TaskList from './list';
import useKanbanBoard from './kanban-board/hooks/useKanbanBoard';

export type TaskLayout = 'kanban' | 'list';

const EmployeeTask = () => {
  const [taskLayout, setTaskLayout] = useState<TaskLayout>('kanban');
  const isVerticalLayout = taskLayout === 'kanban';
  const getActiveLayoutStyle = (index: number) => {
    const activeStyle = 'bg-[blue] fill-white p-2 rounded-full';
    if (index === 0 && isVerticalLayout) {
      return activeStyle;
    }
    if (index === 1 && !isVerticalLayout) {
      return activeStyle;
    }
    return 'fill=[#657081]';
  };

  const { boardData, onDragEnd } = useKanbanBoard();

  return (
    <Page text='Review your tasks'>
      <div className='common-card'>
        <div className='flex flex-col gap-4 sm:flex-row sm:gap-0'>
          <h4 className='flex-grow'>Task</h4>
          <div className='flex items-center gap-2'>
            <div className='w-full sm:w-[400]'>
              <SearchField />
            </div>
            <div className='flex items-center gap-1 bg-[#F8F8F8] px-1 rounded-2xl'>
              {[icon.grid, icon.stack].map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer ${getActiveLayoutStyle(index)}`}
                  onClick={() =>
                    index === 0
                      ? setTaskLayout('kanban')
                      : setTaskLayout('list')
                  }
                >
                  <SvgIcon path={image} width={14} height={14} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* {taskLayout === 'kanban' && ( */}
        <div
          className={`flex flex-col md:flex-row gap-8 overflow-x-scroll ${
            taskLayout !== 'kanban' && 'hidden'
          }`}
        >
          <KanbanBoard boardData={boardData} onDragEnd={onDragEnd} />
        </div>
        {/* )} */}
        {taskLayout === 'list' && (
          <div className='mt-8 sm:overflow-x-auto overflow-x-scroll'>
            <TaskList boardData={boardData} />
          </div>
        )}
      </div>
    </Page>
  );
};

export default EmployeeTask;
