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
 * get task of todo list
 */
export function getTaskList(todoListId: string, params?: CommonQueryParams) {
  return request.get<TaskListResponse>(`/me/todo/lists/${todoListId}/tasks`, {
    params,
  });
}
