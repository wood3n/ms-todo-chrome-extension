export enum StorageKey {
  PinnedTodoId = "pinned-todo-id",
  Account = "acount",
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
  User = "user",
  TodoList = "todos",
  TaskList = "tasks",
}

export async function storageSet(items: {
  [name: string]: any;
}) {
  return chrome.storage.local.set(items);
}

export async function storageGet(key: StorageKey) {
  const kvs = await chrome.storage.local.get(key);

  return kvs?.[key];
}

export async function storageRm(keys: string | string[]) {
  return chrome.storage.local.remove(keys);
}
