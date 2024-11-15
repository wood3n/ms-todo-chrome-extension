import React from "react";

import { Link as LinkIcon } from "@icon-park/react";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Button, CardFooter, Chip, Divider, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

import { formatISOTime } from "@/utils/date";

import TaskAttachment from "../task-attachment";

interface Props {
  task: TodoTask;
}

const TaskExtraInfo = ({ task }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Divider />
      <CardFooter className="flex flex-row items-center justify-between p-1">
        <span>
          {task?.reminderDateTime?.dateTime && (
            <Chip variant="flat" radius="sm" size="sm" color="warning">
              ⏰
              {" "}
              {formatISOTime(task.reminderDateTime.dateTime)}
            </Chip>
          )}
        </span>
        {task.hasAttachments && (
          <Button size="sm" variant="light" isIconOnly radius="full" onClick={onOpen}>
            <LinkIcon size={16} className="text-gray-500" />
          </Button>
        )}
      </CardFooter>
      <Modal placement="center" isDismissable={false} scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            附件
          </ModalHeader>
          <ModalBody>
            <TaskAttachment
              task={task}
              shouldRequest={isOpen}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskExtraInfo;
