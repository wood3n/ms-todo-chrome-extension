import React from "react";

import { Link } from "@icon-park/react";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Button, CardFooter, Divider } from "@nextui-org/react";

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
        <Button size="sm" variant="light" startContent={<Link theme="outline" size="12" />} className="h-6 px-1 text-xs text-gray-500">
          附件
        </Button>
      </CardFooter>
    </>
  );
};

export default TaskCardFooter;
