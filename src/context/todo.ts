import type { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { create } from "zustand";

import { createTodoList, deleteTodoList, getTodoList, updateTodoList } from "@/api";
import { storageGet, StorageKey, storageSet } from "@/utils/storage";

export interface TodoListDataType extends TodoTaskList {
  pinned?: boolean;
}

export interface TodoListState {
  todoList: TodoListDataType[];
  currentTodoData: TodoListDataType;
  initTodoList: () => Promise<void>;
  addTodo: (displayName: string) => Promise<void>;
  updateTodo: (id: string, displayName: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => void;
  pinTodo: (id: string) => Promise<void>;
}

const requestTodoList = async (bypassChche = false) => {
  const response = await getTodoList({
    // i think people do not need to read so much task
    $top: 100,
  }, {
    cache: {
      override: bypassChche,
    },
  });

  const list = response?.value?.filter(item => item.wellknownListName !== "flaggedEmails");

  const pinnedTodoId = await storageGet(StorageKey.PinnedTodoId);

  const todoList: TodoListDataType[] = list?.map(item => ({
    ...item,
    pinned: item.id === pinnedTodoId,
  }));

  if (!todoList.some(item => item.pinned)) {
    todoList[0].pinned = true;
  }

  return todoList;
};

export const useTodoList = create<TodoListState>()((set, get) => ({
  todoList: [],
  currentTodoData: {},
  initTodoList: async () => {
    const todoList = await requestTodoList();

    set({ todoList, currentTodoData: todoList.find(item => item.pinned) });
  },
  addTodo: async (displayName: string) => {
    await createTodoList({ displayName });

    const todoList = await requestTodoList(true);

    set({ todoList });
  },
  updateTodo: async (id: string, displayName: string) => {
    await updateTodoList(id, { displayName });

    const todoList = await requestTodoList(true);

    set({ todoList });
  },
  deleteTodo: async (id: string) => {
    await deleteTodoList(id);

    const todoList = await requestTodoList(true);

    set({ todoList });
  },
  toggleTodo: (id: string) => {
    const todoList = get().todoList;

    set({ currentTodoData: todoList.find(item => item.id === id) });
  },
  pinTodo: async (id: string) => {
    const todoList = get().todoList;

    set({
      currentTodoData: todoList.find(item => item.id === id),
      todoList: todoList.map(item => ({
        ...item,
        pinned: id === item.id,
      })),
    });

    await storageSet({
      [StorageKey.PinnedTodoId]: id,
    });
  },
}));
