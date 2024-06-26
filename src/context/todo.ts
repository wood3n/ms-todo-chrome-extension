import { createTodoList, deleteTodoList, getTodoList } from "@/api";
import { StorageKey, storageGet } from "@/utils/storage";
import type { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { create } from "zustand";

export interface TodoListDataType extends TodoTaskList {
	pinned?: boolean;
}

export interface TodoListState {
	todoList: TodoListDataType[];
	currentTodoData: TodoListDataType;
	fetchTodoList: () => Promise<void>;
	addTodo: (displayName: string) => Promise<TodoTaskList>;
	deleteTodo: (id: string) => Promise<void>;
	changeCurrentTodo: (id: string) => void;
}

export const useTodoList = create<TodoListState>()((set, get) => ({
	todoList: [],
	currentTodoData: {},
	fetchTodoList: async () => {
		const response = await getTodoList();

		const list = response?.value?.filter(
			(item) => item.wellknownListName !== "flaggedEmails",
		);

		const options = await storageGet(StorageKey.Option);

		const todoList: TodoListDataType[] = list?.map((item) => ({
			...item,
			pinned: item.id === options.pinnedTodoListId,
		}));

		if (!todoList.some((item) => item.pinned)) {
			todoList[0].pinned = true;
		}

		set({ todoList, currentTodoData: todoList.find((item) => item.pinned) });
	},
	addTodo: async (displayName: string) => {
		const newTodo = await createTodoList({ displayName });

		await get().fetchTodoList();

		return newTodo;
	},
	deleteTodo: async (id: string) => {
		await deleteTodoList(id);

		get().fetchTodoList();
	},
	changeCurrentTodo: (id: string) => {
		const todoList = get().todoList;

		set({ currentTodoData: todoList.find((item) => item.id === id) });
	},
}));
