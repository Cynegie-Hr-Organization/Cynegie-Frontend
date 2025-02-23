"use client";
import { useState, useEffect } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyTasks,
  changeTaskStatusById,
} from "@/app/api/services/employee/tasks";
import { BoardData } from "../types";

const useKanbanBoard = (searchQuery: string) => {
  const queryClient = useQueryClient();

  const {
    data: tasksData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", searchQuery],
    queryFn: () => getMyTasks(searchQuery),
  });

  console.log("tasksData:", tasksData);

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      changeTaskStatusById(id, status.toLowerCase()),
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  const initialData: BoardData = {
    tasks: {},
    columns: {
      "pending-task": {
        id: "pending-task",
        title: "Pending Task",
        status: "pending",
        taskIds: [],
      },
      "completed-task": {
        id: "completed-task",
        title: "Completed Task",
        status: "completed",
        taskIds: [],
      },
    },
    columnOrder: ["pending-task", "completed-task"],
  };

  const [boardData, setBoardData] = useState<BoardData>(initialData);

  useEffect(() => {
    if (!isLoading && tasksData && tasksData.data) {
      const tasks = tasksData.data.reduce((acc: any, task: any) => {
        acc[task.id] = {
          id: task.id,
          name: task.taskName,
          status: task.status,
          description: task.description,
          label: task.label,
          dueDate: new Date(task.dueDate).toLocaleDateString(),
          employees: task.employees,
        };
        return acc;
      }, {});

      const pendingTaskIds = tasksData.data
        .filter((task: any) => task.status === "pending")
        .map((task: any) => task.id);
      const completedTaskIds = tasksData.data
        .filter((task: any) => task.status === "completed")
        .map((task: any) => task.id);

      setBoardData({
        tasks,
        columns: {
          "pending-task": {
            id: "pending-task",
            title: "Pending Task",
            status: "pending",
            taskIds: pendingTaskIds,
          },
          "completed-task": {
            id: "completed-task",
            title: "Completed Task",
            status: "completed",
            taskIds: completedTaskIds,
          },
        },
        columnOrder: ["pending-task", "completed-task"],
      });
    }
  }, [isLoading, tasksData]);

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

    // If moving to a different column
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

    // Update task status on the server
    mutation.mutate({ id: draggableId, status: finish.status });
  };

  return { boardData, setBoardData, onDragEnd, isLoading, error };
};

export default useKanbanBoard;
