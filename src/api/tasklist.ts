import type { TodoTask } from "@microsoft/microsoft-graph-types";

import request from "./axios";
import type { CommonQueryParams } from "./types";

/**
 * https://learn.microsoft.com/zh-cn/graph/api/resources/todotask?view=graph-rest-1.0
 */
export interface TaskListResponse {
  value?: TodoTask[];
}

/**
 * get task of todo list
 */
export function getTaskList(todoListId: string, params?: CommonQueryParams) {
  return request.get<TaskListResponse>(`/me/todo/lists/${todoListId}/tasks`, {
    params,
  });
}
