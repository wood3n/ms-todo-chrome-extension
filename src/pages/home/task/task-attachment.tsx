import React, { useEffect, useRef, useState } from "react";

import { Upload } from "@icon-park/react";
import type { TaskFileAttachment, TodoTask } from "@microsoft/microsoft-graph-types";
import { Button } from "@nextui-org/react";

import { deleteAttachment, getAttachments as requestAttachment, uploadAttachment } from "@/api";
import FileItem from "@/components/file";
import ScrollContainer from "@/components/scroll-container";
import SpinContainer from "@/components/spin-container";
import { useTodoList } from "@/context";
import { download } from "@/utils/download";

interface Props {
  task: TodoTask;
}

interface AttachmentState extends TaskFileAttachment {
  isUploading?: boolean;
  file?: File;
}

const TaskAttachment = ({ task }: Props) => {
  const currentTodoData = useTodoList(store => store.currentTodoData);
  const inputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<AttachmentState[]>([]);
  const count = useRef(0);
  const [loading, setLoading] = useState(false);

  const getAttachments = async () => {
    setLoading(true);
    try {
      const res = await requestAttachment(currentTodoData.id!, task.id!);

      if (res?.value) {
        setAttachments(res.value);
      }
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttachments();
  }, []);

  const uploadFile = async (attachment: AttachmentState) => {
    try {
      await uploadAttachment({
        todoTaskListId: currentTodoData.id!,
        taskId: task.id!,
        data: {
          attachmentType: "file",
          name: attachment.name,
          size: attachment.size,
        },
        file: attachment.file as File,
      });

      setAttachments(attachments.map((item) => {
        if (item.id === attachment.id) {
          return {
            ...item,
            isUploading: false,
          };
        }

        return item;
      }));
    }
    catch {
      setAttachments(attachments.map((item) => {
        if (item.id === attachment.id) {
          return {
            ...item,
            isUploading: false,
            errorMessage: "上传出错，请重试",
          };
        }

        return item;
      }));
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <span className="text-sm">附件</span>
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color="primary"
          radius="full"
          className="h-5 min-h-5"
          onPress={() => inputRef.current?.click()}
        >
          <Upload />
          <input
            ref={inputRef}
            type="file"
            multiple={false}
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              const newAttachment: AttachmentState = {
                id: `${Date.now()}#${count.current}`,
                name: file?.name,
                size: file?.size,
                isUploading: true,
                file,
              };
              count.current++;

              setAttachments([
                ...attachments,
                newAttachment,
              ]);

              await uploadFile(newAttachment);
            }}
          />
        </Button>
      </div>
      <SpinContainer loading={loading}>
        <ScrollContainer className="max-h-40">
          {attachments?.map((attachment) => {
            return (
              <FileItem
                key={attachment.id}
                name={attachment.name!}
                size={attachment.size}
                isUploading={attachment.isUploading}
                onDownload={() => download(`/me/todo/lists/${currentTodoData.id}/tasks/${task.id}/attachments/${task.id}/$value`, attachment.name)}
                onDelete={async () => {
                  await deleteAttachment(currentTodoData.id!, task.id!, attachment.id!);

                  await getAttachments();
                }}
                className="shrink-0 grow basis-auto"
              />
            );
          })}
        </ScrollContainer>
      </SpinContainer>
    </>
  );
};

export default TaskAttachment;
