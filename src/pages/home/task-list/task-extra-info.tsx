import { Link as LinkIcon, Upload as UploadIcon } from "@icon-park/react";
import { Button, CardFooter, Chip, Divider, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";

import type { TodoTask } from "@microsoft/microsoft-graph-types";

import { formatISOTime } from "@/utils/date";

import TaskAttachment from "../task-attachment";

interface Props {
  task: TodoTask;
}

const TaskExtraInfo = ({ task }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <Divider />
      <CardFooter className="flex flex-row items-center justify-between p-1">
        <span>
          {task?.reminderDateTime?.dateTime && (
            <Chip variant="flat" radius="sm" size="sm" color="warning">
              <span className="mr-1 inline-block">⏰</span>
              {formatISOTime(task.reminderDateTime.dateTime)}
            </Chip>
          )}
        </span>
        {task.hasAttachments && (
          <Button
            size="sm"
            variant="light"
            radius="full"
            onPress={onOpen}
            className="h-6 min-h-6"
            startContent={<LinkIcon size={14} className="text-gray-500" />}
          >
            {t("attachment")}
          </Button>
        )}
      </CardFooter>
      <Modal placement="center" isDismissable={false} scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange} className="overflow-hidden">
        <ModalContent>
          <ModalHeader className="pb-2">{t("attachment")}</ModalHeader>
          <ModalBody className="items-start p-2">
            <TaskAttachment
              task={task}
              listClassName="p-2"
              uploadButton={(
                <div className="px-3">
                  <Button size="sm" color="primary" startContent={<UploadIcon />} onPressStart={e => e.continuePropagation()}>
                    {t("upload")}
                  </Button>
                </div>
              )}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskExtraInfo;
