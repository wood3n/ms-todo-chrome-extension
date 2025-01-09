import type { AttachmentInfo, TaskFileAttachment, TodoTask, UploadSession } from "@microsoft/microsoft-graph-types";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import axios from "./axios";

/** get task detail */
export function getTask(todoTaskListId: string, taskId: string) {
  return axios.get(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}`);
}

/** create task */
export function createTask(todoListId: string, data: TodoTask) {
  return axios.post(`/me/todo/lists/${todoListId}/tasks`, data);
}

/** update task */
export function updateTask(todoTaskListId: string, taskId: string, data: TodoTask) {
  return axios.patch(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}`, data);
}

/** delete task */
export function deleteTask(todoTaskListId: string, taskId: string) {
  return axios.delete(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}`);
}

/** get task attachments */
export function getAttachments(todoTaskListId: string, taskId: string, config?: AxiosRequestConfig) {
  return axios.get<{ value?: TaskFileAttachment[] }>(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}/attachments`, config);
}

/** delete task attachment */
export function deleteAttachment(todoTaskListId: string, taskId: string, id: string) {
  return axios.delete(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}/attachments/${id}`);
}

/** upload attachment for task */
export async function uploadAttachment({ todoTaskListId, taskId, data, file }: {
  todoTaskListId: string;
  taskId: string;
  data: AttachmentInfo;
  file: File;
}) {
  const session = await axios.post<UploadSession>(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}/attachments/createUploadSession`, {
    attachmentInfo: data,
  });

  if (session?.uploadUrl) {
    const fileContent = await file.arrayBuffer();

    const res: AxiosResponse = await axios.put(`${session.uploadUrl}/content`, fileContent, {
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
