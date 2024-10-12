import type { TodoTaskList } from "@microsoft/microsoft-graph-types";

import request from "./request";

export interface TodoResponse {
  value: TodoTaskList[];
}

export interface TodoData {
  displayName: TodoTaskList["displayName"];
}

/** 获取任务列表 */
export const getTodoList = () => request.get<TodoResponse>("/me/todo/lists");

export function createTodoList(data: TodoData) {
  return request.post<TodoTaskList>("/me/todo/lists", data);
}

export function updateTodoList(id: string, data: TodoData) {
  return request.patch<TodoTaskList>(`/me/todo/lists/${id}`, data);
}

export function deleteTodoList(id: string) {
  return request.delete<void>(`/me/todo/lists/${id}`);
}
