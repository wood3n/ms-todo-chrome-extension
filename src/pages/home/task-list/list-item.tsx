import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Card, CardBody, Checkbox, useDisclosure } from "@nextui-org/react";
import classNames from "classnames";

import TaskDetail from "../task";
import TaskExtraInfo from "./task-extra-info";

interface Props {
  data: TodoTask;
  onUpdate: (data: TodoTask) => Promise<void>;
  onComplete: () => Promise<void>;
  onDelete: () => Promise<void>;
}

const TaskListItem = ({ data, onUpdate, onComplete, onDelete }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Card
        isHoverable
        shadow="sm"
        className="w-full cursor-pointer overflow-x-hidden"
      >
        <CardBody className="flex flex-row" onClick={onOpen}>
          <div className="flex min-w-0 grow flex-col space-y-1">
            <div className={classNames("truncate text-base", {
              "line-through": data.status === "completed",
            })}
            >
              {data.title}
            </div>
            {Boolean(data.body?.content) && (
              <div className="truncate text-xs text-gray-500">{data.body!.content}</div>
            )}
          </div>
          {data.status !== "completed" && (
            <Checkbox
              radius="full"
              color="success"
              onValueChange={onComplete}
            />
          )}
        </CardBody>
        {data.status !== "completed" && (data?.hasAttachments || data?.reminderDateTime) && (
          <TaskExtraInfo task={data} />
        )}
      </Card>
      <TaskDetail
        data={data}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSave={async (data) => {
          await onUpdate(data);
          onClose();
        }}
        onDelete={() => {
          onClose();
          onDelete();
        }}
      />
    </>
  );
};

export default TaskListItem;
