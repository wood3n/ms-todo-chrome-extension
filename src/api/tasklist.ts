import type { TodoTask } from "@microsoft/microsoft-graph-types";

import type { CommonQueryParams } from "./common";
import request from "./request";

/**
 * https://learn.microsoft.com/zh-cn/graph/api/resources/todotask?view=graph-rest-1.0
 */
export interface TaskListResponse {
  value?: TodoTask[];
}

/**
 * 获取任务列表中的任务
 */
export function getTaskList(todoListId: string, params?: CommonQueryParams) {
  return request.get<TaskListResponse>(`/me/todo/lists/${todoListId}/tasks`, {
    params,
  });
}

/** 创建任务 */
export function createTask(todoListId: string, data: TodoTask) {
  return request.post(`/me/todo/lists/${todoListId}/tasks`, data);
}

/** 更新任务信息 */
export function updateTask(todoTaskListId: string, taskId: string, data: TodoTask) {
  return request.patch(`/me/todo/lists/${todoTaskListId}/tasks/${taskId}`, data);
}
