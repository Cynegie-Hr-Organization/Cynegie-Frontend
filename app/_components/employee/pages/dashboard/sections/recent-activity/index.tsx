import { Stack } from "@mui/material";
import { Task } from "../../../task/kanban-board/types";
import TaskCard from "../../../task/kanban-board/cards/task";
import useKanbanBoard from "../../../task/kanban-board/hooks/useKanbanBoard";

const RecentActivityCardDetails = () => {
   const searchQuery = ""

  const { boardData, isLoading } = useKanbanBoard(searchQuery);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tasks = Object.values(boardData.tasks).slice(0, 2); // Get the first 2 tasks

  return (
    <Stack gap={2}>
      {tasks.map((task: Task, index: number) => (
        <div key={index}>
          <TaskCard {...task} />
        </div>
      ))}
    </Stack>
  );
};

export default RecentActivityCardDetails;
