import { Stack } from "@mui/material";
import { Task } from "../../../task/kanban-board/types";
import TaskCard from "../../../task/kanban-board/cards/task";

const RecentActivityCardDetails = () => {
  return (
    <Stack gap={2}>
      {Array(2)
        .fill({
          name: "App Usability Testing with Maze",
          status: "Pending",
          app: "Slack",
          userPictures: [
            "image/persons/person-1.png",
            "image/persons/person-1.png",
            "image/persons/person-3.png",
          ],
          dueDate: "January 21st, 2024",
          noOfComments: 2,
        } as Task)
        .map((task, index) => (
          <div key={index}>
            <TaskCard {...task} />
          </div>
        ))}
    </Stack>
  );
};

export default RecentActivityCardDetails;
