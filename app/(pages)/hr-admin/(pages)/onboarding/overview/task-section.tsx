"use client";

import AppTabs from "@/app/_components/shared/tabs";
import dynamic from "next/dynamic";
import { useState } from "react";
import NewHireList from "./new-hire-list";
import TaskList from "./task-list";

type ListType = "task" | "new-hire";

const TaskSection = () => {
  const TaskListClient = dynamic(() => Promise.resolve(TaskList), {
    ssr: false,
  });
  const NewHireListClient = dynamic(() => Promise.resolve(NewHireList), {
    ssr: false,
  });

  const [list, setList] = useState<ListType>("task");
  const listTabs = [
    { label: "Task List", onClick: () => setList("task") },
    { label: "New Hire List", onClick: () => setList("new-hire") },
  ];

  return (
    <div className="my-12 space-y-6">
      <AppTabs tabs={listTabs} />

      {list === "task" ? <TaskListClient /> : <NewHireListClient />}
    </div>
  );
};

export default TaskSection;
