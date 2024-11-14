import React from "react";

import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { useRequest } from "ahooks";

import { deleteAttachment, getAttachments } from "@/api";
import ScrollContainer from "@/components/scroll-container";
import { useTodoList } from "@/context";
import { download } from "@/utils/download";

import AttachmentFile from "./attachment-file";

interface Props {
  task: TodoTask;
  readyRequest: boolean;
  className?: string;
}

const TaskAttachment = ({
  task,
  readyRequest,
  className,
}: Props) => {
  const currentTodoData = useTodoList(state => state.currentTodoData);

  const { data: attachments, refreshAsync } = useRequest(async () => {
    const res = await getAttachments(currentTodoData.id!, task.id!);

    return res?.value;
  }, {
    ready: readyRequest,
    refreshDeps: [currentTodoData, task],
  });

  return (
    <ScrollContainer className={className}>
      {attachments?.map((attachment) => {
        return (
          <AttachmentFile
            data={attachment}
            key={attachment.id}
            onDownload={() => download(`/me/todo/lists/${currentTodoData.id}/tasks/${task.id}/attachments/${task.id}/$value`, attachment.name)}
            onDelete={async () => {
              await deleteAttachment(currentTodoData.id!, task.id!, attachment.id!);

              await refreshAsync();
            }}
          />
        );
      })}
    </ScrollContainer>
  );
};

export default TaskAttachment;
