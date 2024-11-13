import type { TaskFileAttachment, TodoTask } from "@microsoft/microsoft-graph-types";
import type { AxiosRequestConfig } from "axios";

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
