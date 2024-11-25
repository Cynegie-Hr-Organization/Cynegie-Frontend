"use client";
import { useState } from "react";
import TaskList from "./task-list";
import NewHireList from "./new-hire-list";

const TaskSection = () => {
  const [list, setList] = useState<ListType>("task");

  return (
    <div className='my-12'>
      <div className='flex gap-4 text-sm mb-4 pl-4 relative w-max'>
        <div className='absolute bottom-0 w-full h-[1px] bg-gray-200' />
        <div
          className={`absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out w-1/2 ${
            list === "task" ? "left-0" : "left-[55%]"
          }`}
        />
        <button className={`p-4 ${list === "task" ? "text-primary" : "text-gray-500"}`} onClick={() => setList("task")}>
          Task List
        </button>
        <button
          className={`p-4 ${list === "new-hire" ? "text-primary" : "text-gray-500"}`}
          onClick={() => setList("new-hire")}>
          New Hire List
        </button>
      </div>

      {list === "task" ? <TaskList /> : <NewHireList />}
    </div>
  );
};

type ListType = "task" | "new-hire";
export default TaskSection;
