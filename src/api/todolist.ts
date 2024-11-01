import type { TodoTaskList } from "@microsoft/microsoft-graph-types";
import type { AxiosRequestConfig } from "axios";

import type { CommonQueryParams } from "./common";
import http from "./request";

export interface TodoResponse {
  value: TodoTaskList[];
}

export interface TodoData {
  displayName: TodoTaskList["displayName"];
}

/** 获取任务列表 */
export const getTodoList = (params?: CommonQueryParams, config?: AxiosRequestConfig) => http.get<TodoResponse>("/me/todo/lists", {
  params,
  ...config,
});

export function createTodoList(data: TodoData) {
  return http.post<TodoTaskList>("/me/todo/lists", data);
}

export function updateTodoList(id: string, data: TodoData) {
  return http.patch<TodoTaskList>(`/me/todo/lists/${id}`, data);
}

export function deleteTodoList(id: string) {
  return http.delete<void>(`/me/todo/lists/${id}`);
}
