import React from "react";

import { DownloadOne, Link as LinkIcon, UploadOne } from "@icon-park/react";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Button, CardFooter, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react";
import { useRequest } from "ahooks";

import { deleteAttachment, getAttachments } from "@/api";
import { useTodoList } from "@/context";
import { download } from "@/utils/download";

import Attachment from "../attachment";
import ScrollContainer from "../scroll-container";
import SpinContainer from "../spin-container";
import RemindTime from "./remind-time";

interface Props {
  task: TodoTask;
}

const TaskCardFooter = ({ task }: Props) => {
  const currentTodoData = useTodoList(store => store.currentTodoData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: attachments, runAsync, loading } = useRequest(async (bypassCache = false) => {
    const res = await getAttachments(currentTodoData.id!, task.id!, {
      cache: {
        override: bypassCache,
      },
    });

    return res?.value;
  }, {
    ready: isOpen,
    refreshDeps: [currentTodoData, task],
  });

  return (
    <>
      <Divider />
      <CardFooter className="flex flex-row items-center justify-between p-1">
        <span><RemindTime task={task} /></span>
        {
          task.hasAttachments && (
            <Button size="sm" variant="light" isIconOnly radius="full" onClick={onOpen}>
              <LinkIcon size={16} className="text-gray-500" />
            </Button>
          )
        }
      </CardFooter>
      <Modal placement="center" isDismissable={false} scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex items-center space-x-2 pb-2">
            <span>
              附件
            </span>
            <Tooltip content="下载所有">
              <Button size="sm" radius="full" variant="flat" color="primary" isIconOnly>
                <DownloadOne size="18" strokeWidth={4} />
              </Button>
            </Tooltip>
          </ModalHeader>
          <ModalBody className="h-72 flex-initial px-2">
            <SpinContainer loading={loading}>
              <ScrollContainer>
                {attachments?.map((attachment) => {
                  return (
                    <Attachment
                      task={task}
                      data={attachment}
                      key={attachment.id}
                      onDownload={() => download(`/me/todo/lists/${currentTodoData.id}/tasks/${task.id}/attachments/${task.id}/$value`, attachment.name)}
                      onDelete={async () => {
                        await deleteAttachment(currentTodoData.id!, task.id!, attachment.id!);

                        await runAsync(true);
                      }}
                    />
                  );
                })}
              </ScrollContainer>
            </SpinContainer>
          </ModalBody>
          <ModalFooter>
            <Button startContent={<UploadOne strokeWidth={4} />} size="sm" color="primary">添加附件</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskCardFooter;
