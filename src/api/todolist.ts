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

export const createTodoList = (data: TodoData) =>
	request.post<TodoTaskList>("/me/todo/lists", data);

export const updateTodoList = (id: string, data: TodoData) =>
	request.patch<TodoTaskList>(`/me/todo/lists/${id}`, data);

export const deleteTodoList = (id: string) =>
	request.delete<void>(`/me/todo/lists/${id}`);
