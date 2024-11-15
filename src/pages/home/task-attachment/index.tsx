import React, { useEffect, useState } from "react";

import type { TaskFileAttachment, TodoTask } from "@microsoft/microsoft-graph-types";

import { deleteAttachment, getAttachments as requestAttachment } from "@/api";
import ScrollContainer from "@/components/scroll-container";
import SpinContainer from "@/components/spin-container";
import { useTodoList } from "@/context";
import { download } from "@/utils/download";

import AttachmentFile from "./attachment-file";

interface Props {
  task: TodoTask;
  shouldRequest: boolean;
  className?: string;
}

const TaskAttachment = ({
  task,
  shouldRequest,
  className,
}: Props) => {
  const currentTodoData = useTodoList(state => state.currentTodoData);
  const [attachments, setAttachments] = useState<TaskFileAttachment[]>();
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
    if (shouldRequest) {
      getAttachments();
    }
  }, [shouldRequest]);

  return (
    <SpinContainer loading={loading}>
      <ScrollContainer className={className}>
        {attachments?.map((attachment) => {
          return (
            <AttachmentFile
              data={attachment}
              key={attachment.id}
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
  );
};

export default TaskAttachment;
