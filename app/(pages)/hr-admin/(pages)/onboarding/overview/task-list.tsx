"use client";


import { Avatar } from "@mui/material";
import { RiSearchLine } from "react-icons/ri";
import { GoDotFill, GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuClock, LuListFilter } from "react-icons/lu";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { usePreview } from "react-dnd-preview";
import { useState, useCallback, LegacyRef, useEffect } from "react";
import CardLayout from "@/app/_components/shared/cards";
import dynamic from "next/dynamic";

type Task = { id: number; text: string };
type TaskState = {
  todo: Task[];
  inProgress: Task[];
  inReview: Task[];
  completed: Task[];
};

interface DragItem {
  id: number;
  text: string;
  column: keyof TaskState;
  index: number;
}

const TouchPreview = () => {
  const preview = usePreview<DragItem>();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (!preview.display || !isTouchDevice) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 w-[242px] pointer-events-none"
      style={preview.display ? preview.style : undefined}
    >
      <div className="text-xs space-y-[14.67px] p-2 rounded-xl shadow-md bg-white opacity-90 -rotate-6">
        <div className="space-y-2">
          <p className="capitalize text-sm font-semibold">
            {preview.item?.text}
          </p>
          <p className="flex items-center text-[11px] text-primary font-medium">
            <GoDotFill />
            <span>Design</span>
          </p>
        </div>

        <p className="text-[#64748B]">
          Its just needs to adapt the UI from what you did before
        </p>
        <hr className="border-t w-full" />
        <div className="flex items-center justify-between">
          <div className="w-max h-max flex items-center gap-x-2 p-[7.33px] rounded-lg bg-[#FDF2F8] text-[#ED4F9D] font-medium">
            <LuClock />
            <span>3 days left</span>
          </div>
          <div className="flex">
            {["/image/persons/person-1.png", "/image/persons/person-2.png"].map(
              (imageSrc, index) => (
                <Avatar
                  key={index}
                  src={imageSrc}
                  className="w-5 h-5 first:ml-auto -ml-2"
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskState>({
    todo: [
      { id: 1, text: "Write a cool JS library" },
      { id: 2, text: "Make it generic enough" },
    ],
    inProgress: [
      { id: 3, text: "Write README" },
      { id: 4, text: "Create some examples" },
    ],
    inReview: [{ id: 5, text: "Spam in Twitter and IRC to promote it" }],
    completed: [],
  });

  const [dndBackend, setDndBackend] = useState(() => HTML5Backend);

  useEffect(() => {
    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    if (isTouchDevice()) {
      setDndBackend(() => TouchBackend);
    }
  }, []);

  const findSourceColumn = (
    prevTasks: TaskState,
    draggedTaskId: number,
  ): keyof TaskState | undefined => {
    return (Object.keys(prevTasks) as Array<keyof TaskState>).find((column) =>
      prevTasks[column].some((task) => task.id === draggedTaskId),
    );
  };

  const moveCard = useCallback(
    (
      draggedTaskId: number,
      targetColumn: keyof TaskState,
      targetIndex: number,
    ) => {
      setTasks((prevTasks) => {
        const sourceColumn = findSourceColumn(prevTasks, draggedTaskId);
        if (!sourceColumn) return prevTasks;

        const draggedTask = prevTasks[sourceColumn].find(
          (task) => task.id === draggedTaskId,
        );
        if (!draggedTask) return prevTasks;

        const sourceColumnTasks = prevTasks[sourceColumn].filter(
          (task) => task.id !== draggedTaskId,
        );

        if (sourceColumn === targetColumn) {
          const updatedTasks = [...sourceColumnTasks];
          updatedTasks.splice(targetIndex, 0, draggedTask);
          return { ...prevTasks, [sourceColumn]: updatedTasks };
        }

        return {
          ...prevTasks,
          [sourceColumn]: sourceColumnTasks,
          [targetColumn]: [...prevTasks[targetColumn], draggedTask],
        };
      });
    },
    [],
  );

  return (
    <CardLayout className='bg-white space-y-8'>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
        </div>

        <button type="button" className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
          <LuListFilter /> Filter
        </button>
      </div>

      <DndProvider
        backend={dndBackend}
        options={{
          enableMouseEvents: true,
          preview: false,
        }}
      >
        <div className="flex gap-8 p-1 mb-6 h-[463.33px] overflow-x-auto min-w-full">
          {(Object.keys(tasks) as Array<keyof TaskState>).map((column) => (
            <Column
              key={column}
              title={column}
              tasks={tasks[column]}
              moveCard={moveCard}
            />
          ))}
        </div>
        <TouchPreview />
      </DndProvider>
    </CardLayout>
  );
};

const Column = ({
  title,
  tasks,
  moveCard,
}: {
  title: keyof TaskState;
  tasks: Task[];
  moveCard: (
    draggedTaskId: number,
    targetColumn: keyof TaskState,
    targetIndex: number,
  ) => void;
}) => {
  const getTitleColor = (columnTitle: keyof TaskState): string => {
    switch (columnTitle) {
      case "inProgress":
        return "text-blue-500";
      case "inReview":
        return "text-yellow-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-[#0F172A]";
    }
  };

  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: number; column: keyof TaskState; index: number }) => {
      if (item.column !== title) {
        moveCard(item.id, title, tasks.length);
      }
    },
  });

  return (
    <div
      ref={dropRef as unknown as LegacyRef<HTMLDivElement>}
      className="space-y-4 h-full overflow-y-scroll min-w-[242px]"
    >
      <Taskhead
        title={title}
        count={tasks.length.toString()}
        titleColor={getTitleColor(title)}
      />
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
  titleColor = "text-gray-500",
}: {
  title: string;
  count: string;
  titleColor?: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className={`capitalize font-bold text-sm ${titleColor}`}>
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
  moveCard: (
    draggedTaskId: number,
    targetColumn: keyof TaskState,
    targetIndex: number,
  ) => void;
  currentColumn: keyof TaskState;
  index: number;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, column: currentColumn, index, text: task.text },
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
      className={`text-xs mt-11 space-y-[14.67px] p-2 rounded-xl shadow-md m-[2px] touch-none select-none
        ${isDragging ? "opacity-30 cursor-grabbing" : "opacity-100 cursor-grab"} ${isOver ? "bg-gray-100" : "bg-transparent"}`}
    >
      <div className="space-y-2">
        <p className="capitalize text-sm font-semibold">{task.text}</p>
        <p className="flex items-center text-[11px] text-primary font-medium">
          <GoDotFill />
          <span>Design</span>
        </p>
      </div>

      <p className="text-[#64748B]">
        Its just needs to adapt the UI from what you did before
      </p>
      <hr className="border-t w-full" />
      <div className="flex items-center justify-between">
        <div className="w-max h-max flex items-center gap-x-2 p-[7.33px] rounded-lg bg-[#FDF2F8] text-[#ED4F9D] font-medium">
          <LuClock />
          <span>3 days left</span>
        </div>
        <div className="flex">
          {["/image/persons/person-1.png", "/image/persons/person-2.png"].map(
            (imageSrc, index) => (
              <Avatar
                key={index}
                src={imageSrc}
                className="w-5 h-5 first:ml-auto -ml-2"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

const TaskListClient = dynamic(() => Promise.resolve(TaskList), {
  ssr: false,
});

export default TaskListClient;
