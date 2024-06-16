import { createTodoList, deleteTodoList, getTodoList } from "@/api";
import { StorageKey, storageGet } from "@/utils/storage";
import type { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { create } from "zustand";

export interface TodoListDataType extends TodoTaskList {
	pinned?: boolean;
}

export interface TodoListState {
	todoList?: TodoListDataType[];
	fetchTodoList: () => Promise<void>;
	addTodo: (displayName: string) => Promise<TodoTaskList>;
	deleteTodo: (id: string) => Promise<void>;
}

export const useTodoList = create<TodoListState>()((set, get) => ({
	todoList: [],
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

		if (todoList.some((item) => item.pinned)) {
			set({ todoList });
		} else {
			todoList[0].pinned = true;
			set({ todoList });
		}
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
}));
