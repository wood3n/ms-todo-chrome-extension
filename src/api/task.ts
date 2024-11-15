import type { AttachmentInfo, TaskFileAttachment, TodoTask, UploadSession } from "@microsoft/microsoft-graph-types";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import request from "./request";

export function getTask(todoTaskListId: string, taskId: string) {
  return request.get(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}`);
}

/** 创建任务 */
export function createTask(todoListId: string, data: TodoTask) {
  return request.post(`/me/todo/lists/${todoListId}/tasks`, data);
}

/** 更新任务信息 */
export function updateTask(todoTaskListId: string, taskId: string, data: TodoTask) {
  return request.patch(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}`, data);
}

export function deleteTask(todoTaskListId: string, taskId: string) {
  return request.delete(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}`);
}

/** get task attachments */
export function getAttachments(todoTaskListId: string, taskId: string, config?: AxiosRequestConfig) {
  return request.get<{ value?: TaskFileAttachment[] }>(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}/attachments`, config);
}

export function deleteAttachment(todoTaskListId: string, taskId: string, id: string) {
  return request.delete(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}/attachments/${id}`);
}

export async function uploadAttachment({ todoTaskListId, taskId, data, file }: {
  todoTaskListId: string;
  taskId: string;
  data: AttachmentInfo;
  file: File;
}) {
  const session = await request.post<UploadSession>(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}/attachments/createUploadSession`, {
    attachmentInfo: data,
  });

  if (session?.uploadUrl) {
    const fileContent = await file.arrayBuffer();

    const res: AxiosResponse = await request.put(`${session.uploadUrl}/content`, fileContent, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Range": `bytes ${0}-${file.size - 1}/${file.size}`,
      },
      keepNative: true,
    });

    if (res.status === 201) {
      return Promise.resolve();
    }
  }

  return Promise.reject(new Error("无法获取上传链接"));
}
