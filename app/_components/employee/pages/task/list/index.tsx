import React from 'react';
import StatusPill from '@/app/_components/shared/pills/status';
import { icon, PDStatusMap } from '@/constants';
import AvatarGroup from '@/app/_components/shared/avatar-group';
import SvgIcon from '@/app/_components/icons/container';
import { getColorVariant } from '@/utils';
import MoreOptionsButton from '@/app/_components/shared/more-options-button';
import IconWithData from '@/app/_components/shared/icon-with-data';
import { KanbanBoardProps } from '../kanban-board';

const TaskList: React.FC<Omit<KanbanBoardProps, 'onDragEnd'>> = ({
  boardData,
}) => {
  return (
    <div className='flex flex-col gap-8 w-[1000] md:w-full'>
      {boardData.columnOrder.map((columnId) => {
        const column = boardData.columns[columnId];
        const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);
        return (
          <div key={column.id}>
            <h4 className=' mb-3'>{column.title}</h4>
            {tasks.length < 1 && (
              <div className='flex items-center bg-[#F9FAFB] p-6 mb-4 rounded-xl'>
                <div className='card-title-large'>None</div>
              </div>
            )}
            {tasks.map((task) => (
              <div
                key={task.id}
                className='flex items-center justify-between bg-[#F9FAFB] p-6 mb-4 rounded-xl'
              >
                <div className='flex items-center gap-2'>
                  <div
                    style={{
                      ...getColorVariant(PDStatusMap[column.status ?? '']),
                      backgroundColor: '',
                    }}
                  >
                    <SvgIcon path={icon.square} width={14} height={14} />
                  </div>
                  <div className='card-title-small'>{task.name}</div>
                </div>
                <div>
                  <StatusPill
                    text={column.status ?? ''}
                    variant={PDStatusMap[column.status ?? '']}
                  />
                </div>
                <div>Prepare and configure the new hire{"'"}s workstation</div>
                <div>
                  <AvatarGroup avatars={task.userPictures} />
                </div>
                <div className='flex items-center gap-3'>
                  <IconWithData icon={icon.calendarTwo} data='Nov 30' />
                  <IconWithData
                    icon={icon.message}
                    data={task.noOfComments ?? 0}
                  />
                </div>
                <div>
                  <MoreOptionsButton />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
