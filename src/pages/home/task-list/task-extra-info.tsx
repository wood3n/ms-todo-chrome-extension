import React from "react";

import { Link as LinkIcon, Upload as UploadIcon } from "@icon-park/react";
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
          <Button
            size="sm"
            variant="light"
            radius="full"
            onClick={onOpen}
            className="h-6 min-h-6"
            startContent={<LinkIcon size={14} className="text-gray-500" />}
          >
            附件
          </Button>
        )}
      </CardFooter>
      <Modal placement="center" isDismissable={false} scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="pb-2">附件</ModalHeader>
          <ModalBody className="items-start pb-4">
            <TaskAttachment
              task={task}
              listClassName="max-h-60"
              uploadButton={(
                <Button size="sm" color="primary" startContent={<UploadIcon />} onPressStart={e => e.continuePropagation()}>
                  上传
                </Button>
              )}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskExtraInfo;
