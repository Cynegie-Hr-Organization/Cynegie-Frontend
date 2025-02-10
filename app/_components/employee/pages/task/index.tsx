"use client";

import Page from "@/app/_components/shared/page";
import KanbanBoard from "./kanban-board";
import SearchField from "../../input-fields/search";
import SvgIcon from "@/app/_components/icons/container";
import { useEffect, useState } from "react";
import { icon } from "@/constants";
import TaskList from "./list";
import useKanbanBoard from "./kanban-board/hooks/useKanbanBoard";
import Modal from "../../modal";
import { getTaskByID } from "@/app/api/services/employee/tasks";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export type TaskLayout = "kanban" | "list";

const EmployeeTask = () => {
  const [taskLayout, setTaskLayout] = useState<TaskLayout>("kanban");
  const isVerticalLayout = taskLayout === "kanban";

  const getActiveLayoutStyle = (index: number) => {
    const activeStyle = "bg-[blue] fill-white p-2 rounded-full";
    if (index === 0 && isVerticalLayout) {
      return activeStyle;
    }
    if (index === 1 && !isVerticalLayout) {
      return activeStyle;
    }
    return "fill=[#657081]";
  };

  const { boardData, onDragEnd } = useKanbanBoard();
  const [openViewTask, setOpenViewTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const { data: taskDetails } = useQuery({
    queryKey: ["tasks", selectedTaskId],
    queryFn: () => getTaskByID(selectedTaskId!),
    enabled: !!selectedTaskId,
  });

  useEffect(() => {
    if (taskDetails) {
      setOpenViewTask(true);
    }
  }, [taskDetails]);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  //   const handleTaskClick = async (taskId: string) => {
  //   try {
  //     const response = await getTaskByID(taskId);
  //     setTaskDetails(response);
  //     setOpenViewTask(true);
  //   } catch (error) {
  //     console.error("Failed to fetch task details:", error);
  //   }
  // };

  const handleSearchQuery = (query: string) => {
    console.log("Search Query:", query); // Replace with actual search logic
  };

  return (
    <>
      <Page title="Review your tasks">
        <div className="common-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
            <h4 className="flex-grow">Task</h4>
            <div className="flex items-center gap-2">
              <div className="w-full sm:w-[400]">
                <SearchField getSearchQuery={handleSearchQuery} />
              </div>
              <div className="flex items-center gap-1 bg-[#F8F8F8] px-1 rounded-2xl">
                {[icon.grid, icon.stack].map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${getActiveLayoutStyle(index)}`}
                    onClick={() =>
                      index === 0
                        ? setTaskLayout("kanban")
                        : setTaskLayout("list")
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
              taskLayout !== "kanban" && "hidden"
            }`}
          >
            <KanbanBoard
              onTaskClick={handleTaskClick}
              boardData={boardData}
              onDragEnd={onDragEnd}
            />
          </div>
          {/* )} */}
          {taskLayout === "list" && (
            <div className="mt-8 sm:overflow-x-auto overflow-x-scroll">
              <TaskList onTaskClick={handleTaskClick} boardData={boardData} />
            </div>
          )}
        </div>
      </Page>
      <Modal
        open={openViewTask}
        onClose={() => setOpenViewTask(false)}
        title="View Task"
        subtitle="View task below"
        viewTaskProps={{
          id: taskDetails?.id,
          name: taskDetails?.taskName,
          status: taskDetails?.status,
          appName: "Slack",
          assignedTo: [],
          dateCreated: formatDate(taskDetails?.createdAt),
          label: "Development",
          dueDate: formatDate(taskDetails?.dueDate),
          description: taskDetails?.description,
          // userPicture: "/image/persons/person-1.png",
          // comments: [
          //   {
          //     name: "Andre Vovaou",
          //     image: "/image/persons/person-3.png",
          //     timePosted: "10 hours ago",
          //     comment:
          //       "Almost there @Angela, can you see the comments in Figma now",
          //   },
          // ],
        }}
        // centerButton
        // buttonOne={{
        //   type: ButtonType.contained,
        //   text: "Edit Task",
        //   fullWidth: true,
        // }}
      />
    </>
  );
};

export default EmployeeTask;
