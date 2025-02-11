import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import TaskCard from "./cards/task";
import { BoardData } from "./types";

export type KanbanBoardProps = {
  boardData: BoardData;
  onDragEnd: (arg: DropResult) => void;
  onTaskClick: (taskId: string) => void;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  boardData,
  onDragEnd,
  onTaskClick,
}) => {
  return (
    <>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col md:flex-row py-5 gap-8">
            {boardData.columnOrder.map((columnId) => {
              const column = boardData.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => boardData.tasks[taskId]
              );

              return (
                <div key={column.id}>
                  <Droppable
                    droppableId={column.id}
                    // key={column.id}
                    direction="vertical"
                    isDropDisabled={false}
                    isCombineEnabled={false}
                    ignoreContainerClipping
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          borderRadius: "8px",
                          padding: "1rem",
                          // minHeight: '400px',
                          backgroundColor: snapshot.isDraggingOver
                            ? "#e8f5e9"
                            : "#f7f7f7",
                          transition: "background-color 0.2s ease",
                        }}
                        className="w-full md:w-[350]"
                      >
                        <h6 className="mb-6">{column.title.toUpperCase()}</h6>
                        {tasks.map((task, index) => (
                          <Draggable
                            draggableId={task.id}
                            index={index}
                            key={task.id}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  padding: "1rem",
                                  margin: "0.5rem 0",
                                  borderRadius: "4px",
                                  backgroundColor: snapshot.isDragging
                                    ? "#e1f5fe"
                                    : "#fff",
                                  boxShadow: snapshot.isDragging
                                    ? "0 4px 8px rgba(0,0,0,0.2)"
                                    : "0 1px 2px rgba(0,0,0,0.1)",
                                  transition:
                                    "background-color 0.2s ease, transform 0.2s ease",
                                  ...provided.draggableProps.style,
                                  cursor: "default",
                                }}
                                onClick={() => onTaskClick(task.id)}
                              >
                                <TaskCard {...task} status={column.status} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default KanbanBoard;
