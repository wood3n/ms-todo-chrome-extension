import React from "react";

import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { CardFooter, Divider } from "@nextui-org/react";

import EndTime from "./end-time";

interface Props {
  task: TodoTask;
}

const TaskCardFooter = ({ task }: Props) => {
  if (!task?.hasAttachments || !task?.reminderDateTime) {
    return null;
  }

  return (
    <>
      <Divider />
      <CardFooter className="flex flex-row items-center justify-between p-1">
        {task.status !== "completed" && Boolean(task.reminderDateTime?.dateTime) && (<EndTime task={task} />)}
      </CardFooter>
    </>
  );
};

export default TaskCardFooter;
