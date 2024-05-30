import type { TodoTaskList } from "@microsoft/microsoft-graph-types";
import request from "./request";

export interface Todo {
	value: TodoTaskList[];
}

export interface TodoData {
	displayName: TodoTaskList["displayName"];
}

export const getTodoList = () => request.get<Todo>("/me/todo/lists");

export const createTodoList = (data: TodoData) =>
	request.post<TodoTaskList>("/me/todo/lists", data);

export const updateTodoList = (id: string, data: TodoData) =>
	request.patch<TodoTaskList>(`/me/todo/lists/${id}`, data);

export const deleteTodoList = (id: string) =>
	request.delete<void>(`/me/todo/lists/${id}`);
