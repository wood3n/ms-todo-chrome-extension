import type { TodoTask, TodoTaskList } from "@microsoft/microsoft-graph-types";
import { create } from "zustand";

import { createTodoList, deleteTodoList, getTaskList, getTodoList, updateTodoList } from "@/api";
import { updateBadge } from "@/utils/badge";
import { storageGet, StorageKey, storageRm, storageSet } from "@/utils/storage";

export interface PinnedTodoListDataType extends TodoTaskList {
  // pinned and work in progress tasks
  scheduleTasks?: TodoTask[];
}

export interface TodoListState {
  todoList: TodoTaskList[];
  pinnedTodoData: PinnedTodoListDataType;
  currentTodoData: TodoTaskList;
  initTodoList: () => Promise<void>;
  addTodo: (displayName: string) => Promise<void>;
  updateTodo: (id: string, displayName: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => void;
  pinTodo: (id: string) => Promise<void>;
}

const requestTodoList = async () => {
  const response = await getTodoList({
    $top: 100,
  });

  return response?.value?.filter(item => item.wellknownListName !== "flaggedEmails");
};

/** just get top100 tasks */
const requestTasks = async (todoListId: string) => {
  const res = await getTaskList(todoListId, {
    $top: 100,
    $orderby: `createdDateTime desc`,
  });

  return res?.value;
};

const getPinnedTodoData = async (todoList?: TodoTaskList[]) => {
  const pinnedTodoId = await storageGet(StorageKey.PinnedTodoId);

  let pinnedTodoData: PinnedTodoListDataType | undefined = todoList?.find(item => item.id === pinnedTodoId);

  if (!pinnedTodoData) {
    pinnedTodoData = todoList?.[0];
  }

  if (pinnedTodoData) {
    await storageSet({
      [StorageKey.PinnedTodoId]: pinnedTodoData.id,
    });

    const tasks = await requestTasks(pinnedTodoData.id as string);

    const inProgressTasks = tasks?.filter(item => item.status !== "completed");

    if (inProgressTasks?.length) {
      updateBadge(inProgressTasks.length);
    }
  }

  return pinnedTodoData;
};

export const useTodoList = create<TodoListState>()((set, get) => ({
  todoList: [],
  pinnedTodoData: {},
  currentTodoData: {},
  initTodoList: async () => {
    const todoList = await requestTodoList();

    const pinnedTodoData = await getPinnedTodoData(todoList);

    set({ todoList, currentTodoData: pinnedTodoData, pinnedTodoData });
  },
  addTodo: async (displayName: string) => {
    await createTodoList({ displayName });

    const todoList = await requestTodoList();

    set({ todoList });
  },
  updateTodo: async (id: string, displayName: string) => {
    await updateTodoList(id, { displayName });

    const todoList = await requestTodoList();

    const currentTodoData = get().currentTodoData;

    set({ todoList, currentTodoData: currentTodoData.id === id
      ? {
          ...currentTodoData,
          displayName,
        }
      : currentTodoData });
  },
  deleteTodo: async (id: string) => {
    await deleteTodoList(id);

    const todoList = await requestTodoList();

    const currentTodoData = get().currentTodoData;

    const pinnedTodoData = get().pinnedTodoData;

    set({
      todoList,
      currentTodoData: currentTodoData.id === id ? todoList?.[0] : currentTodoData,
    });

    if (id === pinnedTodoData.id) {
      await storageRm(StorageKey.PinnedTodoId);

      const newPinnedData = await getPinnedTodoData(todoList);

      set({
        pinnedTodoData: newPinnedData,
      });
    }
  },
  toggleTodo: (id: string) => {
    const todoList = get().todoList;

    set({ currentTodoData: todoList.find(item => item.id === id) });
  },
  pinTodo: async (id: string) => {
    const todoList = get().todoList;

    await storageSet({
      [StorageKey.PinnedTodoId]: id,
    });

    const pinnedTodoData = await getPinnedTodoData(todoList);

    set({
      pinnedTodoData,
      currentTodoData: pinnedTodoData,
    });
  },
}));
