import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { BoardData } from '../types';

const useKanbanBoard = () => {
  const isMoveUnacceptable = (start: string, finish: string) => {
    if (start === 'Pending Task' && finish === 'Training Course') return true;
    if (start === 'Pending Task' && finish === 'Completed Course') return true;
    if (start === 'Completed Task' && finish === 'Training Course') return true;
    if (start === 'Completed Task' && finish === 'Completed Course')
      return true;
    if (start === 'Training Course' && finish === 'Pending Task') return true;
    if (start === 'Training Course' && finish === 'Completed Task') return true;
    if (start === 'Completed Course' && finish === 'Pending Task') return true;
    if (start === 'Completed Course' && finish === 'Completed Task')
      return true;
  };
  const initialData: BoardData = {
    tasks: {
      'task-1': {
        id: 'task-1',
        name: 'App Usability Testing with Maze',
        status: 'Pending',
        app: 'Slack',
        userPictures: [
          '/image/persons/person-1.png',
          '/image/persons/person-1.png',
          '/image/persons/person-3.png',
        ],
        dueDate: 'January 21st, 2024',
        noOfComments: 2,
      },
      'task-2': {
        id: 'task-2',
        name: 'App Usability Testing with Maze',
        status: 'Pending',
        app: 'Slack',
        userPictures: [
          '/image/persons/person-1.png',
          '/image/persons/person-1.png',
          '/image/persons/person-3.png',
        ],
        dueDate: 'January 21st, 2024',
        noOfComments: 2,
      },
      'task-3': {
        id: 'task-3',
        name: 'App Usability Testing with Maze',
        status: 'Pending',
        app: 'Slack',
        userPictures: [
          '/image/persons/person-1.png',
          '/image/persons/person-1.png',
          '/image/persons/person-3.png',
        ],
        dueDate: 'January 21st, 2024',
        noOfComments: 2,
      },
      'task-4': {
        id: 'task-4',
        name: 'App Usability Testing with Maze',
        status: 'Pending',
        app: 'Slack',
        userPictures: [
          '/image/persons/person-1.png',
          '/image/persons/person-1.png',
          '/image/persons/person-3.png',
        ],
        dueDate: 'January 21st, 2024',
        noOfComments: 2,
      },
      'task-5': {
        id: 'task-5',
        name: 'App Usability Testing with Maze',
        status: 'Done',
        app: 'Slack',
        userPictures: [
          '/image/persons/person-1.png',
          '/image/persons/person-1.png',
          '/image/persons/person-3.png',
        ],
        dueDate: 'January 21st, 2024',
        noOfComments: 2,
      },
    },
    columns: {
      'pending-task': {
        id: 'pending-task',
        title: 'Pending Task',
        status: 'Pending',
        taskIds: ['task-1', 'task-2'],
      },
      'completed-task': {
        id: 'completed-task',
        title: 'Completed Task',
        status: 'Done',
        taskIds: ['task-3'],
      },
      'training-course': {
        id: 'training-course',
        title: 'Training Course',
        status: 'Pending',
        taskIds: ['task-4'],
      },
      'completed-course': {
        id: 'completed-course',
        title: 'Completed Course',
        status: 'Done',
        taskIds: ['task-5'],
      },
    },
    columnOrder: [
      'pending-task',
      'completed-task',
      'training-course',
      'completed-course',
    ],
  };

  const [boardData, setBoardData] = useState<BoardData>(initialData);

  // Handle drag-and-drop logic
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a valid destination
    if (!destination) return;

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = boardData.columns[source.droppableId];
    const finish = boardData.columns[destination.droppableId];

    // If moving within the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setBoardData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
      return;
    }

    // If moving to unallowed column
    if (isMoveUnacceptable(start.title, finish.title)) {
      return;
    }

    // If moving to a different allowed column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setBoardData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
  };

  return { boardData, setBoardData, onDragEnd };
};

export default useKanbanBoard;
