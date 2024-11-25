'use client'
import { MenuItem, Select, Avatar, Stack, TextField } from "@mui/material";
import OverViewSection from "./overview-section";
import { ReactNode, Suspense, useState, useCallback, LegacyRef } from "react";
import { RiSearchLine } from "react-icons/ri";
import { GoDotFill, GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuClock, LuListFilter } from "react-icons/lu";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Task = { id: number; text: string };
type TaskState = {
  todo: Task[];
  inProgress: Task[];
  inReview: Task[];
  completed: Task[];
};

const OnBoardingPage = () => {
  const [tasks, setTasks] = useState<TaskState>({
    todo: [
      { id: 1, text: "Write a cool JS library" },
      { id: 2, text: "Make it generic enough" },
    ],
    inProgress: [
      { id: 3, text: "Write README" },
      { id: 4, text: "Create some examples" },
    ],
    inReview: [
      { id: 5, text: "Spam in Twitter and IRC to promote it" },
    ],
    completed: [],
  });

  const moveCard = useCallback(
    (draggedTaskId: number, targetColumn: keyof TaskState, targetIndex: number) => {
      setTasks((prevTasks) => {
        const sourceColumn = (Object.keys(prevTasks) as Array<keyof TaskState>).find((column) =>
          prevTasks[column].some((task) => task.id === draggedTaskId)
        );

        if (!sourceColumn) return prevTasks;

        const draggedTask = prevTasks[sourceColumn].find(
          (task) => task.id === draggedTaskId
        );
        if (!draggedTask) return prevTasks;

        const sourceColumnTasks = prevTasks[sourceColumn].filter(
          (task) => task.id !== draggedTaskId
        );

        if (sourceColumn === targetColumn) {
          const updatedTasks = [...sourceColumnTasks];
          updatedTasks.splice(targetIndex, 0, draggedTask);
          return {
            ...prevTasks,
            [sourceColumn]: updatedTasks,
          };
        }

        const targetColumnTasks = [...prevTasks[targetColumn], draggedTask];
        return {
          ...prevTasks,
          [sourceColumn]: sourceColumnTasks,
          [targetColumn]: targetColumnTasks,
        };
      });
    },
    []
  );

  return (
    <Suspense fallback="Loading...">
      <Stack gap={3}>
        <OverViewSection />
      </Stack>
      <div className="my-12">
        <div className="flex gap-4 text-sm mb-4 pl-4">
          <button className="p-4 text-primary border-b border-primary">Task List</button>
          <button>New Hire List</button>
        </div>
        <CardLayout className="bg-white">
          <div className="w-full flex items-center justify-between flex-grow mb-4">
            <TextField
              className="max-w-[476px]"
              sx={{
                width: { xs: "90%", sm: "70%", md: "70%" },
                mb: { xs: "15px", md: "0px" },
              }}
              InputProps={{
                sx: {
                  height: "35px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 400,
                },
                startAdornment: <RiSearchLine className="mr-2 text-2xl" />,
              }}
              placeholder="Search here..."
            />
            <Select
              defaultValue="Filter"
              className="flex items-center justify-center gap-x-2"
              sx={{ height: "30px", borderRadius: "4.62px", pr: "15px" }}
            >
              <MenuItem value="Filter">
                <span>Filter</span>
              </MenuItem>
              <LuListFilter />
            </Select>
          </div>

          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-4 gap-8 p-1 mb-6 overflow-y-auto h-[463.33px]">
              {(Object.keys(tasks) as Array<keyof TaskState>).map((column) => (
                <Column
                  key={column}
                  title={column}
                  tasks={tasks[column]}
                  moveCard={moveCard}
                />
              ))}
            </div>
          </DndProvider>
        </CardLayout>
      </div>
    </Suspense>
  );
};

const Column = ({
  title,
  tasks,
  moveCard,
}: {
  title: keyof TaskState;
  tasks: Task[];
  moveCard: (draggedTaskId: number, targetColumn: keyof TaskState, targetIndex: number) => void;
}) => {
  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: number; column: keyof TaskState; index: number }) => {
      if (item.column !== title) {
        moveCard(item.id, title, tasks.length);
      }
    },
  });

  return (
    <div ref={dropRef as unknown as LegacyRef<HTMLDivElement>} className="space-y-4 h-full overflow-y-scroll">
      <Taskhead title={title} count={tasks.length.toString()} />
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            moveCard={moveCard}
            currentColumn={title}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const Taskhead = ({
  title,
  count,
}: {
  title: string;
  count: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="capitalize font-bold text-sm">
        {title}
        <span className="font-normal text-gray-500">({count})</span>
      </h3>
      <div className="flex gap-x-2 text-gray-400">
        <GoPlus />
        <HiOutlineDotsHorizontal />
      </div>
    </div>
  );
};

const TaskItem = ({
  task,
  moveCard,
  currentColumn,
  index,
}: {
  task: Task;
  moveCard: (draggedTaskId: number, targetColumn: keyof TaskState, targetIndex: number) => void;
  currentColumn: keyof TaskState;
  index: number;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, column: currentColumn, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: number; column: keyof TaskState; index: number }) => {
      if (item.column === currentColumn && item.index !== index) {
        moveCard(item.id, currentColumn, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };

  return (
    <div
      ref={ref}
      className="text-xs mt-11 space-y-[14.67px] p-2 rounded-xl"
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? "lightgray" : "transparent",
      }}
    >
      <div className="space-y-2">
        <p className="capitalize text-sm font-semibold">{task.text}</p>
        <p className="flex items-center text-[11px] text-primary font-medium">
          <GoDotFill />
          <span>Design</span>
        </p>
      </div>
      <p className="text-[#64748B]">Its just needs to adapt the UI from what you did before</p>
      <hr className="border-t w-full" />
      <div className="flex items-center justify-between">
        <div className="w-max h-max flex items-center gap-x-2 p-[7.33px] rounded-lg bg-[#FDF2F8] text-[#ED4F9D] font-medium">
          <LuClock />
          <span>3 days left</span>
        </div>
        <div className="flex">
          {[
            "/image/persons/person-1.png",
            "/image/persons/person-2.png",
          ].map((imageSrc, index) => (
            <Avatar key={index} src={imageSrc} sx={{ width: "20px", height: "20px" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardLayout = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <div className={`border border-[#E5E7EB] p-6 rounded-xl?? ${className}`}>{children}</div>;
};

export default OnBoardingPage;
