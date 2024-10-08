import type { TodoTask } from "@microsoft/microsoft-graph-types";
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
export function getTaskList(todoListId: string) {
  return request.get<TaskListResponse>(`/me/todo/lists/${todoListId}/tasks`);
}

/** 创建任务 */
export function createTask(todoListId: string, data: TodoTask) {
  return request.post(`/me/todo/lists/${todoListId}/tasks`, data);
}
