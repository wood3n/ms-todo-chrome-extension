export enum StorageKey {
  PinnedTodoId = "pinned-todo-id",
  Theme = "theme",
}

export async function storageSet(items: {
  [name: string]: any;
}) {
  return chrome.storage.sync.set(items);
}

export async function storageGet(key: StorageKey) {
  const kvs = await chrome.storage.sync.get(key);

  return kvs?.[key];
}

export async function storageRm(keys: string | string[]) {
  return chrome.storage.sync.remove(keys);
}
