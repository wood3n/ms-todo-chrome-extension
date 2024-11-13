import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Card, CardBody, Checkbox, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import classNames from "classnames";

import TaskDetail from "../task/detail";
import TaskCardFooter from "./task-card-footer";

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
          <TaskCardFooter task={data} />
        )}
      </Card>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>任务信息</ModalHeader>
          <ModalBody>
            <TaskDetail
              data={data}
              onSave={async (data) => {
                await onUpdate(data);
                onClose();
              }}
              onDelete={() => {
                onClose();

                onDelete();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskListItem;
